


/*****************************************************************************
******************************************************************************
       ____                 _               _      _____ _
      |  _ \               | |             | |    / ____| |
      | |_) |_ __ ___  __ _| | _____  _   _| |_  | |    | | ___  _ __   ___
      |  _ <| '__/ _ \/ _` | |/ / _ \| | | | __| | |    | |/ _ \| '_ \ / _ \
      | |_) | | |  __/ (_| |   < (_) | |_| | |_  | |____| | (_) | | | |  __/
      |____/|_|  \___|\__,_|_|\_\___/ \__,_|\__|  \_____|_|\___/|_| |_|\___|
           | |
           | |__  _   _
           | '_ \| | | |
           | |_) | |_| |
       ____|_.__/ \__, |                  _   _  __          _
      |  ____| |   __/ |                 | | | |/ /         (_)
      | |__  | |__|___/  __ _ _ __  _   _| | | ' / __ _ _ __ _ _ __ ___
      |  __| | '_ \/ __|/ _` | '_ \| | | | | |  < / _` | '__| | '_ ` _ \
      | |____| | | \__ \ (_| | | | | |_| | | | . \ (_| | |  | | | | | | |
      |______|_| |_|___/\__,_|_| |_|\__,_|_| |_|\_\__,_|_|  |_|_| |_| |_|

*****************************************************************************
*****************************************************************************/




/*********   Here I have used javascript p5.js library   ********************/




/*******   Initializing some variables    **************/

let bar = null, ball = null;  //declaring variable for ball and ball object
let flag = null;
let default_sp = 5;
let sp = default_sp;
let isPressed = false;  //checks if the mouse is released after being clicked
let bricks = [];
let level = 0;
let total_bricks = 0, broken_bricks = 0;
let life = 5;  //also change the value at function.js at line 189
let lives = [];
let tmp = 0;
let score = 0;
// let xtra = {
//     paddleExpand : false,
//     paddleContraction : false,
//     speedUp : false,
//     speedDown : false,
//     skull : false,
//     lifeUp : false,
//     levelUp : false
// }
let brickBall_coll, wallBall_coll, paddleBall_coll, levelup, loselife, gameover, victory;  //variables for sound file

//load the sound files at first, to be ready to play.
//this a p5js function
//this function is executed once at the very beginning.
function preload() {
    brickBall_coll = loadSound('sound/brickball.mp3');  //loads a file(p5js function)
    wallBall_coll = loadSound('sound/wallball.mp3');
    paddleBall_coll = loadSound('sound/paddleball.mp3')
    levelup = loadSound('sound/levelup.mp3');
    loselife = loadSound('sound/loselife.mp3');
    gameover = loadSound('sound/gameover.mp3');
    victory = loadSound('sound/victory.mp3');
}

//this function is executed once after preload().
//this also a p5js function
function setup() {
    createCanvas(1250, 500);  //creates a canvas of width = 1250px, height = 500px.
    bar = new Bar();  //Initialize a new Bar object, whose defination can be found in class.js file
    ball = new Ball();  //Initialize a new ball object, whose defination can be found in class.js file
    brick = new Brick(0, 0);  //Initialize a new brick object, whose defination can be found in class.js file
    brickArray(level);  //creates an array of brick objects for given level. and defination can be found in function.js file
    total_bricks = totalBricks(level);  //calcualte the total bricks of a given level. defination can be found in function.js file
}

//this function loops over and over.
//this a p5js function
function draw() {
    background(220);                //set the background color of the canvas(p5js function)
    tmp++;                          //keeps increasing at every iteration
    if (tmp <= 700) {
        printInstruction();         //instructions will continue to print up to 700 iteration. (funtion.js)
    }
    else {
        if (life == 0) gameOver();  //checks if life comes down to 0, if 0, then gameover. (funtion.js)
        level = level_inc(level);   //if game is not over then checks if current level is finished or not. (funtion.js)
        brickShow(level);           //shows the bricks that are not broken.(funtion.js)
        bar.show(mouseX);           //shows the bar at the canvas under a given constrain. defination - class.js under Ball class
                                    //mouseX contains the current horizontal position(px) of the mouse

        //checks if the ball has fallen. if the ball has fallen then resets the ball's position until the mouse has been
        //clicked. after mouse click, the ball starts to move. if not fallen then keeps moving.
        if (isFallen() || flag) {   //isFallen() - defination in funtion.js
            if (isPressed) {        //if the mouse is released after being clicked, then isPressed = true;
                isPressed = false;
                flag = false;
                ball.move(sp);      //moves the ball at a given speed(sp). defination - class.js under Ball class
            }
            else {
                ball.reset();       //resets the ball at the middle of the bar. defination - class.js under Ball class
                // sp = default_sp;
                flag = true;
            }
        }
        else ball.move(sp);
        brick_ballColl();           //checks if the ball has hit any brick. defination - funtion.js
        ball.show();                //draws the ball in the canvas. defination - class.js under Ball class
        score_life();               //display and calcualte the score and remainig life. defination - funtion.js
    }
}
