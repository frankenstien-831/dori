// wallets
const loadWallet = require('../wallet/loadWallet')
const loadArtifacts = require('../contracts/artifacts/loadArtifacts')

// ownership
const auditOwnership = require('./auditOwnership')
const auditOwnerTransactions = require('./auditOwnerTransactions')

// upgrade
const auditUpgradeTransactions = require('./auditUpgradeTransactions')
const auditUpgrades = require('./auditUpgrades')

const NETWORK = process.env.NETWORK || 'development'

async function audit({
    web3,
    artifacts,
    evaluateContracts,
    entries = 20,
    strict = false,
    testnet = false,
    verbose = true
} = {}) {
    const upgraderWallet = await loadWallet(
        web3,
        'upgrader',
        verbose
    )

    const ownerWallet = await loadWallet(
        web3,
        'owner',
        verbose
    )

    // find out which contracts we gonna handle here
    const evaluatedContracts = await evaluateContracts({
        testnet,
        verbose
    })

    const loadedArtifacts = await loadArtifacts({
        contractNames: evaluatedContracts,
        networkName: NETWORK
    })

    await auditOwnership({
        artifacts,
        loadedArtifacts,
        ownerWalletAddress: ownerWallet.address,
        verbose,
        strict
    })

    await auditOwnerTransactions({
        web3,
        entries,
        ownerWallet,
        loadedArtifacts
    })

    await auditUpgradeTransactions({
        entries,
        upgraderWallet,
        loadedArtifacts
    })

    await auditUpgrades({
        web3,
        loadedArtifacts
    })
}

module.exports = audit
