const {
    zosCreate
} = require('../src/dori')

const initializeContracts = async ({
    contracts,
    roles,
    network,
    verbose = true
} = {}) => {
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
        addressBook.Test = zosCreate({
            contract: 'Test',
            network,
            args: null,
            verbose
        })
    }

    if (contracts.indexOf('EarlyOwner') > -1) {
        addressBook.EarlyOwner = zosCreate({
            contract: 'EarlyOwner',
            network,
            args: [
                roles.ownerWallet
            ],
            verbose
        })
    }

    return addressBook
}

module.exports = initializeContracts
