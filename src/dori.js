const audit = require('./audit/audit')
const zosCreate = require('./contracts/zos/setup/create')
const loadWallet = require('./wallet/loadWallet')
const submitTransaction = require('./wallet/submitTransaction')
const confirmTransaction = require('./wallet/confirmTransaction')
const confirmUpgrade = require('./wallet/confirmUpgrade')
const deployContracts = require('./contracts/deployContracts')
const upgradeContracts = require('./contracts/upgradeContracts')
const getAddresses = require('./get-addresses/get-addresses')

module.exports = {
    upgradeContracts,
    deployContracts,
    confirmUpgrade,
    loadWallet,
    submitTransaction,
    confirmTransaction,
    audit,
    zosCreate,
    getAddresses
}
