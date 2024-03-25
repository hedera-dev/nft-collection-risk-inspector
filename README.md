# Rug Risk Inspector for Hedera Tokens

This application provides a tool to calculate the rug risk for tokens on the Hedera network. It is built using `React` with `Vite` as the build tool, leveraging components from `shadcn` and styled with `Tailwind CSS`. The risk score calculation feature is facilitated by the `@hashgraph/hedera-nft-utilities` package.

<a href="public/rug-risk-score-inspector-readme.png" target="_blank" >
  <img alt='The Rug Risk Inspector app preview' src='public/rug-risk-score-inspector-readme.png'  width="40%" style='border: 10px solid #000'/>
</a>

## Features

- **Risk Score Calculation**: Utilize the `@hashgraph/hedera-nft-utilities` package to calculate token risk score for new or existing Hedera Token.
- **User-Friendly Interface**: Intuitive and easy-to-use interface built with `React` and components built on `shadcn/ui`.
- **Fast Development**: Developed with Vite, ensuring speedy development and hot module replacement.

## Pre-requirements

To run this app, you need to have the following pre-requirements:

- Node.js: Install Node.js on your machine. You can download it from the official website: [Node.js](https://nodejs.org/).
- pnpm: Install pnpm, a fast package manager for JavaScript. You can install it globally by running the following command:

```bash
  npm install -g pnpm
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Ashe-Oro-Accelerator/rug-risk-inspector
```

2. Navigate to the project directory:

```bash
cd rug-risk-inspector
```

3. Install dependencies:

```bash
pnpm install
```

## Usage

1. Start the development server:

```bash
pnpm dev
```

2. Open your browser and go to `http://localhost:5173` to access the application.

3. Input token details and utilize the provided functionalities to calculate the rug risk score.

## Dependencies

- `React`: JavaScript library for building user interfaces.
- `Vite`: Next-generation frontend tooling for modern web development.
- `Tailwind CSS`: Utility-first CSS framework for rapid UI development.
- `shadcn`: Collection of React components for building interfaces.
- `@hashgraph/hedera-nft-utilities`: package includes all sorts of tooling for the Hedera NFT ecosystem.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Shadcn](https://ui.shadcn.com/) for providing the React components.
- [`@hashgraph/hedera-nft-utilities` package](https://github.com/hashgraph/hedera-nft-utilities).
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework.
- [React](https://react.dev/) and [Vite](https://vitejs.dev/) communities for their invaluable resources and support.
