var assert = require('assert')
var expect = require('chai').expect;
var should = require('chai').should()
win = require('../client/helpers/win')
fixtures = require('./fixtures')


describe('Checking For Wins', () => {
  it('Should return the winning player number for a winning row', () => {
    rowWinner = win.hasAnyRowWins(fixtures.rowWin)
    expect(rowWinner).to.equal(1)
  })

  it('Should return the winning player number for a winning column', () => {
    colWinner = win.hasAnyColWins(fixtures.columnWin)
    expect(colWinner).to.equal(2)
  })

  it('Should report a diagonal (left or right) as a win', () => {
    fixtures.diagWinsArray.forEach(board => {
      diagWinner = win.hasAnyDiagWins(board)
      expect(diagWinner).to.equal(2)
    })
  })

  it('Should detect a tie', () => {
    tie = win.detectWins(fixtures.tie)
    expect(tie).to.equal(3)
  })
})