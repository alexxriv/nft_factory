const path = require("path");
require('dotenv').config(path);

const HDWalletProvider  = require('@truffle/hdwallet-provider');
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },


    mainnet: {
      provider: function() {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          `https://mainnet.infura.io/${process.env.INFURA_API_KEY}`
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      confirmations: 2,
      network_id: 1
    },
    
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 3
    },

    binance: {
      provider: function() {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          'https://bsc-dataseed.binance.org'
        )
      },
      gas: 5000000,
      network_id: 56
    },

    binanceTestnet: {
      provider: function() {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          'https://data-seed-prebsc-1-s1.binance.org:8545/'
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 97
    }
  },

  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }

};
