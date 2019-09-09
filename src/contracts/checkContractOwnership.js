const log = require('../log')

async function checkContractOwnership({
    artifacts,
    contractName,
    address,
    ownerWalletAddress,
    strict = true
} = {}) {
    const Ownable = await artifacts.require('Ownable')

    const contract = await Ownable.at(address)

    let contractOwner

    try {
        contractOwner = await contract.owner()
    } catch (ex) {
        const msg = `Contract ${contractName} is not ownable!`
        if (strict) {
            throw new Error(msg)
        } else {
            log({
                message: [msg],
                severity: 'Error'
            })

            return false
        }
    }

    if (contractOwner.toLowerCase() !== ownerWalletAddress.toLowerCase()) {
        const msg = `Owner of contract ${contractName} is not multi sig! but ${contractOwner}`
        if (strict) {
            throw new Error(msg)
        } else {
            log({
                message: [msg],
                severity: 'Error'
            })

            return false
        }
    }

    return true
}

module.exports = checkContractOwnership
