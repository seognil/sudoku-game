import solveCore from './solve-core';

export const genSolved = () => solveCore();

export const solveSingle = board => solveCore(board, false);

export const solveMulti = board => solveCore(board, true);

export const hasMultiAnswers = board => solveCore(board, true, true).length > 1;
