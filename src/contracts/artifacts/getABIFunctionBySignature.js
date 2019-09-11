function getABIFunctionBySignature({
    abi,
    signature
} = {}) {
    for (const func of abi.filter((entry) => entry.type === 'function')) {
        if (func.signature && func.signature === signature) {
            return func
        }
    }
}

module.exports = getABIFunctionBySignature
