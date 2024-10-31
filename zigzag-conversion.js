/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
  // const nonZigzagColums = Math.floor(s.length / numRows);
  // const zigzagColums = s.length - (nonZigzagColums * numRows);

  const table = Array.from(
    { length: numRows },
    // () => Array.from({ length: nonZigzagColums + zigzagColums }, () => null )
    () => []
  );

  const zigzagLength = numRows - 2;
  const zigzagStartRow = numRows - 2; //if numRows === 1 || ...2 ?
  const zigzagEndRow = 1;

  let strStart = 0;
  let strEnd = s.length - 1;

  let isZigzag = false;
  let row = 0;
  let col = 0;

  while (strStart <= strEnd) {
      if (isZigzag) {
          table[row][col] = s.charAt(strStart);
          if (row === zigzagEndRow) {
              row = 0;
              isZigzag = false;
          } else {
              row--;
          }
          col++;
      } else {
          table[row][col] = s.charAt(strStart);
          if (row === numRows - 1) {
              row = zigzagStartRow;
              col++;
              isZigzag = true;
          } else {
              row++;
          }
      }

      strStart++;
  }

  // console.log(table);

  let result = '';

  for (let r = 0; r < table.length; r++) {
    for (let c = 0; c < table[r].length; c++) {
      if (table[r][c] !== undefined) {
        result += table[r][c];
      }
    }
  }

  return result
};

convert('PAYPALISHIRING', 4);




  // (3) PAY PAL ISH IRI NG
  // p   p   i   i   n
  // a   a   s   r   g
  // y   l   h   i
  // (4) PAYP ALIS HIRI NG
  // p   a   h   n
  // a   l   i   g
  // y   i   r
  // p   s   i

  // (5) PAYPA LISHI RING
  // p
  // a
  // y
  // p
  // a