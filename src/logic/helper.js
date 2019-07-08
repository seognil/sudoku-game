import { emptyChar } from './chars';

// * ----------------------------------------------------------------

export const sleep = n => {
  const s = Date.now();
  while (Date.now() < s + n);
};

// * --------------------------------

let ticker = 0;
export const tick = () => console.warn(ticker++);

// * --------------------------------

export const shuffleArr = (arr = [], n = arr.length) => {
  arr = [...arr];

  arr.forEach((e, i) => {
    const k = ~~(Math.random() * (n - i)) + i;
    if (k !== i) {
      const temp = e;
      arr[i] = arr[k];
      arr[k] = temp;
    }
  });

  return arr;
};

// * ----------------------------------------------------------------

export const genEmptyBoard = () => Array.from({ length: 9 }, () => new Array(9).fill(emptyChar));

export const logBoard = bo => console.log(bo.map(e => e.join(' ')));

export const cloneBoard = bo => bo.map(e => [...e]);

export const devLogBoard = (board, duration = 10) => {
  logBoard(board);
  tick();
  sleep(duration);
};
