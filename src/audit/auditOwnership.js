const checkContractOwnership = require('../contracts/checkContractOwnership')
const log = require('../log')

async function auditOwnership({
    artifacts,
    loadedArtifacts,
    ownerWalletAddress,
    verbose,
    strict
} = {}) {
    log({
        message: ['Auditing Contract Ownership']
    })

    /* eslint-disable-next-line no-console */
    console.log(
        'Owner Wallet:', ownerWalletAddress,
        '\n'
    )

    await Promise.all(
        loadedArtifacts.map((artifact) => checkContractOwnership({
            artifacts,
            contractName: artifact.name,
            address: artifact.address,
            ownerWalletAddress,
            verbose,
            strict
        }))
    )
}

module.exports = auditOwnership
