let board = {
    width: 10,
    height: 5,
    mines: 10,
    array: [],
  drawBoard(){
    for(let y = 0; y < this.height; y++){
      this.array.push([]);
      for(let x = 0; x < this.width; x++){
        this.array[y].push(0);
      };
    };
  },
  randIndex(num){
    return parseInt(Math.floor(Math.random()*num));
  },
  placeMines(){
    let x, y;
    for(let i = 0; i < this.mines; i++){
      do {
        x = this.randIndex(this.width);
        y = this.randIndex(this.height);
      } while(this.array[y][x] == "m");
      this.array[y][x] = "m";
      [this.validPosition([x,y-1]), this.validPosition([x+1,y-1]),
        this.validPosition([x+1,y]), this.validPosition([x+1,y+1]),
        this.validPosition([x,y+1]), this.validPosition([x-1,y+1]),
        this.validPosition([x-1,y]), this.validPosition([x-1,y-1])]
        .forEach( t => {
        if(t !== undefined){
          this.array[t[1]][t[0]] += 1;
        };
      });
    };
  },
  validPosition(arr){
    if(arr[0] >= 0 && arr[0] < this.width
      && arr[1] >= 0 && arr[1] < this.height
      && this.array[arr[1]][arr[0]] != "m"
      ){
      return arr;
    };
  },
};

board.drawBoard();
board.placeMines();
console.table(board.array); //for debugging