// Copyright (c) 2018 Zilliqa 
// This source code is being disclosed to you solely for the purpose of your participation in 
// testing Zilliqa. You may view, compile and run the code for that purpose and pursuant to 
// the protocols and algorithms that are programmed into, and intended by, the code. You may 
// not do anything else with the code without express permission from Zilliqa Research Pte. Ltd., 
// including modifying or publishing the code (or any part of it), and developing or forming 
// another public or private blockchain network. This source code is provided ‘as is’ and no 
// warranties are given as to title or non-infringement, merchantability or fitness for purpose 
// and, to the extent permitted by law, all liability for your use of the code is disclaimed. 

const Node = require('./node')
const util = require('./util')
const schnorr = require('./schnorr')
const config = require('./config.json')

const validateArgs = util.validateArgs


function Zilliqa (args) {
  validateArgs(args, {}, {
    nodeUrl: [util.isUrl]
  })

  this.version = config.version
  this.node = new Node({url: (args.nodeUrl || config.defaultNodeUrl)})
  this.schnorr = schnorr
  this.util = util
	this.data = {}
}


// library methods
Zilliqa.prototype.getLibraryVersion = function () {
  return this.version
}

Zilliqa.prototype.isConnected = function () {
  return (this.node && this.node.isConnected())
}

Zilliqa.prototype.getNode = function () {
  return this.node
}

Zilliqa.prototype.setNode = function (args) {
  validateArgs(args, {
    nodeUrl: [util.isUrl]
  })

  this.node = new Node({url: (args.nodeUrl || config.defaultNodeUrl)})
  return null
}


module.exports = Zilliqa
