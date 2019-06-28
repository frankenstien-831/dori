module.exports = {
    networks: {
        // only used locally, i.e. ganache
        development: {
            host: 'localhost',
            port: 8545,
            // has to be '*' because this is usually ganache
            network_id: '*',
            gas: 6721975
        },
    },
    compilers: {
        solc: {
            version: '0.5.6',
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        }
    }
}
