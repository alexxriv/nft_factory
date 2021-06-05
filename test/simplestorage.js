//artifacts are in json file
const Color = artifacts.require('./Color.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

conntract('Color', (accounts) => {

  describe('deployment', async()=> { //container for it tests
    it('deploys succesfully', async() => {

    })
  })
})
