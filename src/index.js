module.exports = function solveSudoku(matrix) {
  function putNum(r, c, arr, num) {
    while(num<10) {
      if(rowcolUniq(num, r, c, arr) && matrixUniq(num, r, c, arr)) {return num;}
      num++;
      }
    return 0;  
  }

  function rowcolUniq(num, r, c, arr) {
    for(let i=0; i<9; i++){
      if(arr[r][i]===num) return false;
      if(arr[i][c]===num) return false;
    }
    return true;
  }

  function matrixUniq(num, r, c, arr) {
    let sr=0, sc=0;
    if (r>=3 && r<6) {sr=3;}
    else if (r>=6) {sr=6;}
    if (c>=3 && c<6) {sc=3;}
    else if(c>=6) {sc=6;}

    for(let i=sr; i<sr+3; i++){
      for(let j=sc; j<sc+3; j++){
        if(arr[i][j]===num){return false;}
      }
    }
    return true;
  }
  
  let counter=0;
  const arrRow = [], arrCol = [], numStack = [];

  function repeat(arr, number) {
    for(let r=0; r<9; r++){
      for(let c=0; c<9;c++){
        if(arr[r][c]==0){
          const result = putNum(r, c, arr, number);
          if(result>0){
            arrRow.push(r);
            arrCol.push(c);
            arr[r][c]=result;
            numStack.push(arr[r][c]);
            number=1;
          } else {
            const i = arrRow[arrRow.length-1], j = arrCol[arrCol.length-1];
            arrRow.pop();
            arrCol.pop();
            arr[i][j]=0;
            const z= numStack.pop()+1;
            if(counter>5000){break;}
            counter++;
            repeat(arr, z);                            
          }
        }       
      }
    }    
  }

  repeat(matrix, 1);

  return matrix;}