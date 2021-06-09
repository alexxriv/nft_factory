import React, { Component } from "react";
import Color from "./contracts/Color.json";
import getWeb3 from "./getWeb3";
import "./App.css";

class App extends Component {
  state = {web3: null, accounts: "", contract: null, totalSupply: 0, colors: [] };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      //set web3 to state
      this.setState({web3})

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Color.networks[networkId];

      if (deployedNetwork){
          const contract = new web3.eth.Contract(
            Color.abi,
            deployedNetwork && deployedNetwork.address,
          );

          // Set accounts, and contract to the state
          this.setState({accounts, contract });


          //totalSupply (call=read data, send= write data)
          const totalSupply = await contract.methods.totalSupply().call()
          this.setState({totalSupply})

          //Load NFT tokens (Colors) to website, similar to test file
          for (var i=1; i <= totalSupply; i++) {

            const color = await contract.methods.colors(i-1).call() 
            this.setState({
              colors: [...this.state.colors, color] //... = appends color to array "colors"
            })
          }
          console.log(this.state.colors)


      } else {
        window.alert("Smart Contract not deployed to detected network");

      }


    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };


  mint = async (color) => {

    let newColor = "#".concat(color)
    //when changing state of contract use send
    newColor= newColor.toString()
    this.state.contract.methods.mint(newColor).send({
      from: this.state.accounts[0]
    }).once('receipt', (receipt) => {
      this.setState({
        colors: [...this.state.colors, newColor.toString()]
      })
      
    })
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    if(!this.state.contract){
      return <div>Contract not deployed in detected network</div>;
    }
    return (
      <div className="App">
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://www.criptoeconomia.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            NFT Factory
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.accounts}</span></small>
            </li>
          </ul>
        </nav>

        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              <h1>Issue new NFT </h1>
              <form onSubmit= {(event) => {
                event.preventDefault(); 
                const color = this.color.value.toString();
                this.mint(color);
              }}>
                <input 
                  type= "text"
                  className= 'form-control mb-1'
                  placeholder= 'e.g. FFFFFF'
                  ref= {(input) => {this.color = input}}
                />
                <input 
                type='submit' 
                className='btn btn-block btn-primary'
                value= "MINT"
                />
              </form>


              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center">
            {this.state.colors.map((color, key) => {
              return (
                <div key = {key} className="col-md-3 mb-3">
                <div className= "token" style={{backgroundColor: color}}></div>
                <div> {color} </div>
                </div>
                )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
