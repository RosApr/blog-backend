'use strict';

const baseController = require('../core/base_controller');

class HomeController extends baseController {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
