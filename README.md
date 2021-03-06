# minesweeper
Welcome back to Minesweeper! Oh, why "back"? Because I'm rewriting the code from scratch, with a better and optimized code and making use of some advanced array methods.

# Play the game:
# https://hectorvilas.github.io/minesweeper/


## roadmap:
As I'm rewriting the same game, the roadmap will be the same as [the previous version](https://github.com/HectorVilas/minesweeper-old-prototype). Some objectives may change during the development.

> I should just rewrite the old one, but that means removing ~90% of the code. I want to keep it as is to see my progress in the future. Also it have some sentimental value, my first recursive function was made there.

- ✅ write down the README file

### things to display on screen:
- ✅ the board
- ✅ counters
- - ✅ remaining mines
- - ✅ time played
- ✅ classic smiley face
- ✅ menu buttons

### game options and buttons:
- ✅ how to play
- ✅ settings
- - ✅ number of mines
- - ✅ board size (X and Y)
- ✅ about
- - ✅ link to my Github profile
- - ✅ credits for any media I may use

### board generation:
- ✅ the board must be generated
- - ✅ width and height defined by option settings
- ✅ mines will be hidden in the board
- - ✅ quantity defined by option settings
- - ✅ the position will be randomized

### game logic:
- ✅ when a tile is clicked
- - ✅ if there's a mine
- - - ✅ show it and reveal the rest of the mines
- - - ✅ the game is over
- - - ✅ the player can't keep clicking on the board without starting again
- - ✅ else, show the number of mines surrounding the tile
- - - ✅ if there's no mines, nothing will be shown
- - - ✅ the surrounding tiles will auto-reveal until there's a mine around
- ✅ right click must add a flag to mark a mine
- - ✅ every flag must reduce the mine counter by one
- - ✅ player can't put more flag than the number of mines
- - ✅ in case of a present flag, it will be removed
- ✅ when all mines has been discovered and tiles without mines revealed
- - ✅ the game ends, announcing it
- - ✅ remaining flags will be placed over the mines
- - ✅ the timer must stop

### visual elements:
#### animations:
- ✅ shockwave effect after revealing a mine
- - ✅ expand the shockwave to the rest of the board
- ✅ animation for board drawing 
#### interface
- ✅ prompt made of divs with absolute position to show in the middle of the screen, over the board itself
- - ✅ if player wins/loses must include "play again" and close buttons
- ✅ "burger" button to show menu on the right of the screen
- - ✅ sliders for board width/height and number of mines
- - ✅ ~~folded "how to play" div with instructions~~ "how to play" option
- - - ✅ include gifs showing how to play
- - ✅ ~~folded~~ "about" div with credits for any third party media used and link to my Github profile

### other ideas:
- ❌ a graphic minefield
- ❌ non-rectangular board shapes
- ✅ sounds
- - ✅ sound toggle button in options
- ❌ show the README.md in the page (may create a new repo for this)
- ✅ replace numbers for images (preventing bad tile scaling)
- ✅ language selector (english - spanish)

### sounds:
- ✅ submarine sonar sound if there's propagation
- ✅ explosion sound if game over

# update 1
Starting again with the game was a really good idea. I just made something in 44 lines of code that took me more than 100 lines in the previous version.

Right now there's nothing on screen, because nothing is done on it for now. If you open the console, you can see a text representation of the board. This will be removed once the game is playable to prevent cheating.

To optimize the game, once the randomizer places a mine, the 8 surrounding non-mined spaces will add 1 to it's number (if it's on range), so no need to calculate every single click while playing.

This is how it looks in the console right now:

![board in console](./media/READMEmd/progress01.png)

# update 2
I added the necessary code to show the board on the page, the tiles are clickables and it will show the surrounding mines or an "m" if there's a mine.

I'm also trying to use some advanced array methods. Tutorials make them look intimidating, but I barely had problems with `.map()` and `filter.()`, at least for basic use. I also tried another workflow for styling. Instead of adding the same attributes to every single thing, I made a generic class to apply those from de HTML. A little example:

```html
<div class="content flex flex-h-center flex-v-center">
```
Right now the game can be played, but without any win or lose condition. Also no propagation of empty tiles, I think this will be the next step.

