/* eslint-disable no-console */
const { name, version } = require(`${process.env.PWD}/package.json`)

const zosGetDeployedContracts = require('./zos/contracts/getDeployedContracts')
const zosCleanup = require('./zos/setup/cleanup')
const zosInit = require('./zos/setup/init')
const zosGetProject = require('./zos/handlers/getProject')
const zosSetAdmin = require('./zos/setAdmin')
const zosRegisterContracts = require('./zos/contracts/registerContracts')

const exportArtifacts = require('./artifacts/exportArtifacts')

/*
 *-----------------------------------------------------------------------
 * Script configuration
 * -----------------------------------------------------------------------
 * Config variables for initializers
 */
// load NETWORK from environment
const NETWORK = process.env.NETWORK || 'development'

async function deployContracts({
    web3,
    artifacts,
    contracts = [],
    evaluateContracts,
    initializeContracts,
    setupContracts,
    forceWalletCreation = false,
    deeperClean = false,
    testnet = false,
    verbose = true
} = {}) {
    contracts = evaluateContracts({
        contracts,
        testnet,
        verbose
    })

    const VERSION = `v${version}`

    const networkId = await web3.eth.net.getId()

    await zosCleanup(
        networkId,
        true,
        deeperClean,
        verbose
    )

    const roles = await zosInit(
        web3,
        name,
        NETWORK,
        VERSION,
        forceWalletCreation,
        verbose
    )

    const zosProject = zosGetProject()

    // we can only deploy if none of the contracts is already installed
    const deployedContracts = await zosGetDeployedContracts(
        zosProject.name,
        contracts,
        networkId,
        verbose
    )

    if (deployedContracts.length > 0) {
        throw new Error(
            `Deployment failed! Following contracts are already deployed: '${deployedContracts.join(', ')}'`
        )
    }

    await zosRegisterContracts(
        contracts,
        false,
        verbose
    )

    const addressBook = await initializeContracts(
        contracts,
        roles,
        verbose
    )

    if (verbose) {
        console.log(
            `Contracts deployed to the proxies: \n${JSON.stringify(addressBook, null, 2)}`
        )
    }

    if( setupContracts ) {
        await setupContracts(
            web3,
            artifacts,
            addressBook,
            roles,
            verbose
        )
    }

    await zosSetAdmin(
        contracts,
        roles,
        verbose
    )

    await exportArtifacts(
        name,
        NETWORK,
        networkId,
        VERSION,
        verbose
    )

    return addressBook
}

module.exports = deployContracts
