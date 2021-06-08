// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

//use ERC721Enumerable instead of ERC721 to be able to use totalSupply function

contract Color is ERC721Enumerable{

	//Track all tokens, string array anyone can access 
	string[] public colors;
	

	mapping(string => bool) _colorExists;


	constructor() ERC721("Color", "COLOR") {}

	//Anybody can mint a new token

	function mint(string memory _color) public {
		//Require unique color, using psuh no longer returns length since solidity 0.6
		// it returns a reference to added element
		// uint _id = colors.push(_color);
		
		require(!_colorExists[_color]);
		colors.push(_color);
		uint _id = colors.length -1;
		_safeMint(msg.sender, _id); 
		_colorExists[_color] = true;

		//Color is passed and added
		//Call mint function
		//Color is tracked

	}
}