const fs = require('fs')
const path = require('path')

const artifactsDir = `${process.env.PWD}/artifacts`

function writeArtifact(
    artifact,
    // name of the network
    networkName
) {
    // set filename
    const filename = `${artifact.name}.${networkName.toLowerCase()}.json`

    // write artifact
    const artifactString = JSON.stringify(
        artifact,
        null,
        2
    )

    const resolvedArtifactsDir = path.resolve(artifactsDir)

    if (!fs.existsSync(resolvedArtifactsDir)) {
        fs.mkdirSync(resolvedArtifactsDir)
    }

    /* eslint-disable-next-line security/detect-non-literal-fs-filename */
    fs.writeFileSync(
        `${resolvedArtifactsDir}/${filename}`,
        artifactString
    )
}

module.exports = writeArtifact
