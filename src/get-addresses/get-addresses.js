const fs = require('fs')
const path = require('path')

// The location of the artifact files.
const artifactsPath = `${process.env.PWD}/artifacts`
const resolvedArtifactsPath = path.resolve(artifactsPath)

async function getAddresses({
    network
} = {}) {
    if (!network) {
        throw new Error('No network given')
    }

    // Loop through all of the files.
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const files = fs.readdirSync(resolvedArtifactsPath)

    const artifacts = files.filter((f) => f.includes(`.${network}.`))

    if (artifacts.length < 1) {
        // eslint-disable-next-line no-console
        throw new Error(`No contracts found for network "${network}"`)
    }

    // eslint-disable-next-line no-console
    console.log(`| ${'Contract'.padEnd(33)} | Version | ${'Address'.padEnd(44)} |`)

    // eslint-disable-next-line no-console
    console.log('|-----------------------------------|---------|----------------------------------------------|')

    for (const artifactName of artifacts) {
        const artifactString = fs.readFileSync(
            `${resolvedArtifactsPath}/${artifactName}`,
            'utf8'
        )
        const artifact = JSON.parse(artifactString)
        const contractName = artifactName.split('.')[0]

        // eslint-disable-next-line no-console
        console.log(`| ${contractName.padEnd(33)} | ${artifact.version} | \`${artifact.address}\` |`)
    }
}

module.exports = getAddresses
