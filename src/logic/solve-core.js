import { genEmptyBoard, shuffleArr, devLogBoard, cloneBoard } from './helper';
import { chars, indexs, emptyChar } from './chars';

// * ----------------------------------------------------------------

// * search able pos of a specific char in a row
const ablePos = (board, row, char) => {
  let remain = new Set(indexs);
  for (let row_i = 0; row_i < 9; row_i++) {
    const col_i = board[row_i].indexOf(char);

    if (col_i === -1) continue;

    // * delete same char by column
    remain.delete(col_i);

    // * delete by block
    if (~~(row_i / 3) == ~~(row / 3)) {
      const bi = ~~(col_i / 3) * 3;
      remain.delete(bi + 0);
      remain.delete(bi + 1);
      remain.delete(bi + 2);
    }
  }

  // * delete already has something in row
  board[row].forEach((e, i) => {
    e !== emptyChar && remain.delete(i);
  });

  // * arraization, suffle avoid worst case
  remain = shuffleArr(Array.from(remain));

  return remain;
};

// * ----------------------------------------------------------------

const devLog = (board, res) => {
  // devLogBoard(board, 1);
  // console.warn('lcdebug 07-08 383121', '', res.length);
};

export default (board = genEmptyBoard(), findAll = false, multiEager = false) => {
  board = cloneBoard(board);

  // * results of findAll
  const results = [];

  devLog(board, results);

  // * algo core
  const fillBoard = (board, i) => {
    // * board completed
    if (i >= 81) {
      if (findAll) results.push(cloneBoard(board));

      if (multiEager && results.length > 1) return true;

      // * if findAll, cheat false, otherwise true means solved
      return !findAll;
    }

    const char = chars[~~(i / 9)];
    const row = i % 9;

    if (board[row].includes(char)) {
      // * filled by init

      if (fillBoard(board, i + 1)) return true;
    } else {
      // * dfs search, try complete same char in every row, then next

      const pos = ablePos(board, row, char);
      for (let g = 0; g < pos.length; g++) {
        const k = pos[g];
        board[row][k] = char;

        devLog(board, results);

        // * recurse till fill the board
        if (fillBoard(board, i + 1)) return true;

        // * fallback, clear, prepare to try another pos
        board[row][k] = emptyChar;
      }
    }
    // * all pos failed, return to previous search
    return false;
  };

  // * run
  fillBoard(board, 0);

  return findAll ? results : board;
};
