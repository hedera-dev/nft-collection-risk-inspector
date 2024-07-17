# Risk Calculator for Hedera Tokens

Risk Calculator application serves as a tool to evaluate the risk associated with tokens on the Hedera network, specifically to assess the likelihood of a rug pull based on a token's properties. It calculates a risk score and levels by examining various risk factors like Admin Key, Supply Key, KYC Key, etc.

## Usage

To run this application, install the dependencies and start the server with the following commands:

```
npm install
npm run dev
```

## Features

- Allows evaluation of new or existing tokens by entering the Token ID.
- Calculates risk scores based on token properties.
- Provides a detailed breakdown of risk factors affecting the score.
- User-friendly UI to toggle between the new token and existing token assessments.

## Technologies

This project was developed with React and Typescript, using some ready-made UI components from shadcn (https://ui.shadcn.com/).
There's no need to set any `.env` variables.

## Contributing

How to contribute to this project:

- Create a fork of this repo on GitHub.
- Clone that forked copy using GitHub.
- Make your changes on a new branch.
- Submit a PR against the main branch of this copy of the git repo.

## Links

- API Reference: REST API [Link](https://docs.hedera.com/hedera/sdks-and-apis/rest-api)
- Swagger UI: Hedera Mirror Node REST API [Link](https://testnet.mirrornode.hedera.com/api/v1/docs/)

## Licence

MIT
