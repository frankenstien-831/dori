/* eslint-disable-next-line security/detect-child-process */
const { execSync } = require('child_process')
const TIMEOUT = 1 * 60 * 60 // 1 hour

function create({
    contract,
    network,
    args,
    verbose = true
} = {}) {
    const flags = verbose ? '-v' : '-s'

    const initializerConfiguration = args ? `--init initialize --args ${args.join(',')}` : ''

    return execSync(`npx zos create ${contract} ${initializerConfiguration} --timeout ${TIMEOUT} --skip-compile --network ${network} --no-interactive ${flags}`)
        .toString()
        .trim()
}

module.exports = create
