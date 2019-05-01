import trainedNet from './neuralNet/trained-net';

const handler = (event, context, callback) => {
    const { body, queryStringParameters } = event;
    let parsedBody = {};

    try {
        parsedBody = JSON.parse(body) || queryStringParameters;
    } catch (e) {
        parsedBody = {};
    }

    console.log('Body: ', body, ' QueryStringParameters: ', queryStringParameters);

    const { board } = parsedBody;

    if (!board) {
        const response = {
            statusCode: 200,
            body: `There is no spoon`
        };

        callback(null, response);
        return;
    }

    const weights = trainedNet(board);
    const combinedBoard = board.map((el, index) => ({
        el,
        index,
        isEmpty: el === 0,
        weight: weights[index]
    }));

    const emptySlots = combinedBoard.filter(({ isEmpty }) => isEmpty).sort(el => el.weight);

    console.log(combinedBoard, emptySlots);
    const dominantChoise = emptySlots && emptySlots.length && emptySlots[0];
    const firstZeroEl = board && board.indexOf(0);
    const nextMove = dominantChoise.index.toString();
    console.log(`Current state is: ${board}.\nFirst zero element is on position: ${firstZeroEl}.\nNext move is: ${nextMove}.`);

    const response = {
        statusCode: 200,
        body: nextMove
    };

    callback(null, response);
};

exports.handler = handler;