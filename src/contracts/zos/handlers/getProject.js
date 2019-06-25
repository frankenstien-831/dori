const fs = require('fs')

const zosPath = `${process.env.PWD}/zos.json`

function getProject() {
    /* eslint-disable-next-line security/detect-non-literal-fs-filename */
    const zosProjectFileString = fs.readFileSync(zosPath, 'utf8').toString()

    return JSON.parse(zosProjectFileString)
}

module.exports = getProject
