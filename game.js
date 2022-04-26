let gameOver = false;

let board = {
  dom: document.querySelector(".board"),
  width: 15,
  height: 10,
  mines: 10,
  array: [],
  newGame(){
    this.arrayBoard();
    this.placeMines();
    this.drawBoard();
  },
  clickAction(x,y){
    this.revealTile(x,y);
    this.revealConnected(x,y);
  },
  arrayBoard(){
    for(let y = 0; y < this.height; y++){
      this.array.push([]);
      for(let x = 0; x < this.width; x++){
        this.array[y].push(0);
      };
    };
  },
  drawBoard(){
    for (let y = 0; y < this.height; y++) {
      let row = document.createElement("div");
      row.className = "row";
      for (let x = 0; x < this.width; x++) {
        let tile = document.createElement("div");
        tile.className = "tile";
        tile.setAttribute("x", x);
        tile.setAttribute("y", y);

        tile.addEventListener("click", () => {
          if(!gameOver){
            this.clickAction(x,y);
          };
        });

        row.append(tile);
      };
      this.dom.appendChild(row);
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
      this.surroundingTiles(x,y).forEach( t => this.array[t[1]][t[0]] += 1);
    };
  },
  validPosition(arr){
    if(arr[0] >= 0 && arr[0] < this.width
      && arr[1] >= 0 && arr[1] < this.height
      && this.array[arr[1]][arr[0]] != "m"){
      return arr;
    };
  },
  surroundingTiles(x,y){
    return [this.validPosition([x,y-1]), this.validPosition([x+1,y-1]),
    this.validPosition([x+1,y]), this.validPosition([x+1,y+1]),
    this.validPosition([x,y+1]), this.validPosition([x-1,y+1]),
    this.validPosition([x-1,y]), this.validPosition([x-1,y-1])]
    .filter(t => t !== undefined);
  },
  revealTile(x,y){
    let thisTile = this.tileDom(x,y);
    thisTile.classList.add("revealed");
    thisTile.innerText = this.array[y][x];
  },
  revealConnected(x,y){
    if(this.array[y][x] == 0){
      this.surroundingTiles(x,y).forEach(t => {
        let thisTile = this.tileDom(t[0],t[1]);
        thisTile.classList.add("revealed");
        thisTile.innerText = this.array[t[1]][t[0]];
      });
      // this.surroundingTiles(x,y)
      // .filter(t => this.array[t[1]][t[0]] == 0
        // && !this.tileDom(t[0],t[1]).className.includes("revealed"))
      // .forEach(t => console.log(this.tileDom(t[0],t[1])));
    };
  },
  tileDom(x,y){
    return document.querySelector(`[x="${x}"][y="${y}"]`);
  }
};

board.newGame();
// console.table(board.array); //for debugging