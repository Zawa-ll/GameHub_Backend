const Game = require('../models/Game');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllGames = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        console.log('createdBy:', token);

        // Perform further processing
        const games = await Game.find({ createdBy: token });
        console.log(games);

        res.status(200).json({ games });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};





// const getAllGames = async (req, res) => {
// const { createdBy } = req.query;
// const games = await Game.find({ createdBy });
// res.status(StatusCodes.OK).json({ games });

// console.log('createdBy:', createdBy);
// const { body: { createdBy } } = req.body;
// const games = await Game.find({ createdBy });
// res.status(StatusCodes.OK).json({ games });
// }

const getGame = async (req, res) => {
    const {
        body: { createdBy },
        // user: { userId },
        params: { id: gameId }
    } = req;
    const game = await Game.find({ id: gameId, createdBy: createdBy });
    res.send(game);
}

const updateGame = async (req, res) => {
    const {
        body: { liked },
        // user: { userId },
        params: { id: gameId }
    } = req;

    const game = await Game.findOneAndUpdate(
        {
            _id: gameId,
            // id: gameId,
            createdBy: userId,
        },
        req.body,
        {
            new: true,
            // runValidators: true,
        }
    );
    if (!game) {
        throw new NotFoundError(`No game with id ${gameId}`)
    }
    res.status(StatusCodes.OK).json({ game });
}

const createGame = async (req, res) => {
    // req.body.createdBy = req.user.userId;
    const game = await Game.create(req.body);
    res.status(StatusCodes.CREATED).json(game);
    console.log('Create game called');
}


const deleteGame = async (req, res) => {
    const {
        body: { createdBy: token },
        // user: { userId },
        params: { id: gameId }
    } = req;

    console.log('id from delete request', gameId);
    console.log('createdBy in deleteGame requests', token);

    const game = await Game.findOneAndRemove({
        id: gameId,
        createdBy: token
    })

    console.log(game);

    // if (!game) {
    //     throw new NotFoundError(`No game with id ${gameId}`);
    // }

    // res.status(StatusCodes.OK).send();
}

module.exports = {
    getAllGames,
    createGame,
    deleteGame,
    updateGame,
    getGame,
} 