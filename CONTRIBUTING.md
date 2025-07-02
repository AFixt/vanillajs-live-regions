# Contributing

## Important notes

Please don't edit files in the `dist` subdirectory as they are generated via build tools. You'll find source code in the `src` subdirectory!

### Code style

Regarding code style like indentation and whitespace, **follow the conventions you see used in the source already.** This project uses ESLint and Prettier to maintain consistent code style.

### Testing

This project uses Vitest for testing. You can run tests in a browser environment using jsdom. Please be sure to test thoroughly and add tests for any new functionality.

## Modifying the code

First, ensure that you have the latest [Node.js](http://nodejs.org/) (version 16 or higher) and [npm](http://npmjs.org/) installed.

1. Fork and clone the repo.
2. Run `npm install` to install all dependencies.
3. Run `npm test` to run the test suite.
4. Run `npm run build` to build the project.
5. Run `npm run dev` to start the development server.

Assuming that you don't see any errors, you're ready to go. Just be sure to run the linting and tests after making any changes:

```bash
npm run lint      # Check code style
npm run test      # Run tests
npm run build     # Build the project
```

## Development workflow

1. Make your changes in the `src/` directory
2. Add or update tests in the `test/` directory
3. Run `npm test` to ensure tests pass
4. Run `npm run lint` to check code style
5. Run `npm run build` to generate the distribution files

## Submitting pull requests

1. Create a new branch, please don't work in your `main` branch directly.
2. Add failing tests for the change you want to make. Run `npm test` to see the tests fail.
3. Fix stuff.
4. Run `npm test` to see if the tests pass. Repeat steps 2-4 until done.
5. Run `npm run lint` to ensure code style compliance.
6. Update the documentation to reflect any changes.
7. Push to your fork and submit a pull request. If tests are failing or linting errors exist, the PR will be rejected.

## Project structure

```
├── src/
│   └── liveRegion.vanilla.js    # Main library source
├── test/
│   └── liveRegion.test.js       # Test suite
├── dist/                         # Built files (generated)
├── demo.html                     # Interactive demo
└── vite.config.js               # Build configuration
```
