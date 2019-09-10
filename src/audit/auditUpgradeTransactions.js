const createFunctionSignature = require('../contracts/artifacts/createFunctionSignature')
const getTransactionIds = require('../wallet/getTransactionIds')
const log = require('../log')

async function auditUpgradeTransactions({
    entries,
    upgraderWallet,
    loadedArtifacts
} = {}) {
    log({
        message: ['Auditing Upgrade Transactions']
    })

    /* eslint-disable-next-line no-console */
    console.log(
        'Upgrader Wallet:', upgraderWallet.address,
        '\n'
    )

    const txIds = await getTransactionIds({
        entries,
        wallet: upgraderWallet
    })

    // sort, to have to latest on top
    const sortedTxIds = txIds.sort((a, b) => b.toNumber() - a.toNumber())

    // re-create the function signature for comparison
    const sig = createFunctionSignature({
        functionName: 'upgradeTo',
        parameters: ['address']
    })

    for (const txId of sortedTxIds) {
        // get transaction by transaction id
        const transaction = await upgraderWallet.transactions(
            txId
        )

        // get the confirmations for this tx id
        const confirmations = await upgraderWallet.getConfirmations(
            txId
        )

        // search artifact for this tx id
        const artifact = loadedArtifacts.find((a) => a.address === transaction.destination)
        const artifactName = artifact ? artifact.name : 'Unknown'

        // pretty print entry
        /* eslint-disable-next-line no-console */
        console.log(
            '\n',
            'Transaction ID:', txId.toString(),
            '\n',
            'Destination:', transaction.destination,
            '\n',
            'Contract:', `${artifactName}`,
            '\n',
            'Data is `upgradeTo` call:', transaction.data.startsWith(sig),
            '\n',
            'Confirmed from:', confirmations.join(', '),
            '\n',
            'Executed:', transaction.executed
        )
    }
}

module.exports = auditUpgradeTransactions
