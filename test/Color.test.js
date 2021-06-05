//artifacts are in json file
const Color = artifacts.require('./Color.sol')

//must instal chai and chai-as-promised modules 
require('chai') 
  .use(require('chai-as-promised'))
  .should()

contract('Color', (accounts) => {
  let contract

  //before runs always before an it function
  before(async () => {
    contract = await Color.deployed() 
  })

  describe('deployment', async() => { //container for it tests
    it('deploys succesfully', async() => {

      const address = contract.address
      assert.notEqual(address, '')
      assert.notEqual(address, 0x0)
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)

    })

    it('has a name', async () => {
      const name = await contract.name()
      assert.equal(name, 'Color')
    })

    it('has a Symbol', async () => {
      const symbol = await contract.symbol()
      assert.equal(symbol, 'COLOR')
    })    

    describe
  })

  describe('minting', async() => {
    it('creates a new token', async() => {
      const result = await contract.mint('#EC058E')
      const totalSupply = await contract.totalSupply()
    })
  })
})
