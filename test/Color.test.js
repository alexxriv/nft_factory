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
      //SUCCESS
      assert.equal(totalSupply, 1)
      const event = result.logs[0].args
      assert.equal(event.tokenId.toNumber(), 0, 'id is correct')
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
      assert.equal(event.to, accounts[0], 'to is correct' )
      

      //FAILED: canont mint same tokentwice
      await contract.mint('#EC058E').should.be.rejected;
    })
  })

  describe('indexing', async() => {
    it('lists colors', async() => {
      //Mint 3 more tokens
      await contract.mint('#555555')
      await contract.mint('#FFFFFF')
      await contract.mint('#000000')

      const totalSupply = await contract.totalSupply()

      let color
      let result = []

      for(var i= 1; i <= totalSupply; i++){
        color= await contract.colors(i-1)
        result.push(color)

      }

      let expected = ['#EC058E','#555555' ,'#FFFFFF' , '#000000']
      assert.equal(result.join(','), expected.join(','))

    })
  })
})
