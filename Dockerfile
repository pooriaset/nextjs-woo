# Base image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS builder
RUN corepack enable
# libc6-compat is sometimes needed for Next.js
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN echo 'nodeLinker: "node-modules"' > ./.yarnrc.yml
RUN \
    if [ -f yarn.lock ]; then yarn install --immutable; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Rebuild the source code only when needed
COPY ./src ./src
COPY ./next.config.mjs ./tsconfig.json ./

# Disable telemetry during the build (optional)
ENV NEXT_TELEMETRY_DISABLED 1

RUN \
    if [ -f yarn.lock ]; then yarn build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Production image, copy all the files and run Next.js
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Disable telemetry during runtime (optional)
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets and remove write permissions
COPY ./public ./public
RUN chmod -R a-w ./public

# Copy built application and static files with appropriate ownership
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
RUN chmod -R a-w ./.next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
RUN chmod -R a-w ./.next/static

# Switch to non-root user
USER nextjs

# Expose the default port
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the application
CMD ["node", "server.js"]
