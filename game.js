let gameOver = false;
let playerWins = undefined;
let firstTile = [];
let leftClickDown = false;
let mouseDrag = false;
let secondsCount = undefined;

let board = {
  dom: document.querySelector(".board"),
  width: 30,
  height: 15,
  mines: 30,
  time: 0,
  remaining: undefined,
  array: [], //each array inside: [Y position, X position]
  //setting the starting config
  newGame(){
    this.face(1);
    interface.boardTop.mines.innerText = this.mines;
    gameOver = false;
    playerWins = undefined;
    firstTile = [];
    this.timer("clear");
    this.remaining = this.width*this.height-this.mines;
    this.arrayBoard();
    this.drawBoard();
    animations.boardScan();
  },
  //mine reveal on click
  leftClickAction(x,y){
    if(firstTile.length == 0){
      this.timer("start");
      firstTile.push([x,y].toString());
      if(this.width*this.height-9 >= this.mines){
        this.surroundingTiles(x,y).forEach(t => firstTile.push(t.toString()))
      }
      this.placeMines();
    };
    this.revealTile(x,y);
    this.revealConnected(x,y);
    this.winLoseCondition(x,y);
  },
  //creates a 2D array containing the board
  arrayBoard(){
    this.array = []; //cleaning before starting another game
    for(let y = 0; y < this.height; y++){
      this.array.push([]);
      for(let x = 0; x < this.width; x++){
        this.array[y].push(0);
      };
    };
  },
  //draws the array board on screen with divs, apply listeners
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

        tile.addEventListener("mouseup", (click) => {
          if(!gameOver && !this.tileDom(x,y).className.includes("revealed")){
            if(click.button == 0){ //left click
              this.leftClickAction(x,y);
            };
          };
          board.tileDom(x,y).classList.remove("active");
          board.tileDom(x,y).classList.remove("hover");
        });
        tile.addEventListener("mousedown", (e) => {
          if(e.button == 0){
            if(!gameOver){
              this.face(2);
            };
            board.tileDom(x,y).classList.add("active");
            e.preventDefault();
          }else if (e.button == 2 && !gameOver){
            this.toggleFlag(x,y);
          };
        });
        tile.addEventListener("mouseenter", (e) => {
          e.stopPropagation();
          if(leftClickDown && e.button == 0){
            board.tileDom(x,y).classList.add("active");
          } else {
            board.tileDom(x,y).classList.add("hover");
          };
        });
        tile.addEventListener("mouseleave", () => {
          board.tileDom(x,y).classList.remove("active");
          board.tileDom(x,y).classList.remove("hover");
        });

        row.append(tile);
      };
      this.dom.appendChild(row);
    };
  },
  //random number generator, between 0 and any specified number
  rand(num){
    return parseInt(Math.floor(Math.random()*num));
  },
  //put mines in the array board, avoiding placing more than one in the same tile
  placeMines(){
    let x, y;
    for(let i = 0; i < this.mines; i++){
      do {
        x = this.rand(this.width);
        y = this.rand(this.height);
      } while(this.array[y][x] == "m" || firstTile.includes([x,y].toString()));
      this.array[y][x] = "m";
      this.surroundingTiles(x,y).forEach( t => this.array[t[1]][t[0]] += 1);
    };
  },
  //places or removes a flag
  toggleFlag(x,y){
    if(this.tileDom(x,y).className.includes("flag")){
      this.tileDom(x,y).classList.remove("flag");
      this.tileDom(x,y).innerHTML = "";
      interface.updateMinesCount();
    }else if(!this.tileDom(x,y).className.includes("revealed") && parseInt(interface.boardTop.mines.innerText) > 0){
      this.imageDom(this.tileDom(x,y), "flag");
      interface.updateMinesCount();
    };
  },
  //checks if the tile coordinates are in the board and doesn't contain a mine
  emptyValid(arr){
    if(arr[0] >= 0 && arr[0] < this.width
      && arr[1] >= 0 && arr[1] < this.height
      && this.array[arr[1]][arr[0]] != "m"
      ){
      return arr;
    };
  },
  //returns an array with only valid surrounding tiles
  surroundingTiles(x,y){
    return [this.emptyValid([x,y-1]), this.emptyValid([x+1,y-1]),
    this.emptyValid([x+1,y]), this.emptyValid([x+1,y+1]),
    this.emptyValid([x,y+1]), this.emptyValid([x-1,y+1]),
    this.emptyValid([x-1,y]), this.emptyValid([x-1,y-1])]
    .filter(t => t !== undefined);
  },
  //place tile's image and reduce remaining mines if there's no mine
  revealTile(x,y){
    let thisTile = this.tileDom(x,y);
    let thisArr = this.array[y][x];
    thisTile.classList.add("revealed");
    thisTile.classList.remove("flag");
    this.imageDom(thisTile,thisArr);
    if(thisArr != "m"){
      this.remaining--;
    };
    interface.updateMinesCount();
  },
  //recursive surrounding tiles reveal, also reduces remaining for each
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
            thisTile.classList.remove("flag");

            this.imageDom(thisTile, this.array[t[1]][t[0]]);
            this.remaining--;
          };
        });
      };

      if(surrounding.length > 0){
        audio.playSound("sonar");
      };

      setTimeout(() => {
        if(firstTile.length > 0){
          surrounding.forEach(t => this.revealConnected(t[0],t[1]))
        };
    }, 20);
    if(surrounding.length == 0){
      this.winLoseCondition(x,y);
    };
    interface.updateMinesCount();
  },
  //short way to point to a specific tile in the DOM
  tileDom(x,y){
    return document.querySelector(`[x="${x}"][y="${y}"]`);
  },
  //adds an image to the revealed tile, be number or mine
  imageDom(tile, value){
    tile.innerHTML = "";
    let image = document.createElement("img");
    image.classList.add("tile-image");
    if(typeof(value) == "number" && value !== 0){
      image.setAttribute("src", `./media/images/n${value}.png`);
      tile.appendChild(image);
    } else if(value == "m"){
      if(playerWins){
        image.setAttribute("src", "./media/images/flag.png");
        tile.classList.add("revealed");
      } else {
        image.setAttribute("src", "./media/images/mine.png");
        tile.classList.add("mine");
      };
      tile.appendChild(image);
    }else if(value == "flag"){
      image.setAttribute("src", "./media/images/flag.png");
      tile.classList.add("flag");
      tile.appendChild(image);
    };
  },
  //show all mines on board, either after winning or losing the game
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
  //check if all mines are revealed (win) or if player fell on a mine (lose)
  winLoseCondition(x,y){
    if(this.array[y][x] == "m" && gameOver == false){
      this.timer("stop");
      gameOver = true;
      playerWins = false;
      this.face(3);
      animations.shockwave(x,y);
      animations.screenShake();
      setTimeout(() => {
        if(playerWins !== undefined){
          this.revealMines();
        };
        setTimeout(() => {
          if(playerWins !== undefined){
            interface.showPrompt("lose");
          };
        }, 1000);
      }, 3000);
    } else if(this.remaining <= 0 && gameOver == false){
      this.timer("stop");
      gameOver = true;
      this.face(4);
      playerWins = true;
      setTimeout(() => {
        this.revealMines();
        setTimeout(() => {
          if(playerWins !== undefined){
            interface.showPrompt("win");
          };
        }, 500);
      }, 500);
    };
  },
  //changes face expresion swapping images
    face(num){ //1: smiling; 2: surprised; 3: dead; 4: sunglasses
    let image = document.querySelector(".face");
    image.src = `./media/images/face0${num}.png`;
  },
  //starts, stop and clears timer on board
  timer(arr){
    if(arr == "start"){
      secondsCount = setInterval(() => {
        interface.boardTop.time.innerText++;
      }, 1000);
    } else if(arr == "stop") {
      clearInterval(secondsCount);
    } else if(arr == "clear"){
      clearInterval(secondsCount);
      interface.boardTop.time.innerText = 0;
    };
  },
};

