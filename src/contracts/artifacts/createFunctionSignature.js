const web3Utils = require('web3-utils')

function createFunctionSignature({
    functionName,
    parameters
} = {}) {
    const signature = `${functionName}(${parameters.join(',')})`

    const signatureHash = web3Utils.sha3(signature)
    return signatureHash.substring(0, 10)
}

module.exports = createFunctionSignature
