/* globals web3, artifacts */
const {
    deployContracts,
    upgradeContracts,
    confirmUpgrade,
    audit,
    getAddresses
} = require('../src/dori')

const evaluateContracts = require('./evaluateContracts')
const initializeContracts = require('./initializeContracts')
const setupContracts = require('./setupContracts')

const verbose = true

module.exports = async (cb) => {
    // deploy the contract
    await deployContracts({
        web3,
        artifacts,
        evaluateContracts,
        initializeContracts,
        setupContracts,
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
        taskBook.Test,
        accounts[2],
        verbose
    )
        .catch(err => cb(err))

    await audit({
        web3,
        artifacts,
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
