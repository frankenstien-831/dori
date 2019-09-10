const fs = require('fs')
const path = require('path')

const artifactsDir = `${process.env.PWD}/artifacts`

function loadArtifact(
    contractName,
    networkName
) {
    const artifactFileName = `${contractName}.${networkName.toLowerCase()}.json`

    const resolvedArtifactsDir = path.resolve(artifactsDir)

    if (!fs.existsSync(resolvedArtifactsDir)) {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        fs.mkdirSync(resolvedArtifactsDir)
    }

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const atritfactString = fs.readFileSync(
        `${resolvedArtifactsDir}/${artifactFileName}`,
        'utf8'
    ).toString()

    const artifact = JSON.parse(atritfactString)

    return artifact
}

module.exports = loadArtifact
