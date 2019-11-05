const evaluateContracts = ({
    contracts = []
} = {}) => {
    return contracts && contracts.length > 0 ? contracts : [
        'Test',
        'EarlyOwner'
    ]
}

module.exports = evaluateContracts