let animations = {
  tileExploding(x, y) {
    setTimeout(() => {
      let boom = board.tileDom(x, y);
      boom.classList.add("boom1");
      boom.addEventListener("transitionend", (e) => {
        if (e.propertyName == "scale") {
          boom.classList.remove("boom1");
          boom.classList.add("boom2");
          boom.addEventListener("transitionend", (e) => {
            if (e.propertyName == "scale") {
              boom.classList.remove("boom2");
              boom.classList.add("boom3");
              boom.addEventListener("transitionend", (e) => {
                if (e.propertyName == "scale") {
                  boom.classList.remove("boom3");
                  boom.classList.add("boom4");
                  boom.addEventListener("transitionend", (e) => {
                    if (e.propertyName == "scale") {
                      boom.classList.remove("boom4");
                      boom.classList.add("boom5");
                      boom.addEventListener("transitionend", (e) => {
                        if (e.propertyName == "scale") {
                          boom.classList.remove("boom5");
                        };
                      });
                    };
                  });
                };
              });
            };
          });
        };
      });
    }, 100);
  },
  //returns an array with only the tiles inside the board
  valids(...arr){
    let inRange = [];
    arr.forEach(a => {
      if(a[0] >= 0 && a[0] < board.width && a[1] >= 0 && a[1] < board.height){
        inRange.push([a[0],a[1]]);
      };
    });
    return inRange;
  },
  //animation for tiles in a 5 tiles range when the player loses
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
      audio.playSound("explosion");
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
  //shakes the board once a mine explodes
  screenShake(){
    let target = document.querySelector(".play-area");
    let slowDown = 10; //number of shakes
    let timeOut = 100;
    let x, y;
    for(let i = slowDown; i > 0; i--){
      setTimeout(() => {
        target.style.transition = `ease-in-out ${timeOut}ms`;
        x = board.rand(slowDown*3);
        y = board.rand(slowDown*3);
        i%2 == 0 ? x *= -1 : y *= -1;
        target.style.marginLeft = `${x}px`;
        target.style.marginTop = `${y}px`;
        slowDown--;
      }, timeOut*(i+1));
    }
  },
  //animate the tiles from left to right
  boardScan(){
    let arr = [];
    for(let i = board.height; i > 0; i--) arr.push(i-board.height);
    console.log(arr);

    for(let i = 0; i < board.width+board.height; i++){
      setTimeout(() => {
        for(let j = 0; j < board.height; j++){
          if(board.tileDom(i+arr[j],j) != undefined){
            board.tileDom(i+arr[j],j).classList.add("game-start");
          };
        };
      }, 20*i+1);
    };
  },
};

