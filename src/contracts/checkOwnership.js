const checkContractOwnership = require('./checkContractOwnership')

async function checkOwnership({
    artifacts,
    addressBook,
    roles,
    verbose
} = {}) {
    if (verbose) {
        console.log(
            'Checking the ownership of deployed contracts.'
        )
    }

    for (const contractName in addressBook) {
        await checkContractOwnership({
            artifacts,
            contractName,
            address: addressBook[contractName],
            ownerWalletAddress: roles.ownerWallet,
            strict: true
        })
    }

    if (verbose) {
        console.log(
            'Ownership is correctly set.'
        )
    }
}

module.exports = checkOwnership
