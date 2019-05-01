import { post } from 'axios'

const moveEndpoint = '/.netlify/functions/move';
const aiEndpoint = '/.netlify/functions/next-move';

export const addMove = async ({ game, board, move }) => post(moveEndpoint, { game, board, move });

export const getAIMove = async board => post(aiEndpoint, { board });

export default {
    addMove,
    getAIMove,
}