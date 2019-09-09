function log({
    severity,
    message = []
} = {}) {
    console.log()
    console.log('=============================================================')

    if (severity) {
        console.log(`${severity}!`)
    }

    for (const entry of message) {
        console.log(entry)
    }

    console.log('=============================================================')
    console.log()
}

module.exports = log
