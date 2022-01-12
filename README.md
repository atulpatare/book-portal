## Solidity Core
Create and deploy a contract with solidity

What's built:
- Building a book portal to accept book suggestion from the user.

What's involved:
* Writing contract with solidity.
* Deploying on local net using Hardhat
* Storing data on contract
* Deploying contract on test net
* Funding the contract and making transactions
* Call deployed contract from front end.


## Execution
1. Clone the repo
2. Install the dependencies
```shell
npm install
```
3. Add variables
* Your wallet private address 
* [Alchemy](https://dashboard.alchemyapi.io/) api key or url from dashboard
```shell
cp .env.sample .env
```
4. To run the contract 
```shell
npx hardhat run scripts/run.js
```
5. To deploy to local network
```shell
terminal 1: npx hardhat node # run local node
terminal 2: npx hardhat run scripts/deploy.js --network localhost
```
6. To deploy to Rinkeby test net
```console
npx hardhat run scripts/deploy.js --network rinkeby
```


## Helpful commands
```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
