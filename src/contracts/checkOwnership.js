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

    const Ownable = await artifacts.require('Ownable')

    for (const contractName in addressBook) {
        const contract = await Ownable.at(addressBook[contractName])

        let contractOwner = ''

        try {
            contractOwner = await contract.owner()
        } catch (ex) {
            throw new Error(`Contract ${contractName} is not ownable!`)
        }

        if (contractOwner.toLowerCase() !== roles.ownerWallet.toLowerCase()) {
            throw new Error(`Owner of contract ${contractName} is not multi sig! but ${contractOwner}`)
        }
    }

    if (verbose) {
        console.log(
            'Ownership is correctly set.'
        )
    }
}

module.exports = checkOwnership
