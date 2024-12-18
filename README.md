[![Jest Tests](https://github.com/pooriaset/nextjs-woo/actions/workflows/ci.yml/badge.svg)](https://github.com/pooriaset/nextjs-woo/actions/workflows/ci.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/44a0c5c74885490cbecbca9fa80d154b)](https://app.codacy.com/gh/pooriaset/nextjs-woo/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![CodeFactor](https://www.codefactor.io/repository/github/pooriaset/nextjs-woo/badge)](https://www.codefactor.io/repository/github/pooriaset/nextjs-woo)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pooriaset_nextjs-woo&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=pooriaset_nextjs-woo)

# nextjs-woo

Next.js & WooCommerce integration with Apollo Client & WP-GraphQL for efficient ecommerce functionalities in WordPress.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Requirements

Before setting up the Next.js application, ensure that you have a WordPress installation as the backend with the following plugins:

- **[WooCommerce](https://wordpress.org/plugins/woocommerce/)**: For eCommerce functionality.
- **[WP-GraphQL](https://wordpress.org/plugins/wp-graphql/)**: Provides a GraphQL API for your WordPress site.
- **[WPGraphQL for WooCommerce (WooGraphQL)](https://github.com/wp-graphql/wp-graphql-woocommerce)**: Extends WP-GraphQL to include WooCommerce data.
- **[WPGraphQL JWT Authentication](https://github.com/wp-graphql/wp-graphql-jwt-authentication)**: Enables JWT authentication for secure API access.
- **[wp-nextjs-woo](https://github.com/pooriaset/wp-nextjs-woo)**: A necessary plugin for this Next.js project to work with your WordPress setup.

## Installation

To get started with this project, follow these steps to set up your development environment.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version specified in the `.nvmrc` file)
- [Yarn](https://yarnpkg.com/) (version specified in the `package.json` file)

### Step 1: Clone the Repository

To get the project files onto your local machine, you need to clone the repository. You can do this by visiting the repository page on GitHub, clicking the green "Code" button, and copying the URL provided. Then, use your preferred Git client or command line to clone the repository to your desired directory.

### Step 2: Install Dependencies

Next, install the project dependencies using Yarn:

```bash
yarn install
```

### Step 3: Create Environment Variables

Before running the development server, you need to create a .env.local file based on the provided .env.sample file. This file will contain your environment-specific variables.

1. Copy the sample environment file:

```bash
cp .env.sample .env.local
```

2. Open `.env.local` in your preferred text editor and configure the necessary environment variables according to your setup. If you want to change the API URL, you can do this by modifying the `NEXT_PUBLIC_BACKEND_URL` variable in the .env.local file.

### Step 4: Run the Development Server

Now you can start the development server:

```bash
yarn dev
```

Your application should now be running at http://localhost:3000.

## Contributing

Forking the repository
Creating a new branch for your feature or bug fix
Submitting a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for details.
