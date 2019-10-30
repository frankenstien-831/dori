const log = require('../log')
const contract = require('@truffle/contract')
const Proxy = contract(require('zos-lib/build/contracts/AdminUpgradeabilityProxy'))

const checkUpgrade = async (artifact) => {
    const artifactProxyInstance = await Proxy.at(artifact.address)

    const upgradeEvents = await artifactProxyInstance.getPastEvents('Upgraded', {
        fromBlock: 0,
        toBlock: 'latest'
    })

    const lastUpgradeEvent = upgradeEvents.length > 0 ? upgradeEvents[upgradeEvents.length - 1] : null

    console.log(`Contract '${artifact.name}':`)

    if (lastUpgradeEvent) {
        const match = lastUpgradeEvent.returnValues.implementation === artifact.implementation

        console.log(
            `is pointing to implementation '${lastUpgradeEvent.returnValues.implementation}'`
        )
        if (!match) {
            console.log(
                `it does not match the implementation in the artifact which is '${artifact.implementation}'`
            )
        }
    } else {
        console.log('has never been upgraded!')
    }

    console.log()
}

async function auditUpgrades({
    web3,
    loadedArtifacts
} = {}) {
    log({
        message: ['Auditing Contract Upgrades']
    })

    Proxy.setProvider(web3.currentProvider)

    await Promise.all(
        loadedArtifacts.map((artifact) => checkUpgrade(artifact))
    )
}

module.exports = auditUpgrades
