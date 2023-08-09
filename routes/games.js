const express = require('express');
const router = express.Router();

const { getAllGames, createGame, updateGame, deleteGame, getGame } = require('../controller/game');

router.route('/').get(getAllGames).post(createGame);
router.route('/:id').put(updateGame).delete(deleteGame).get(getGame);

module.exports = router;