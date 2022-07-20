const util = require('util');
const exec = util.promisify(require('child_process').exec);
const version = require('../package.json').version + "\n";

const app = "node bin/cli.js ";

describe('CLI ARGS Test Suite', function (){
  it ('should output version, whith "-v"', function (){
    return exec(app + "-v")
      .then(function(res) {
        expect(res.stdout).toEqual(version);
      }).catch(function(err){
        throw err;
      });
  })

  it ('should output version, whith "--version"', function (){
    return exec(app + "--version")
      .then(function(res) {
        expect(res.stdout).toEqual(version);
      }).catch(function(err){
        throw err;
      });
  })

  it ('should ignore all other args, when "-v" before', function (){
    return exec(app + "-v build")
      .then(function(res) {
        expect(res.stdout).toEqual(version);
      }).catch(function(err){
        throw err;
      });
  })

  it ('should ignore all other args, when "-v" after', function (){
    return exec(app + "build -v")
      .then(function(res) {
        expect(res.stdout).toEqual(version);
      }).catch(function(err){
        throw err;
      });
  })
  // --help
  it ('should output usage, whith "-h"', function() {
    return exec(app + "-h")
      .then(function(res) {
        expect(res.stdout).toMatch(/^Usage/);
      }).catch(function(err){
        throw err;
      });
  })

  it ('should output usage, whith "--help"', function() {
    return exec(app + "--help")
      .then(function(res) {
        expect(res.stdout).toMatch(/^Usage/);
      }).catch(function(err){
        throw err;
      });
  })

  it ('should consider "i" and "e" mutual exclusives', function() {
    return exec(app + "get -i db1 -e db2")
      .then(function(res) {

      }).catch(function(err){
        expect(err.stderr).toMatch("Arguments i and e are mutually exclusive");
      });
  })
})