/* eslint-disable-next-line security/detect-child-process */
const { execSync } = require('child_process')
const TIMEOUT = 1 * 60 * 60 // 1 hour

function create({
    contract,
    network,
    initializer = 'initialize',
    args,
    verbose = true
} = {}) {
    const flags = verbose ? '-v' : '-s'

    const initializerArgs = args ? ` --args ${args.join(',')}` : ''

    return execSync(`npx zos create ${contract} --init ${initializer} ${initializerArgs} ${flags} --timeout ${TIMEOUT}`)
        .toString()
        .trim()
}

module.exports = create
