const { writeFileSync } = require('fs');
const brain = require('brain.js/index');
const someData = require('../trainingData/multiLabel');

const fileName = 'trained-net.js';
const config = {
    binaryThresh: 0.5,
    hiddenLayers: [3],      // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid',  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01    // supported for activation type 'leaky-relu'
};
const net = new brain.NeuralNetwork(config);
const betterData = someData.map(dataset => {
    const emptyArray = new Array(9).fill(0);
    emptyArray[dataset[9]] = 1;

    return {
        input: dataset.slice(0, 9),
        output: dataset.slice(9)
    }
});

net.train(betterData);

const fileContents = `export default ${net.toFunction().toString()};`;

writeFileSync(fileName, fileContents);
// eslint-disable-next-line no-console
console.log('youve fucking done it')