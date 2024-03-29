const fs = require('fs')
const path = require('path')
const glob = require('glob')

function translateNetworkId(
    networkId
) {
    switch (networkId) {
        case 42:
            return 'kovan'
        case 1:
            return 'mainnet'
    }

    return networkId
}

function getMigrations(
    networkId
) {
    const zosSearchPath = `${process.env.PWD}/zos.*${translateNetworkId(networkId)}.json`
    const resolvedPath = path.resolve(zosSearchPath)

    const files = glob.sync(
        resolvedPath
    )

    if (files.length < 1) {
        throw new Error(
            `Cannot find any file for '${resolvedPath}'`
        )
    }

    const zosFile = files[0]

    /* eslint-disable-next-line security/detect-non-literal-fs-filename */
    const zosFileString = fs.readFileSync(zosFile, 'utf8').toString()

    return JSON.parse(zosFileString)
}

module.exports = getMigrations
