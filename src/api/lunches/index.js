const Router = require('express-promise-router');

const Controller = require('./controller');

const router = Router();
router
  .get('/', (req, res) => {
    res.send('Yo');
  })
  .get('/byDate', Controller.getLunchByDate);
  // .post('/', Controller.addMessage);
  // .get('/:id', Controller.show)
  // .put('/:id', Controller.update)
  // .delete('/:id', Controller.destroy);

module.exports = router;
