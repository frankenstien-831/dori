const setupContracts = async ({
    addressBook,
    artifacts,
    roles,
    verbose
} = {}) => {
    if (verbose) {
        /* eslint-disable-next-line no-console */
        console.log('Setting up contracts')
    }

    const Test = await artifacts.require('Test')
    const TestInstance = await Test.at(addressBook.Test)

    await TestInstance.transferOwnership(
        roles.ownerWallet,
        { from: roles.deployer }
    )
}

module.exports = setupContracts
