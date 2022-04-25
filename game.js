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
    console.table(this.array); //for debugging
  },
  rand(num){
    return parseInt(Math.floor(Math.random()*num));
  },
  placeMines(){
    for(let i = 0; i < this.mines; i++){
      let x, y;
      do {
        x = this.rand(this.width);
        y = this.rand(this.height);
      } while(this.array[y][x] == "m");
      this.array[y][x] = "m";
    };
    console.table(this.array); //for debugging
  },
  validPosition(x,y){
    if(x >= 0 && x < this.width){
      console.log([x,y]);
      console.log(width);
      return [x,y];
    };
  },
};

board.drawBoard();
board.placeMines();