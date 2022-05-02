let gameOver = false;

let board = {
  dom: document.querySelector(".board"),
  width: 30,
  height: 15,
  mines: 30,
  remaining: undefined,
  array: [], //each array inside: [Y position, X position]
  newGame(){
    this.remaining = this.width*this.height-this.mines;
    this.arrayBoard();
    this.placeMines();
    this.drawBoard();
  },
  clickAction(x,y){
    this.revealTile(x,y);
    this.revealConnected(x,y);
    this.winLoseCondition(x,y);
  },
  arrayBoard(){
    this.array = []; //cleaning before starting another game
    for(let y = 0; y < this.height; y++){
      this.array.push([]);
      for(let x = 0; x < this.width; x++){
        this.array[y].push(0);
      };
    };
  },
  drawBoard(){
    this.dom.innerHTML = "";
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
  emptyValid(arr){
    if(arr[0] >= 0 && arr[0] < this.width
      && arr[1] >= 0 && arr[1] < this.height
      && this.array[arr[1]][arr[0]] != "m"
      ){
      return arr;
    };
  },
  surroundingTiles(x,y){
    return [this.emptyValid([x,y-1]), this.emptyValid([x+1,y-1]),
    this.emptyValid([x+1,y]), this.emptyValid([x+1,y+1]),
    this.emptyValid([x,y+1]), this.emptyValid([x-1,y+1]),
    this.emptyValid([x-1,y]), this.emptyValid([x-1,y-1])]
    .filter(t => t !== undefined);
  },
  revealTile(x,y){
    let thisTile = this.tileDom(x,y);
    thisArr = this.array[y][x];
    thisTile.classList.add("revealed");
    this.imageDom(thisTile,thisArr);
    if(thisArr != "m"){
      this.remaining--;
    }
  },
  revealConnected(x,y){
    let surrounding = [];
    if(this.array[y][x] == 0){
      surrounding = this.surroundingTiles(x,y)
      .filter(t => this.array[t[1]][t[0]] == 0
        && !this.tileDom(t[0],t[1]).className.includes("revealed"))
        
        this.surroundingTiles(x,y).forEach(t => {
        let thisTile = this.tileDom(t[0],t[1]);
        if(!thisTile.className.includes("revealed")){
          thisTile.classList.add("revealed");
          this.imageDom(thisTile, this.array[t[1]][t[0]]);
          this.remaining--;
        };
      });
    };
    setTimeout(() => {
      surrounding.forEach(t => this.revealConnected(t[0],t[1]))
    }, 20);
    if(surrounding.length == 0){
      this.winLoseCondition(x,y);
    };
  },
  tileDom(x,y){
    return document.querySelector(`[x="${x}"][y="${y}"]`);
  },
  imageDom(tile, value){
    tile.innerHTML = "";
    let image = document.createElement("img");
    image.classList.add("tile-image");
    if(typeof(value) == "number" && value !== 0){
      image.setAttribute("src", `./media/images/n${value}.png`);
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
  winLoseCondition(x,y){
    if(this.array[y][x] == "m"){
      gameOver = true;
      animations.shockwave(x,y);
      setTimeout(() => {
        this.revealMines();
      }, 4000);
    } else if(this.remaining <= 0 && gameOver == false){
      gameOver = true;
      alert("player wins\nthis is a temporal message");
      this.revealMines();
    };
  },
};

let animations = {
  tileExploding(x,y){
    let boom = board.tileDom(x,y);

    boom.classList.add("boom1");
    boom.addEventListener("transitionend", (e) => {
      if(e.propertyName == "scale") {
        boom.classList.remove("boom1");
        boom.classList.add("boom2");
        boom.addEventListener("transitionend", (e) => {
          boom.classList.remove("boom2");
          boom.classList.add("boom3");
          boom.addEventListener("transitionend", (e) => {
            boom.classList.remove("boom3");
            boom.classList.add("boom4");
            boom.addEventListener("transitionend", (e) => {
              boom.classList.remove("boom4");
              boom.classList.add("boom5");
              boom.addEventListener("transitionend", (e) => {
                boom.classList.remove("boom5");
              });
            });
          });
        });
      };
    });
  },
  valids(...arr){
    let inRange = [];
    arr.forEach(a => {
      if(a[0] >= 0 && a[0] < board.width && a[1] >= 0 && a[1] < board.height){
        inRange.push([a[0],a[1]]);
      };
    });
    return inRange;
  },
  shockwave(x,y){
    document.querySelectorAll(".revealed").forEach(t => {
      if(t.className.includes("revealed")){
        t.classList.remove("revealed");
        t.classList.add("revealed-no-transition");
      };
    });

    this.tileExploding(x,y);
    board.tileDom(x,y).classList.add("z9");
    setTimeout(() => {
      this.valids([x-1,y-1],[x,y-1],[x+1,y-1],[x-1,y],[x+1,y],[x+1,y+1],[x,y+1],[x-1,y+1]).forEach(t =>{
        this.tileExploding(t[0],t[1]);
        board.tileDom(t[0],t[1]).classList.add("z8");
      }, 100);
    });
    setTimeout(() => {
      this.valids([x-1,y-2],[x,y-2],[x+1,y-2],[x-2,y-1],[x+2,y-1],[x-2,y],[x+2,y],[x-2,y+1],[x+2,y+1],[x-1,y+2],[x,y+2],[x+1,y+2]).forEach(t =>{
        this.tileExploding(t[0],t[1]);
        board.tileDom(t[0],t[1]).classList.add("z7");
      });
    }, 200);
    setTimeout(() => {
      this.valids([x-1,y-3],[x,y-3],[x+1,y-3],[x-2,y-2],[x+2,y-2],[x-3,y-1],[x+3,y-1],[x-3,y],[x+3,y],[x-3,y+1],[x+3,y+1],[x-2,y+2],[x+2,y+2],[x-1,y+3],[x,y+3],[x+1,y+3]).forEach(t =>{
        this.tileExploding(t[0],t[1]);
        board.tileDom(t[0],t[1]).classList.add("z6");
      });
    }, 300);
    setTimeout(() => {
      this.valids([x-2,y-4],[x-1,y-4],[x,y-4],[x+1,y-4],[x+2,y-4],[x-3,y-3],[x-2,y-3],[x+2,y-3],[x+3,y-3],[x-4,y-2],[x-3,y-2],[x+3,y-2],[x+4,y-2],[x-4,y-1],[x+4,y-1],[x-4,y],[x+4,y],[x-4,y+1],[x+4,y+1],[x-4,y+2],[x-3,y+2],[x+3,y+2],[x+4,y+2],[x-3,y+3],[x-2,y+3],[x+2,y+3],[x+3,y+3],[x-2,y+4],[x-1,y+4],[x,y+4],[x+1,y+4],[x+2,y+4]).forEach(t =>{
        this.tileExploding(t[0],t[1]);
        board.tileDom(t[0],t[1]).classList.add("z5");
      });
    }, 400);
  },
};

board.newGame();
// console.table(board.array); //for debugging
// board.revealMines()  //for debugging