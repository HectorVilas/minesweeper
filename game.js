let game = {
  board: {
    width: 10,
    height: 5,
    array: [],
    drawBoard(){
      for(let y = 0; y < this.height; y++){
        this.array.push([]);
        for(let x = 0; x < this.width; x++){
          this.array[y].push(0);
        };
      };
    },
  },
  mines: {
    quantity: 10,
    rand(num){
      return parseInt(Math.floor(Math.random()*num));
    },
    placeMines(){
      for(let i = 0; i < this.quantity; i++){
        let x = this.rand(game.board.width);
        let y = this.rand(game.board.height);
        game.board.array[y][x] = "m";
      };
      console.table(game.board.array);
    },
  },
};

game.board.drawBoard();
game.mines.placeMines();