# minesweeper
Welcome back to Minesweeper! Oh, why "back"? Because I'm rewriting the code from scratch, with a better and optimized code and making use of some advanced array methods.

# Play the game:
# https://hectorvilas.github.io/minesweeper/


## roadmap:
As I'm rewriting the same game, the roadmap will be the same as [the previous version](https://github.com/HectorVilas/minesweeper-old-prototype). Some objectives may change during the development.

> I should just rewrite the old one, but that means removing ~90% of the code. I want to keep it as is to see my progress in the future. Also it have some sentimental value, my first recursive function was made there.

- ✅ write down the README file

### design:
- ❌ height must be same as window size to prevent scrolling
- ❌ board must scale with window
- ❌ board must keep aspect ratio

### things to display on screen:
- ❌ the board
- ❌ counters
- - ❌ remaining mines
- - ❌ time played
- ❌ classic smiley face
- ❌ menu buttons

### game options and buttons:
- ❌ how to play
- ❌ settings
- - ❌ number of mines
- - ❌ board size (X and Y)
- ❌ about
- - ❌ link to my Github profile
- - ❌ credits for any media I may use

### board generation:
- ❌ the board must be generated
- - ❌ width and height defined by option settings
- ❌ mines will be hidden in the board
- - ❌ quantity defined by option settings
- - ❌ the position will be randomized

### game logic:
- ❌ when a tile is clicked
- - ❌ if there's a mine
- - - ❌ show it and reveal the rest of the mines
- - - ❌ the game is over
- - - ❌ the player can't keep clicking on the board without starting again
- - ❌ else, show the number of mines surrounding the tile
- - - ❌ if there's no mines, nothing will be shown
- - - ❌ the surrounding tiles will auto-reveal until there's a mine around
- ❌ right click must add a flag to mark a mine
- - ❌ every flag must reduce the mine counter by one
- - ❌ player can't put more flag than the number of mines
- - ❌ in case of a present flag, it will be removed
- ❌ when all mines has been discovered and tiles without mines revealed
- - ❌ the game ends, announcing it
- - ❌ remaining flags will be placed over the mines
- - ❌ the timer must stop

### other ideas:
- ❌ a graphic minefield
- ❌ non-rectangular board shapes
- ❌ num type input items changes board size in real time
- ❌ sounds
- - ❌ sound toggle button in options
- ❌ show the README.md in the page (may create a new repo for this)
- ❌ replace numbers for images (preventing bad tile scaling)
- ❌ language selector (english - spanish)

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