const loadWallet = require('../wallet/loadWallet')
const loadArtifacts = require('../contracts/artifacts/loadArtifacts')

const auditOwnership = require('./auditOwnership')
const auditUpgradeTransactions = require('./auditUpgradeTransactions')

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

    await auditUpgradeTransactions({
        entries,
        upgraderWallet,
        loadedArtifacts
    })
}

module.exports = audit
