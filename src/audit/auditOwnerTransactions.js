const getTransactionIds = require('../wallet/getTransactionIds')
const getABIFunctionBySignature = require('../contracts/artifacts/getABIFunctionBySignature')
const createFunctionSignature = require('../contracts/artifacts/createFunctionSignature')

const log = require('../log')

const sigs = {
    [createFunctionSignature({ functionName: 'addOwner', parameters: ['address'] })]: 'addOwner(address)',
    [createFunctionSignature({ functionName: 'removeOwner', parameters: ['address'] })]: 'removeOwner(address)',
    [createFunctionSignature({ functionName: 'replaceOwner', parameters: ['address', 'address'] })]: 'replaceOwner(address,address)',
    [createFunctionSignature({ functionName: 'mint', parameters: ['address', 'uint256'] })]: 'mint(address,uint256)'
}

async function auditOwnerTransactions({
    web3,
    entries,
    ownerWallet,
    loadedArtifacts
} = {}) {
    log({
        message: ['Auditing Owner Transactions']
    })

    /* eslint-disable-next-line no-console */
    console.log(
        'Owner Wallet:', ownerWallet.address,
        '\n'
    )

    const txIds = await getTransactionIds({
        entries,
        wallet: ownerWallet
    })

    // sort, to have to latest on top
    const sortedTxIds = txIds.sort((a, b) => b.toNumber() - a.toNumber())

    for (const txId of sortedTxIds) {
        // get transaction by transaction id
        const transaction = await ownerWallet.transactions(
            txId
        )

        // get the confirmations for this tx id
        const confirmations = await ownerWallet.getConfirmations(
            txId
        )

        // search artifact for this tx id
        const artifact = loadedArtifacts.find((a) => a.address === transaction.destination)

        // slice out the signature
        const signature = transaction.data.substr(0, 10)
        // slice out the payload
        const payload = '0x' + transaction.data.substr(10, transaction.data.length - 1)

        let artifactName = 'Unknown'
        let abiFunction = null
        let mappedParameters = null
        let functionName = signature

        if (artifact) {
            artifactName = artifact.name
            abiFunction = getABIFunctionBySignature({
                abi: artifact.abi,
                signature
            })

            const decodedParameters = web3.eth.abi.decodeParameters(
                abiFunction.inputs,
                payload
            )

            mappedParameters = {}

            for (const parameter of abiFunction.inputs) {
                mappedParameters[parameter.name] = decodedParameters[parameter.name]
            }

            functionName = abiFunction.name
        } else {
            if (sigs[signature]) {
                functionName = sigs[signature]
            }
        }

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
            'Function:', `${functionName}`,
            '\n',
            'Parameters:', `${mappedParameters ? JSON.stringify(mappedParameters, null, 2) : 'Unknown'}`,
            '\n',
            'Data:', payload,
            '\n',
            'Confirmed from:', confirmations.join(', '),
            '\n',
            'Executed:', transaction.executed
        )
    }
}

module.exports = auditOwnerTransactions
