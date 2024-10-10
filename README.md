[![Jest Tests](https://github.com/pooriaset/nextjs-woo/actions/workflows/ci.yml/badge.svg)](https://github.com/pooriaset/nextjs-woo/actions/workflows/ci.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/44a0c5c74885490cbecbca9fa80d154b)](https://app.codacy.com/gh/pooriaset/nextjs-woo/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![CodeFactor](https://www.codefactor.io/repository/github/pooriaset/nextjs-woo/badge)](https://www.codefactor.io/repository/github/pooriaset/nextjs-woo)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pooriaset_nextjs-woo&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=pooriaset_nextjs-woo)

# nextjs-woo

A brief description of your project, its purpose, and what problems it solves. You can also mention any key features or technologies used.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

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

2. Open `.env.local` in your preferred text editor and configure the necessary environment variables according to your setup. If you want to change the API URL, you can do this by modifying the `NEXT_PUBLIC_GRAPHQL_URL` variable in the .env.local file.

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
