[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

# dori

> 🐟Oh look, a Blockchain! Dori, the Zeppelin OS infused contract management framework.
> [oceanprotocol.com](https://oceanprotocol.com)

| TravisCI |
|----------|
|[![Build Status](https://travis-ci.com/oceanprotocol/dori.svg?token=mSZ2MXLyYWx4BqNCsqHs&branch=master)](https://travis-ci.com/oceanprotocol/dori)

---

**🐲🦑 THERE BE DRAGONS AND SQUIDS. This is in alpha state and you can expect running into problems. If you run into them, please open up [a new issue](https://github.com/oceanprotocol/keeper-contracts/issues). 🦑🐲**

---


## Table of Contents

  - [Get Started](#get-started)
  - [Usage](#usage)
  - [Testing](#testing)
  - [Contributing](#contributing)
  - [License](#license)
  
---

## Get Started

```bash
npm i @oceanprotocol/dori
```

## Usage

To deploy the contract `MyContract` do the following:

```javascript
const {
    deployContracts
} = require('@oceanprotocol/dori')

await deployContracts({
    // web3, coming from truffle
    web3,
    // artifacts, coming from truffle
    artifacts,
    evaluateContracts: ({
        contracts = []
    } = {}) => {
        // decide which contracts to deploy here
    },
    initializeContracts: async ({
        contracts,
        roles,
        network,
        verbose = true
    } = {}) => {
        // call the initializer of each contract here
    },
    setupContracts: async ({
        addressBook,
        artifacts,
        roles,
        verbose
    } = {}) => {
        // call the contracts here to set them up
    },
    contracts: [
        'MyContract'
    ],
    // forces the creation of wallets all the time
    forceWalletCreation: true,
    // clean zos session files 
    clean: true,
    // clean zos files and wallets on the current network as well
    deeperClean: true,
    // are we going to deploy to a testnet or a mainnet?
    testnet: false,
    // be verbose or not
    verbose: true
})
```
An example of the whole flow can be found [here](./test/test.js)

An example of `evaluateContracts` can be found [here](./test/evaluateContracts.js)

An example of `initializeContracts` can be found [here](./test/initializeContracts.js)

An example of `setupContracts` can be found [here](./test/setupContracts.js)

## Testing

Run tests with `npm run test`.

## Contributing

See the page titled "[Ways to Contribute](https://docs.oceanprotocol.com/concepts/contributing/)" in the Ocean Protocol documentation.

## License

```
Copyright 2019 Ocean Protocol Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

