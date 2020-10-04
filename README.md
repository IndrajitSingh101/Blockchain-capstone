# Udacity Blockchain Developer Nanodegree Program - Capstone: Real Estate Marketplace

The capstone will build upon the knowledge gained in the course in order to build a decentralized housing product.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Please make sure you've already installed ganache-cli, Truffle and enabled the MetaMask extension in your browser.

### Installing

A step by step series of examples that tell you have to get a development environment running.

Clone this repository and install all requisite npm packages (as listed in ```package.json```):

```
npm install
```

Change into the contracts folder:

```cd eth-contracts```

Launch Ganache:

```
I have used Ganache UI 
```

In a separate terminal window, compile the smart contracts:

```
truffle compile
```

This will create the smart contract artifacts in folder ```build/contracts```.

Migrate smart contracts to the locally running blockchain, Ganache :

```
truffle migrate
```

Test the smart contracts:

```
truffle test
```

All 11 tests should pass and your terminal should look something like this:

![truffle test](images/truffle_test.png)

## ZoKrates

The code repository already contains 10 pre-generated proofs that have been used to mint 10 tokens. The following instructions explain how the proofs have been generated.

* Step 1: Run Docker
  ```
  sudo systemctl start docker

  # In case SELinux prevents access to the local drive
  sudo su -c "setenforce 0"
  ```

* Step 2: Run ZoKrates
  ```
  docker run -v `pwd`/zokrates/code/:/home/zokrates/code -ti zokrates/zokrates /bin/bash
  ```

  Change into the square directory
  ``` 
  cd code/square/
  ``` 

* Step 3: Compile the program written in ZoKrates DSL
  ``` 
  ~/zokrates compile -i square.code
  ``` 

* Step 4: Generate the trusted setup
  ``` 
  ~/zokrates setup
  ```

* Step 5: Compute witness
  ``` 
  ~/zokrates compute-witness -a 2 4
  ```

* Step 6: Generate proof
  ```
  ~/zokrates generate-proof
  ```

* Step 7: Export verifier
  ```  
  ~/zokrates export-verifier
  ```

Re-run steps 5 and 6 with different arguments, e.g. 3 5, to generate additional proofs for minting tokens.

## Deploy smart contracts on a public test network (Rinkeby)

Create the following files in the ```eth-contracts``` folder:
* ```.infura-key```: Your [Infura](https://infura.io/) key
* ```.mnemonic```: Your [MetaMask](https://metamask.io/) seed phrase (mnemonic)

Execute the following command deploy the contracts to Rinkeby:

```truffle migrate --network rinkeby --reset```

The smart contracts are deployed on the Ethereum Rinkeby test network:
* CustomERC721Token: [```0xB6b4e6Aef016654F3a66A41e2432069aAD14d09D```](https://rinkeby.etherscan.io/address/0xB6b4e6Aef016654F3a66A41e2432069aAD14d09D)
* SquareVerifier: [```0xcdE57efB64a06E25f5deB40d027701F72B000150```](https://rinkeby.etherscan.io/address/0xcdE57efB64a06E25f5deB40d027701F72B000150)
* SolnSquareVerifier: [```0x1450a8C2194E1aE41F01F4693DFF64584E0e3f6c```](https://rinkeby.etherscan.io/address/0x1450a8C2194E1aE41F01F4693DFF64584E0e3f6c)

## Minting tokens

Before tokens can be minted, a new solution for the given token ID needs to be submitted, e.g.:

```node submit-solution.js ../zokrates/code/square/proofs/5/proof.json 5```

Now the token can be minted, e.g.:

```node mint-token.js 5```

## Generate OpenSea marketplace

Use the [OpenSea Rinkeby environment](https://rinkeby.opensea.io/get-listed/step-two) to list the SolnSquareVerifier token (```0x1450a8C2194E1aE41F01F4693DFF64584E0e3f6c```).

After listing, the marketplace should look like this:

![OpenSea Rinkeby marketplace](images/opensea.png)

Check out the Abode Token assets on OpenSea: [https://rinkeby.opensea.io/storefront/unidentified-contract-v825](Abode Token)


## Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

## Versions

* Truffle v5.1.39 (core: 5.1.39)
* Solidity - ^0.5.2 (solc-js)
* Node v12.18.4
* Web3.js v1.2.1

## License

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2019 © <a href="https://github.com/IndrajitSingh101" target="_blank">Indrajit Singh</a>.