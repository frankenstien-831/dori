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
npm install https://github.com/oceanprotocol/dori.git
```

## Usage

To deploy a contract do the following:

```javascript
const {
    deployContracts
} = require('@oceanprotocol/dori')

await deployContracts({
    // coming from truffle
    web3,
    // coming from truffle
    artifacts,
    evaluateContracts: () => {
        // decide which contracts to deploy here
    },
    initializeContracts: () => {
        // call the initializer here
    },
    setupContracts: () => {
        // call the in initialize contracts here to set them up
    },
    contracts: [
        'MyContract'
    ],
    forceWalletCreation: true,
    deeperClean: true,
    testnet: false,
    verbose: true
})
```

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

