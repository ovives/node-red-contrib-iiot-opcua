/*
 The BSD 3-Clause License

 Copyright 2017,2018 - Klaus Landsdorf (http://bianco-royal.de/)
 All rights reserved.
 node-red-contrib-iiot-opcua
 */
'use strict'

jest.setTimeout(5000)

let coreConnector = require('../../src/core/opcua-iiot-core-connector')

describe('OPC UA Core Connector', function () {
  describe('core functions', function () {
    it('should have IDLE state', function (done) {
      let fsm = coreConnector.createStatelyMachine()
      expect(fsm.getMachineState()).toBe('IDLE')
      done()
    })

    it('should change to INIT state', function (done) {
      let fsm = coreConnector.createStatelyMachine()
      expect(fsm.init().getMachineState()).toBe('INIT')
      done()
    })

    it('should change to OPEN state', function (done) {
      let fsm = coreConnector.createStatelyMachine()
      expect(fsm.init().open().getMachineState()).toBe('OPEN')
      done()
    })

    it('should change to CLOSED state', function (done) {
      let fsm = coreConnector.createStatelyMachine()
      expect(fsm.init().open().close().getMachineState()).toBe('CLOSED')
      done()
    })

    it('should change to END state from OPEN', function (done) {
      let fsm = coreConnector.createStatelyMachine()
      expect(fsm.init().open().end().getMachineState()).toBe('END')
      done()
    })

    it('should change to END state from CLOSE', function (done) {
      let fsm = coreConnector.createStatelyMachine()
      expect(fsm.init().open().close().end().getMachineState()).toBe('END')
      done()
    })

    it('should change to END state from LOCKED', function (done) {
      let fsm = coreConnector.createStatelyMachine()
      expect(fsm.init().open().lock().end().getMachineState()).toBe('END')
      done()
    })

    it('should change to LOCKED state from INIT', function (done) {
      let fsm = coreConnector.createStatelyMachine()
      expect(fsm.init().lock().getMachineState()).toBe('LOCKED')
      done()
    })

    it('should change to LOCKED state from OPEN', function (done) {
      let fsm = coreConnector.createStatelyMachine()
      expect(fsm.init().open().lock().getMachineState()).toBe('LOCKED')
      done()
    })

    it('should change to LOCKED state from CLOSE', function (done) {
      let fsm = coreConnector.createStatelyMachine()
      expect(fsm.init().open().close().lock().getMachineState()).toBe('LOCKED')
      done()
    })

    it('should change to UNLOCKED state from CLOSE', function (done) {
      let fsm = coreConnector.createStatelyMachine()
      expect(fsm.init().open().close().lock().unlock().getMachineState()).toBe('UNLOCKED')
      done()
    })

    it('should change to INIT state from UNLOCKED', function (done) {
      let fsm = coreConnector.createStatelyMachine()
      expect(fsm.init().open().close().lock().unlock().idle().init().getMachineState()).toBe('INIT')
      done()
    })

    it('should change to IDLE state from UNLOCKED', function (done) {
      let fsm = coreConnector.createStatelyMachine()
      expect(fsm.init().open().close().lock().unlock().idle().getMachineState()).toBe('IDLE')
      done()
    })

    it('should change to OPEN state from UNLOCKED', function (done) {
      let fsm = coreConnector.createStatelyMachine()
      expect(fsm.init().open().close().lock().unlock().open().getMachineState()).toBe('OPEN')
      done()
    })
  })
})
