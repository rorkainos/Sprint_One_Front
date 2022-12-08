# Job Roles Frontend Project

## Requirements

For development, you will only need Node.js installed on your environement.

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    ie v19.1.0

    $ npm --version
    ie 8.19.3


#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.

    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

If everything when fine, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs 

## Downloading dependancies
npm install --legacy-peer-deps

## Running appliacation
npm start

## Simple build
npm run build

## Running test
npm run test

The following environment variables need to be set in your local .zshrc file to enable running selenium tests:
export UI_URL="http://localhost:3000"

To run selenium test: mocha <test dir> i.e. mocha ./test/UI/UI_JobRolePage.js  
