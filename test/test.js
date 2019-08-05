/* globals web3, artifacts */
const {
    deployContracts,
    upgradeContracts,
    zosCreate,
    confirmUpgrade,
    audit,
    getAddresses
} = require('../src/dori')

function evaluateContracts({
    contracts = []
} = {}) {
    return contracts
}

async function initializeContracts({
    contracts,
    roles,
    network,
    verbose = true
} = {}) {
    const addressBook = {}

    // WARNING!
    // use this only when deploying a selective portion of the contracts
    // Only use this if you know what you do, otherwise it can break the contracts deployed
    const proxies = {}

    // returns either the address from the address book or the address of the manual set proxies
    /* eslint-disable-next-line no-unused-vars */
    const getAddress = (contract) => {
        return addressBook[contract] || proxies[contract]
    }

    if (contracts.indexOf('Test') > -1) {
        addressBook['Test'] = zosCreate({
            contract: 'Test',
            network,
            args: null,
            verbose
        })
    }

    return addressBook
}

async function setupContracts({
    verbose
} = {}) {
    if (verbose) {
        /* eslint-disable-next-line no-console */
        console.log('Setting up contracts')
    }
}

const verbose = true

module.exports = async (cb) => {
    // deploy the contract
    await deployContracts({
        web3,
        artifacts,
        evaluateContracts,
        initializeContracts,
        setupContracts,
        contracts: [
            'Test'
        ],
        forceWalletCreation: true,
        deeperClean: true,
        testnet: false,
        verbose
    })
        .catch(err => cb(err))

    // upgrade the contract
    const taskBook = await upgradeContracts({
        web3,
        artifacts,
        evaluateContracts,
        contracts: [
            'Upgrade:Test'
        ],
        verbose
    })
        .catch(err => cb(err))

    const accounts = await web3.eth.getAccounts()

    // confirm the upgrade
    await confirmUpgrade(
        web3,
        taskBook['Test'],
        accounts[2],
        verbose
    )
        .catch(err => cb(err))

    await audit({
        web3,
        evaluateContracts,
        verbose
    })
        .catch(err => cb(err))

    await getAddresses({
        network: 'development'
    })
        .catch(err => cb(err))

    cb()
}
