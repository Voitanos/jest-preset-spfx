# jest-preset-spfx

A [Jest](http://facebook.github.io/jest) preset configuration for [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview) (SPFx) projects.

> **NOTE**: This preset does not contain any support for SPFx projects that utilize React.
>
> See the related packages [jest-preset-spfx-react15](https://www.npmjs.com/package/@voitanos/jest-preset-spfx-react15) & [jest-preset-spfx-react16](https://www.npmjs.com/package/@voitanos/jest-preset-spfx-react16) if you are leveraging React in your SPFx projects.

## Installation

Install Jest & this preset using your package manager of choice:

```shell
npm install jest @voitanos/jest-preset-spfx --save-dev
```

This will install `@types/jest`, `ts-jest` & `identity-obj-proxy` as dependencies in your project.

The postinstall script will verify you have a `./config/jest.config.json` file and update your `package.json` scripts with two scripts for running Jest tests with this configuration: `test` & `test:watch`.

If the configuration file is not present, it will create it. If it is present, it will verify the minimal properties.

> **NOTE**: A specific version of `ts-jest` is used to support the SPFx supported version of TypeScript as more current versions of `ts-jest` require newer versions of TypeScript that is not yet supported by SPFx.

## Validating Installation

To validate a successful install, do one of the following two things:

### Option 1: Add example tests

1. Copy the folder **examples** from the installed package (*also found [here in the source repo](https://github.com/Voitanos/jest-preset-spfx/tree/master/examples)*) into the project's **src** folder.
1. Execute Jest to run the tests:

    ```shell
    npm test
    ```

1. Observe four (4) passing tests.

### Option 2: Create your own test

1. Add a new file `SampleTests.spec.ts` to the `./src/webparts` folder with the following code:

    ```ts
    import 'jest';

    test('1+1 should equal 2', () => {
      const result = 1+1;
      expect(result).toBe(2);
    });
    ```

1. Execute Jest to run the tests:

    ```shell
    npm test
    ```

1. Observe a single (1) passing test.

## How it works

This package contains a [base Jest configuration](https://github.com/Voitanos/jest-preset-spfx/blob/master/jest-preset.json) that your project will inherit. It does this by using the `preset` property to `@voitanos/jest-preset-spfx` in the `jest.config.json` file.

## References

### Package.json NPM scripts

Two scripts are added to the `package.json` scripts section:

- **test**: Run Jest and specify the configuration file to use: `npm test`.
- **test:watch**: Run Jest and specify the configuration file to use, but run in watch mode so when files change, it will automatically re-run the tests: `npm run test:watch`.

### Jest preset configuration for SPFx

The following preset is used for SPFx projects:

```json
{
  "collectCoverage": true,
  "coverageDirectory": "<rootDir>/../temp/test",
  "coverageReporters": [
    "json",
    "lcov",
    "text-summary"
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "json"
  ],
  "moduleNameMapper": {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^resx-strings/en-us.json": "<rootDir>/node_modules/@microsoft/sp-core-library/lib/resx-strings/en-us.json"
  },
  "testMatch": [
    "**/src/**/*.(spec|test).+(ts|js)?(x)",
    "**/__tests__/**/*.(spec|test).+(ts|js)?(x)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
}
```

Explanation of select configuration properties above:

- **collectCoverage**: collects code coverage statistics and generates associated reports in the `./temp/test` folder
- **moduleNameMapper**:
  - when Jest sees a request for a CSS/SCSS file in the source files, it effectively ignores it using the `identity-obj-proxy` package
  - when jest sees a request for `en-us.json`, it is provided a helper path to find the file
- **testMatch**: all tests found either in a special `__tests__` folder or within the `src` folder with the following names will be found:
  - `*.spec.ts`
  - `*.spec.tsx`
  - `*.spec.js`
  - `*.spec.jsx`
  - `*.test.ts`
  - `*.test.tsx`
  - `*.test.js`
  - `*.test.jsx`
- **transform**: the Jest preprocessor will transpile all TypeScript files to JavaScript before running the tests