I'll leave the styling for last, I want to make the game playable first.

![basic board on page](./media/READMEmd/progress02.png)

# update 3
The tile revealing propagation is finally implemented. I used a recursion to make it, it takes a toll in the CPU usage, may replace in the future.

To make it a little more interesting, the propagation have a timeout so the player can see it in action. Also the "revealed" state have a little transition in the `CSS` to make it more pleasant to look at.

It will be removed when graphics are applied to the tiles, so here's two gifs:

![gif](./media/READMEmd/progress03.gif)
![gif](./media/READMEmd/progress04.gif)

# update 4
The numbers are now images instead of text (had a little fun with InkScape). The code just needed a little adaptation to replace the numbers for It's image version. I may need to move a few thing to a new function to make it easier to put images in the tiles and also the mines and flags (and maybe an interrogation char in case the player suspect of a tile but is not sure).

As the images are PNG's with transparent backgrounds, the revealing effect has been conserved and won't need extra code for it.

![gif](./media/READMEmd/progress05.gif)

Anyways, the game is not playable for now, unless the player want to guess if there's a mine in a revealed empty tile or just no mines around.

The next step would be to draw a mine to show in the board, but so many years has passed since I drawed something in vectors. May take me a while to draw a decent mine. I just don't want to download it, may need some drawing skills in the future. Once I have the drawing, I just need to adapt the code.

# update 5
After spending some time with Blender 3D, Gimp and finally InkScape, I modeled and then traced a mine to use as image. Those files used are in the "Resources" folder.

> I've spent a few years in the past messing on Blender 3D and I know enough of Gimp to get the outline of an image so everything was fine until this point, but InkScape was kind of disappointing. I remember drawing lines and curves on Macromedia Flash 5 like 20 years ago, it was so easy and intuitive, and I was especting the same for this other modern software. My first plan was to trace the mine manually, with straight lines and curves, but ended converting the image into a vectorial one. Maybe I should keep looking for other applications for vectorial images.

The code has also been shortened a bit by moving stuff to a new function, which I also used to draw the mine in case there's one on the tile.

If the image is too small on the board, there it is:

![Mine](./media/images/mine.png)

# update 6

Today I wasted time on this little animation, heh. If your selected tile have a mine, a "shockwave" animation will be applied to it and some of it's surrounding tiles. A few seconds later, the remaining mines in the board will be revealed.

The good thing, this have no great effect in the CPU usage. The bad thing, it's not consistent, I don't know why. Still looks good, I think.

![gif](./media/READMEmd/progress06.gif)

# update 7

I've been busy today, so I didn't do much with the game, but at least now the animation is consistent. I didn't know about `"transitionend"` for listeners, I found about it watching again a video I saw one or two months ago. I just nested listeners, so once the tile ends it's transition (growing), then it changes to the next one (shrinking) and so on. There's a little bug with the first mine animation, will try to fix for the next update.

![gif](./media/READMEmd/progress07.gif)

# update 8

solved the first mine no animating. My first solution was partial, the mine would get only two scale changes and stop. Found the real problem: the listeners for `"transitionend"` were listening for any transition, so I limited it to just scale. Now the mine gets animated as the rest of the tiles. If you see the previous gif, you can notice the difference.

![gif](./media/READMEmd/progress08.gif)

# update 9

I just added a win condition, that will "alert" the player once all the non-mined tiles are revealed. This wasn't an easy task. I tried a lot of ways to add in the code a way to reduce the remaining count for every revealed tile, but the way I coded the reveal propagation had a fault: an already revealed tile will receive the "revealed" class again, and this will make the remaining count go down when it shouldn't. A simple `if` solved all the problems, also making sure a revealed tile will not receive a revealed class again.

At this point the game can be played. You reveal a mine, you lose; you reveal all the empty tiles, you win. Now I can start working in the interface! As in the previous project, I want to add sliders for board width/height and number of mines (without letting the player put more mines than tiles).

> the game have some important performance impact. Just moving the cursor over the tiles will make the CPU usage go up to 10%. Maybe it's because I'm using a lot of divs.