let interface = {
  content: document.querySelector(".content"),
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
    ok: document.querySelector(".prompt-button-ok"),
  },
  boardTop: {
    mines: document.querySelector(".mines-remaining"),
    face: document.querySelector(".face"),
    time: document.querySelector(".elapsed-time"),
  },
  //listeners for buttons in the interface  
  addInterfaceListeners(){
    this.boardTop.face.addEventListener("click", () => {
        board.newGame();
    });
    this.buttons.close.forEach(btn => {//cancel-close buttons
      btn.addEventListener("click", () => {
        this.prompt.fullScreenContainer.classList.toggle("hidden");
      });
    });
    this.buttons.ok.addEventListener("click", () => {//action depending prompt
      let text = this.prompt.title.innerText;
      if(text == "Options" || text == "You win" || text == "You lose"){
        board.newGame();
      }
      this.showPrompt("hidden");
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
      parseInt(this.prompt.options.width.value);
      this.limitMaxMines();
    });
    this.prompt.options.height.addEventListener("input", () => {
      board.height =
      this.prompt.options.heightDisplay.innerText =
      parseInt(this.prompt.options.height.value);
      this.limitMaxMines();
    });
    this.prompt.options.mines.addEventListener("input", () => {
      board.mines =
      this.prompt.options.minesDisplay.innerText =
      parseInt(this.prompt.options.mines.value);
    });
  },
  //listeners to detect mouse dragging and disable context menu
  addWindowListeners(){
    window.addEventListener("mousedown", (e) => {
      if(e.button == 0){
        leftClickDown = true;
      };
    });
    window.addEventListener("mouseup", () => {
      if(!gameOver){
        board.face(1);
      };
      leftClickDown = false;
    });
    window.addEventListener("mousemove", () => {
      if(leftClickDown == true){
        mouseDrag = true;
      }else{
        mouseDrag = false;
      }
    });
    window.addEventListener("contextmenu", e => e.preventDefault());
  },
  //default values for settings (width, height, number of mines)
  setDefaultValues(){
    this.prompt.options.widthDisplay.innerText =
    this.prompt.options.width.value =
    board.width;
    this.prompt.options.heightDisplay.innerText =
    this.prompt.options.height.value =
    board.height;
    this.prompt.options.minesDisplay.innerText =
    this.prompt.options.mines.value =
    board.mines;
  },
  //prevent placing more mines than tiles, first revealed tile won't be mined  
  limitMaxMines(){
    let max = board.width*board.height;
    this.prompt.options.mines.max = max-1;
    if(max < board.mines){
      board.mines =
      this.prompt.options.minesDisplay.innerText =
      this.prompt.options.mines.max =
      max-1;
    };
  },
  //hide everything in the prompt, except what is specified
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
      this.prompt.title.innerText = "You win";
    }else if(arr == "lose"){
      lose.classList.remove("hidden");
      this.prompt.title.innerText = "You lose";
    }else if(arr = "none"){
      this.prompt.fullScreenContainer.classList.toggle("hidden");
    }else{
      alert(arr+" is not a valid parameter");
    }
  },
  //updates the remaining mines substracting the total of flags on screen
  updateMinesCount(){
    if(!gameOver){
      let flagsCount = document.querySelectorAll(".flag").length;
      this.boardTop.mines.innerText = board.mines - flagsCount;
    };
  },
};

let audio = {
  checkbox: document.querySelector("#sounds"),
  sonar: document.querySelector("#sonar"),
  explosion: document.querySelector("#explosion"),
  playSound(arr){
    if(this.checkbox.checked){ 
      if(arr == "sonar"){
        this.sonar.play()
      } else if(arr == "explosion") {
        this.explosion.play()
      }
    }
  },
};

//initial configs to start the game on page load
board.newGame();
interface.addInterfaceListeners();
interface.addWindowListeners();
interface.setDefaultValues();

// console.table(board.array); //for debugging
// board.revealMines()  //for debugging