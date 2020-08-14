


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






let bar = null, ball = null;
let flag = null;
let default_sp = 5;
let sp = default_sp;
let isPressed = false;
let bricks = [];
let level = 0;
let total_bricks = 0, broken_bricks = 0;
let life = 5;  //also change the value at function.js in level_inc() function
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
let brickBall_coll, wallBall_coll, paddleBall_coll, levelup, loselife, gameover, victory;

function preload() {
    brickBall_coll = loadSound('sound/brickball.mp3');
    wallBall_coll = loadSound('sound/wallball.mp3');
    paddleBall_coll = loadSound('sound/paddleball.mp3')
    levelup = loadSound('sound/levelup.mp3');
    loselife = loadSound('sound/loselife.mp3');
    gameover = loadSound('sound/gameover.mp3');
    victory = loadSound('sound/victory.mp3');
}
function setup() {
    createCanvas(1250, 500);
    bar = new Bar();
    ball = new Ball();
    brick = new Brick(0, 0);
    brickArray(level);
    total_bricks = totalBricks(level);
}

function draw() {
    background(220);
    tmp++;
    if (tmp <= 650) {
        printInstruction();
    }
    else {
        if (life == 0) gameOver();
        level = level_inc(level);
        brickShow(level);
        bar.show(mouseX);
        // debugger;
        if (isFallen() || flag) {
            if (isPressed) {
                isPressed = false;
                flag = false;
                ball.move(sp);
            }
            else {
                ball.reset();
                flag = true;
            }
        }
        else ball.move(sp);
        brick_ballColl();
        ball.show();
        score_life();
    }
}
