let gameOver = false;

let board = {
  dom: document.querySelector(".board"),
  width: 20,
  height: 10,
  mines: 30,
  array: [], //each array inside: [height,width]
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
          if(!gameOver && !this.tileDom(x,y).className.includes("revealed")){
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
    this.imageDom(thisTile,this.array[y][x]);
  },
  revealConnected(x,y){
    let surrounding = [];
    if(this.array[y][x] == 0){
      surrounding = this.surroundingTiles(x,y)
      .filter(t => this.array[t[1]][t[0]] == 0
        && !this.tileDom(t[0],t[1]).className.includes("revealed"))

      this.surroundingTiles(x,y).forEach(t => {
        let thisTile = this.tileDom(t[0],t[1]);
        thisTile.classList.add("revealed");
        this.imageDom(thisTile, this.array[t[1]][t[0]]);
      });
    };
    setTimeout(() => {
      surrounding.forEach(t => this.revealConnected(t[0],t[1]))
    }, 20);
  },
  tileDom(x,y){
    return document.querySelector(`[x="${x}"][y="${y}"]`);
  },
  imageDom(tile, value){
    tile.innerHTML = "";
    let image = document.createElement("img");
    image.classList.add("tile-image");
    if(typeof(value) == "number" && value !== 0){
      let images = ["./media/images/n1.png","./media/images/n2.png",
        "./media/images/n3.png","./media/images/n4.png",
        "./media/images/n5.png","./media/images/n6.png",
        "./media/images/n7.png","./media/images/n8.png"];
      image.setAttribute("src", images[value-1]);
      tile.appendChild(image);
      return image;
    } else if(value == "m"){
      image.setAttribute("src", "./media/images/mine.png");
      tile.classList.add("mine");
      tile.appendChild(image);
    };
  },
  revealMines(){
    let positions = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if(this.array[y][x] == "m"){
          positions.push([x,y]);
        }
      }
    }
    positions.forEach(pos => {
      this.revealTile(pos[0],pos[1]);
    });
  },
  tileExploding(x,y){
    let boom = this.tileDom(x,y);
    boom.classList.add("boom1");
    setTimeout(() => { boom.classList.add("boom2");
      setTimeout(() => { boom.classList.add("boom3");
        setTimeout(() => { boom.classList.add("boom4");
          setTimeout(() => { boom.classList.add("boom5");
            setTimeout(() => { boom.classList.remove("boom1",
            "boom2","boom3","boom4","boom5")
            }, 1500);
          }, 800);
        }, 600);
      }, 400);
    }, 300);
  },
};

board.newGame();
// console.table(board.array); //for debugging