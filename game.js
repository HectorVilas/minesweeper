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

      if(surrounding.length > 0){
        audio.playSound("sonar");
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
        interface.showPrompt("lose");
      }, 4000);
    } else if(this.remaining <= 0 && gameOver == false){
      gameOver = true;
      this.revealMines();
      interface.showPrompt("win");
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
    audio.playSound("explosion");
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

let interface = {
  prompt: {
    fullScreenContainer: document.querySelector(".full-screen-container"),
    title: document.querySelector(".prompt-title-text"),
    options: {
      dom: document.querySelector(".options"),
      width: document.querySelector("#board-width"),
      widthDisplay: document.querySelector(".board-width"),
      height: document.querySelector("#board-height"),
      heightDisplay: document.querySelector(".board-height"),
      mines: document.querySelector("#mines-count"),
      minesDisplay: document.querySelector(".mines-count"),
      sounds: document.querySelector("#sounds"),
    },
  },
  dropDown: {
    menu: document.querySelector(".dropdown-menu"),
    options: document.querySelector(".dropdown-options"),
    howToPlay: document.querySelector(".dropdown-how-to-play"),
    about: document.querySelector(".dropdown-about"),
  },
  buttons: {
    menu: document.querySelector(".button-menu"),
    close: document.querySelectorAll(".prompt-button-close"),
    ok: document.querySelectorAll(".prompt-button-ok"),
  },
  
  addListeners(){
    this.buttons.close.forEach(btn => {//cancel-close buttons
      btn.addEventListener("click", () => {
        this.prompt.fullScreenContainer.classList.toggle("hidden");
      });
    });
    this.buttons.menu.addEventListener("click", () => { //burger button
      this.dropDown.menu.classList.toggle("hidden-dropdown");
    });
    this.dropDown.options.addEventListener("click", () => {
      this.dropDown.menu.classList.toggle("hidden-dropdown");
      this.showPrompt("options");
    });
    this.dropDown.howToPlay.addEventListener("click", () => {
      this.dropDown.menu.classList.toggle("hidden-dropdown");
      this.showPrompt("how-to-play");
    });
    this.dropDown.about.addEventListener("click", () => {
      this.dropDown.menu.classList.toggle("hidden-dropdown");
      this.showPrompt("about");
    });
    //options related
    this.prompt.options.width.addEventListener("input", () => {
      board.width =
      this.prompt.options.widthDisplay.innerText =
      this.prompt.options.width.value;
      this.limitMaxMines();
    });
    this.prompt.options.height.addEventListener("input", () => {
      board.height =
      this.prompt.options.heightDisplay.innerText =
      this.prompt.options.height.value;
      this.limitMaxMines();
    });
    this.prompt.options.mines.addEventListener("input", () => {
      board.mines =
      this.prompt.options.minesDisplay.innerText =
      this.prompt.options.mines.value;
    });
  },
  
  limitMaxMines(){
    this.prompt.options.mines.max = board.width*board.height;
    if(board.width*board.height < board.mines){
      board.mines =
      this.prompt.options.minesDisplay.innerText =
      board.width*board.height;
    };
  },
  
  showPrompt(arr){
    this.prompt.fullScreenContainer.classList.remove("hidden");
    let options = document.querySelector(".options");
    let howToPlay = document.querySelector(".how-to-play");
    let about = document.querySelector(".about");
    let win = document.querySelector(".win-message");
    let lose = document.querySelector(".lose-message");

    [options,howToPlay,about,win,lose].forEach(m => m.classList.add("hidden"));

    if(arr == "options"){
      options.classList.remove("hidden");
      this.prompt.title.innerText = "Options";
    }else if(arr == "how-to-play"){
      howToPlay.classList.remove("hidden");
      this.prompt.title.innerText = "How to play";
    }else if(arr == "about"){
      about.classList.remove("hidden");
      this.prompt.title.innerText = "About";
    }else if(arr == "win"){
      win.classList.remove("hidden");
      this.prompt.title.innerText = "You win!";
    }else if(arr == "lose"){
      lose.classList.remove("hidden");
      this.prompt.title.innerText = "You lose";
    }else{
      alert(arr+" is not a valid parameter");
    }
  },
};

let audio = {
  sonar: document.querySelector("#sonar"),
  explosion: document.querySelector("#explosion"),
  playSound(arr){
    if(arr == "sonar"){
      this.sonar.play()
    } else if(arr == "explosion") {
      this.explosion.play()
    }
  },
};

board.newGame();
interface.addListeners();
//default settings
interface.prompt.options.widthDisplay.innerText =
interface.prompt.options.width.value =
board.width;
interface.prompt.options.heightDisplay.innerText =
interface.prompt.options.height.value =
board.height;
interface.prompt.options.minesDisplay.innerText =
interface.prompt.options.height.value =
board.mines;
// console.table(board.array); //for debugging
// board.revealMines()  //for debugging