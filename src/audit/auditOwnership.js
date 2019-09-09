const checkContractOwnership = require('../contracts/checkContractOwnership')
const log = require('../log')

async function auditOwnership({
    artifacts,
    loadedArtifacts,
    ownerWalletAddress,
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

    for (const artifact of loadedArtifacts) {
        const rightOwner = await checkContractOwnership({
            artifacts,
            contractName: artifact.name,
            address: artifact.address,
            ownerWalletAddress,
            strict
        })

        if (rightOwner) {
            console.log(
                `Owner of contract ${artifact.name}, is set to the owner wallet at ${ownerWalletAddress}`
            )
        }
    }
}

module.exports = auditOwnership
