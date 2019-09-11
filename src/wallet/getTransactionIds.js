async function getTransactionIds({
    entries,
    wallet
} = {}) {
    // set limits on what to fetch from the wallet
    const max = entries
    const txCount = await wallet.transactionCount()
    const from = txCount - max > 0 ? txCount - max : 0
    const to = txCount.toNumber()

    // get the desired transaction ids
    const txIds = await wallet.getTransactionIds(
        from,
        to,
        true,
        true
    )

    return txIds
}

module.exports = getTransactionIds
