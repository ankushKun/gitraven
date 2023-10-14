# GitRaven

or should I say _get(git) revenue(raven)_? 😉

GitRaven is a Blockchain based issue bounty platform. Here maintainers can create bounties for their issues and contributors can claim them. The bounty amount is then transferred to the contributor's account once the issue is closed and accepted by the maintainer.

# Index

- [GitRaven](#gitraven)
- [Index](#index)
- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
    - [Tech Used](#tech-used)
  - [Fork \& Clone the repository](#fork--clone-the-repository)
  - [Install dependencies](#install-dependencies)
  - [Setup environment variables](#setup-environment-variables)
  - [Run the app](#run-the-app)
- [Contributing](#contributing)
- [License](#license)

# Project Setup

## Prerequisites

- [Node.js](https://nodejs.org/en/) (Latest LTS release, nvm preferred)
- Typescript + Solidity knowledge

### Tech Used

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Remix IDE](https://remix.ethereum.org/)
- [Tableland](https://tableland.xyz/)
- [Web3Modal](https://web3modal.com)

## Fork & Clone the repository

```bash
git clone git@github.com:<YOUR_USERNAME>/gitraven.git
cd gitraven
```

Here you will find two folders:

- `nextapp` containing the Next13 webapp
- `contracts` containing all the solidity smart contracts

## Install dependencies

```bash
cd nextapp
npm i
```

## Setup environment variables

Create a `.env` file in the `nextapp` folder and add the following variables:

```env
WC_PROJECT_ID=WALLET_CONNECT_PROJECT_ID
GITHUB_ID=GITHUB_OAUTH_APP_ID
GITHUB_SECRET=GITHUB_OAUTH_APP_SECRET
NEXTAUTH_URL=URL_FOR_THE_WEBAPP
NEXTAUTH_SECRET=RANDOM_STRING_FOR_SESSIONS
```

You can get the `WC_PROJECT_ID` from [wallet connect](https://walletconnect.org/apps) by creating a new project.

You can get the `GITHUB_ID` and `GITHUB_SECRET` from [github](https://github.com/settings/developers) by adding a new app.

`NEXTAUTH_URL` is the URL where you will be running the app. For example, `http://localhost:3000` for development or `https://somedomain.com`.

`NEXTAUTH_SECRET` is a random string that will be used for session management. You can generate one using [random key gen](https://randomkeygen.com/).

## Run the app

```bash
npm run dev
```

This will start the app in development mode. You can access it at `http://localhost:3000`.

# Contributing

Contributions to enhance the webapp or any smart contract is highly appreciated. Please raise an issue before making any PRs.

# License

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]
[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]


This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].


[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

See [LICENSE](/LICENSE) for details.