# update 10
As the game is now playable, I've been working with the `HTML` and `CSS` for the interface. I'm still too green with the `CSS`, but managed to make a message window that will show on top of whatever is on screen, except for the menu button at the top right.

I also made another placeholder that will appear at the top of the board, like in the classic Minesweeper. It will always have the board width.

All of this is just placeholders, now I should start placing something in those holders.

![prompt](./media/READMEmd/progress09.png)

I like the `darkslateblue` in the background, but I'm not sure about the rest of the colors. I'm pretty sure I'll change the pallete in the future.

# update 11
I just added two sounds: a submarine sonar for the reveal propagation and an underwater sound for the explosion.

I'll give credit to their respective authors in the game itself, but while I don't have it ready, here it is:

- [Sonar](https://freesound.org/people/NoiseCollector/sounds/6164/) sound by [NoiseCollector](https://freesound.org/people/NoiseCollector/) on freesound.org
- [Underwater explosion](https://freesound.org/people/VitaWrap/sounds/434545/) sound by [VitaWrap](https://freesound.org/people/VitaWrap/) on freesound.org

# update 12
Today I've been making some changes on the page style. Also prepared the prompt to show or hide whatever is needed on it. The "options" menu is ready but won't be displayed yet. I still have to code that window.

**note:** done. The code was easy. I made a function that hides everything in the prompt, then shows what it's parameter tells it. Of course, I still have to work in the options itself. Those sliders and checkbox will do nothing for now.

![options menu](./media/READMEmd/progress10.png)

# update 13
This time i've been working on the different prompts. First of all, I added a dropdown menu (not styled yet) that will show "options", "how to play" and "about" buttons. Once one of them is clicked, the dropdown will hide and the prompt will show with the necessary message. I used a single prompt window, the only thing that changes is what is going to be shown on it, because everything is present, but hidden by default.

The "Ok" button and the options still does nothing. May be my next step in this project.

**Note:** added credits for the sound authors in "About/credits" menu.

**Note 2:** now the option settings are functional. The max number of mines can't be higher than `board.width * board.height`.

![gif](./media/READMEmd/progress11.gif)

> I have something to confess: I've been making some personal projects not only for practice, but also to avoid finishing reading about forms (interesting but boring). As you can see in the gif, I ended using what I've learned about forms, heh!

# update 14
I've fixed a problem with `winLoseCondition()`, it was being executed twice. After fixing it, I made another animation: the board will shake once a mine explodes. The first shake looks like it last too much, I'm not sure how to fix that, but for now it's good enough. Maybe I'll change it in the future, may be annoying to see it too often. Another little unwanted detail is how the board will not go back to it's original position, but it's just 1 pixel offset, nothing else. Still may fix in the future.

![gif](./media/READMEmd/progress12.gif)

As an extra, there was a wrong DOM value being modified in the options menu, that's why the "height" slider in the gif above didn't moved the "mines" slider properly until the first modification.

I think it's time to do something with those displays and the face in the center, these are still placeholders. Also the game still have no flags, it's harder to play without those.

There's a lot of work to do to finish this project, I don't want to move to another personal project until this one is done.

# update 15
I noticed something while playing the game: if the mine count is too high, is really easy to fall in a mine while revealing the first tile, making it very hard to start playing. Now the mines are placed after the first click, avoiding the first revealed tile. Because of this, I also limited the max number of mines to `board.width*board.height-1` or the game will fall on an infinite loop with max mines. Also because of this, now the max number of mines will always be a win, I should remember to mock the player for doing this.

![gif](./media/READMEmd/progress13.gif)
(I removed the red background for the mines to prevent flashing lights in the gif)

# update 16
I've been working a little to prepare things to allow placing flags with the right click. Turns out it's not as simple as I thought. I wrote some basic stuff to check if the mouse is being dragged, because now I want the hovered tiles to look pressed while mouse dragging, and reveal the tile when the click is released.

I've also been commenting on the functions, in case I forget what those do in the future.

# update 17
And done, now the buttons will look like pushed if the left click is hold down and the cursor moved over the buttons.

![gif](./media/READMEmd/progress14.gif)

Will happen only with the left button, the flags will be placed in `mousedown`, not `mouseup`, like in the original game (I think). So everything is now ready to start coding the flags! I'm not sure if I should make another "array board" to store it's positions, or just a 1D array with X and Y positions for each flag.

> And here is another confession: I never played Minesweeper when I had it on the OS. I knew the rules, but was never into it. I started liking the game while coding this from scratch, this game is fun!

**note:** now the player can place or remove flags with right mouse click. Once the tile is revealed, the flag will be removed (this was unintentional, another happy little accident). There's no code to limit the number of flags yet, but just having it will make the game more playable than before.

![gif](./media/READMEmd/progress15.gif)

# update 18
Now the mines count on screen will show the remaining mines. Each time the player places a flag, the counter will go down by one. If the counter is at zero, no more flags can be placed until a flag is removed.

When the board reveals the connected empty tiles, if there's a flag, it will be removed and the counter will go up by one for each flag.

About the last part, I wasn't sure if I should reveal empty tiles containing a flag or just ignore during the propagation and let the player guess if the flag is in the right position. I decided to go for the former.

Something to note, this is how I count the flags:
```javascript
let flagsCount = document.querySelectorAll(".flag").length;
display.boardTop.mines.innerText = board.mines - flagsCount;
```

My first approach was adding or removing one in a variable, but then there was a lot of ways something can go wrong, so I decided to cut some corners and just count the tiles containing the class "flag" using `querySelectorAll`. This is way easier and maybe only possible with `HTML`+`JS`, but I'm not sure how CPU intensive is this action. Another thought is, in case I want to write the same in the future, in another language, my first approach was surely the best one.

# update 19
I've been reading the game rules on Wikipedia, and the original Minesweeper not only won't place a mine in the first revealed tile, but does the same for the surrounding tiles, so I made it possible to not have mines around the first revealed tile if `board.width*board.height-9 >= board.mines`.

The face button now have images, and the face will change expresions as in the original game. The code was a little tricky because all the listeners are in the tiles, so dragging the click outside the board will get the face stuck in the surprice state. Solved this problem just adding the normal state to the window's `mouseup` listener.

Also the face button now will restart the game. I had to add a few `if`s to prevent revealing the mines and opening the "game over" prompt after the `setTimeout`s end. Also had to do the same with the propagation. If the player restarts the board during the propagation, it will keep propagating in the new board. `!gameOver` on `if` wasn't a solution, so I used the `firstTile`'s length to know if the game has been restarted, because it will be empty until the first tile is revealed.

![gif](./media/READMEmd/progress16.gif)

Maybe I should get rid of the "you win"/"you lose" prompt, because the face with sunglasses or "X" for eyes will tell the player about it.

# update 20
Today I made a few fixes and changes:
- the mine display in the options was alyaws changing numbers when moving the width or height sliders, instead of doing it only if the max must be reduced.
- the win message was appearing in the next game when the player restarted the game before it showed.
- instead of showing mines when the player wins, the board will show flags.
- the checkbox for sounds in the options menu now works. Unchecking it will mute all sounds.
- the timer is now working. `setInterval` was a little confusing at first, but found the way to make it start and stop when needed.

> I think it's time to move on. I have to finish the game and keep going with the front end course. Right now I can start other fun projects, but I'm limited to simple board games.

# update 21
I've wrote the "how to play" prompt. I also added some images and GIFs to the explanations.

While playing a little to capture those images, I noticed that the method to prevent prompts opening after reseting the board won't always work, so I changed the comprobation to another variable. Now it won't show in the wrong time.

# update 22
I've added a "scan" animation to the board every time the player starts a new game. I wanted to make it advance in diagonal, but I'm still not sure how to do it. Tomorrow I'll try some ways to achieve the result I want. Maybe with a double `for`.

![gif](./media/READMEmd/progress17.gif)

# update 23
I finally did it! Thinking a way to make it diagonally was really confusing, but I found a way to achieve the desired effect and I'm happy with the result.

![gif](./media/READMEmd/progress18.gif)

Here is the code fragment:

- on `JS`:
```javascript
  boardScan(){
    //hide all tiles
    let allTiles = document.querySelectorAll(".tile");
    allTiles.forEach(t => {
      t.classList.add("shrink");
    });
    //creates an array with value-- for diagonal effect
    let arr = [];
    for(let i = board.height; i > 0; i--) arr.push(i-board.height);
    //reveal the tiles in a diagonal line
    for(let i = 0; i < board.width+board.height; i++){
      setTimeout(() => {
        for(let j = 0; j < board.height; j++){
          if(board.tileDom(i+arr[j],j) != undefined){
            //"i+arr[j]" allows the diagonal to be out of phase horizontally
            board.tileDom(i+arr[j],j).classList.add("game-start");
            board.tileDom(i+arr[j],j).classList.remove("shrink");
          };
        };
        //removes "game-start" class after animation
        if(i < board.width+board.height){
          setTimeout(() => {
            allTiles.forEach(t => {
              t.classList.remove("game-start");
            });
          }, 2000);
        };
      }, 20*i+1);
    };
  },
```

- on `CSS`
```CSS
.shrink {
  scale: 0%;
}
.game-start {
  animation: growing 500ms;
}
@keyframes growing {
  from {
    scale: 0%;
  }
  to {
    scale: 100%;
  }
}
```

**Little change:** I found a nice looking wallpaper with a submarine and some naval mines, but there's no info about the author or any CC rules, also no results on reverse image searchs. Anyways, in the credits (burger button - "About/Credits" option) I made sure to leave the link to where I found that wallpaper.

I put that image as wallpaper, and when a mine explodes, it will get a red tint for a few seconds, to add a little more drama to the explosion.

# update 24
I just expanded the shockwave to the entire board! It wasn't easy, and didn't noticed `JS` turning ints into strings randomly, something that was ruining all my tests.

Anyways, I added a checkbox in the Options menu to enable this effect, because its very CPU intensive. I'ts unchecked by default because of this.

![gif](./media/READMEmd/progress19.gif)

# update 25
I tried to replace some `JS` with `CSS`' `@keyframes` but for some reason the animation never showed up on time, and all the tiles got animated at the same time with random delays. I'm going to learn advanced `CSS` later in the course from I'm learning Front End, so I'll leave it the code alone for now.

This was my try, working as espected, but not showing on time:

```css
.tile-exploding {
  animation: tileExploding 3s;
}
@keyframes tileExploding {
  from {
    scale: 100%;
  }
  10% {
    scale: 200%;
    box-shadow: 0 0 20px darkred;
  }
  20% {
    scale: 40%;
    box-shadow: 0 0 30px white;
  }
  45% {
    scale: 150%;
    box-shadow: 3px 3px 10px black;
  }
  70% {
    scale: 80%;
    box-shadow: 0 0 0px black;
  }
  to {
    scale: 100%;
  }
}

```

Anyways, I did another two changes. The page now have a favicon, no big deal, but there it is. Also I noticed that the expanded shockwave have an unnecesary extra step, making the tiles to animate in pairs instead of one by one. I think this eased the CPU usage, I can't see big usage spikes in mine, but still the setting will be disabled by default.

Here's another gif, the screen recorder doesn't struggle anymore and looks smoother than the previous gif.

![gif](./media/READMEmd/progress20.gif)

Another little change: styled checkboxes. With help from [this tutorial](https://moderncss.dev/pure-css-custom-checkbox-style/) (mine is less fancy).

![gif](./media/READMEmd/progress21.gif)

# update 26

Today I've been looking for something to change, to make the game a little better (for my daily practice), and came with the idea of adding LCD-like displays like in the original game. After finishing drawing the numbers on Gimp and a few hours later of coding, I made this:

![gif](./media/READMEmd/progress22.gif)

Here is the code. Maybe there's a better way to write this, looks too extensive for something that simple.

```javascript
//...
display(arr,num){
  let display = document.querySelector(`#display-${arr}`);
  let unit = display.querySelector(".unit");
  let ten = display.querySelector(".ten");
  let hundred = display.querySelector(".hundred");
  let thousand = display.querySelector(".thousand");
  
  let fourDigitNum = ["none","none","none","none"];
  let arrNum = num.toString().split("");
  for(let i = 0; i < arrNum.length; i++){
    fourDigitNum.shift();
    fourDigitNum.push(arrNum[i])
  };
  
  unit.src = `./media/images/display/${fourDigitNum[3]}.png`
  ten.src = `./media/images/display/${fourDigitNum[2]}.png`
  hundred.src = `./media/images/display/${fourDigitNum[1]}.png`
  thousand.src = `./media/images/display/${fourDigitNum[0]}.png`
  
},
//...
```
Because I used DOM element's info, deleting the original text version required a lot of code rewriting, so I did the laziest thing and hid those numbers. Anyways, now I learned that I shoud leave all the data in the JS file, not in the DOM. Now it works without problems, but still I will fix that in the future, as a practice, because I never modified a big enough part of my code.

# update 27
Maybe you already noticed my weird english, that's because I'm a spanish speaker and I'm still learning english, heh. Because of this, now I can check another part of the roadmap, because the game now can be played on english or spanish:

![gif](./media/READMEmd/progress23.gif)

As you can see, you can change language without refreshing the site. This was pretty easy, I just duplicated and translated all the text in the HTML file and added language classe. When the page loads, all the spanish text is hidden. If the flags button is clicked, whatever is tagged "english" will be hidden, and all the "spanish" ones will show, taking it's place.

To make it a little more clear, here is the function to swap language:

```javascript
function setLanguage(){
  if(isInEnglish){
    document.querySelectorAll(".english")
    .forEach(text => text.classList.remove("hidden"));
    document.querySelectorAll(".spanish")
    .forEach(text => text.classList.add("hidden"));
  }else{
    document.querySelectorAll(".english")
    .forEach(text => text.classList.add("hidden"));
    document.querySelectorAll(".spanish")
    .forEach(text => text.classList.remove("hidden"));
  };
};
```

And this is the button code:

```javascript
this.buttons.language.addEventListener("click", () => {
  isInEnglish = !isInEnglish;
  setLanguage();
});
```

# final thoughts
### I think the project is more than finished. I had a few other ideas but it's time to move on, to finally stop making excuses to not continue with the frontend course (I still find forms easy but boring to learn) and finally [embiggen](https://youtu.be/FcxsgZxqnEg?t=66) my knowledge.

# update 28
"I think the project is more than finished"? Can a project be really finished? Today I tried to randomize the mines with a new method, a method that I saw somewhere a week ago that consist in concatenating two arrays and scramble it's content with `.sort()`, then I wrote another way to know the X and Y coordinates of each mine and place the numbers around. Mine is not perfect, as you can see in the image:

![new random method](./media/READMEmd/progress24.png)

Maybe I need to scramble it a little more? Anyways, this setting can be toggled from the Options menu.

**little update**: solved the bad randomization by simply applying `.sort()` 10 times instead of just one:

![gif](./media/READMEmd/progress25.gif)

# update 29

So I finally went back to the "forms" section of the course and, to no get bored with it, i've applied some styling to this project after finding out that even the sliders can be customized. So here is the result:

![gif](./media/READMEmd/progress26.gif)

I'm surprised that I needed `::-webkit-slider-thumb` and `::-moz-range-thumb` for the same thing, I thought all browsers used the same standards.

# update 30

The project was finished like a month ago but I came back to make a little fix.

A few weeks ago I discovered that Chrome and Opera won't work with the experimental randomization, only Firefox. I forgot I had this same randomization here, so I came back to fix it.

```javascript
//this is the code I used
mixed.sort(() => Math.random() > 0.5);
//this is the fixed code
mixed.sort(() => Math.random() > 0.5 ? 1 : -1);

```

For some reason, Firefox only needs a `true` or `false`, but the other ones needs `1` and `-1`. I know this is the correct way to use `.sort()` but as it worked with no problem, I didn't think it could be different between navigators.

# update 31

Today I've been watching some videos about the `CSS`' `transform` property and just noticed that `scale` is part of it, then I thought about this project, how the shockwave animation only works on Firefox.

This was the problem! I've been using `scale: 150%;`. I changed it to `transform: scale(150%);` and now it works outside Firefox too! I also changed `if (e.propertyName == "scale") {` to `if (e.propertyName == "transform") {` in `JavaScript` to make it work.