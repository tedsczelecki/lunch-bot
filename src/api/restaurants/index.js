const Router = require('express-promise-router');

const Controller = require('./controller');

const router = Router();
router
  .get('/', Controller.findAll)
  .get('/byName/:name', Controller.byName)
  // .post('/', Controller.addMessage);
  // .get('/:id', Controller.show)
  // .put('/:id', Controller.update)
  // .delete('/:id', Controller.destroy);

module.exports = router;
