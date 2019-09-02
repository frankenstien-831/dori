const zosGetMigrations = require('../../handlers/getMigrations')

async function getProxyAddress(
    projectName,
    contractName,
    networkId
) {
    const { proxies } = zosGetMigrations(networkId)
    const proxyEntries = proxies[`${projectName}/${contractName}`]

    if (!proxyEntries) {
        throw new Error(`No proxy address was found for contract: ${contractName}`)
    }

    return proxyEntries[proxyEntries.length - 1].address
}

module.exports = getProxyAddress
