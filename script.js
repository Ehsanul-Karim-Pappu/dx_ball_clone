


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






let bar = null, ball = [];
let flag = null;
let default_sp = 5;
let default_ball_radius = 10;
let default_bar_length = 150;
let sp = default_sp;
let isPressed = false;
let bricks = [];
let level = 0;
let total_bricks = 0, broken_bricks = 0;
let life = 5;  //also change the value at function.js in level_inc() function
let lives = [];
let tmp = 0;
let score = 0;
let powers = [];
let brickBall_coll, wallBall_coll, paddleBall_coll, levelup, loselife, gameover, victory;
let ball_contraction, ball_expansion, ball_plus_one, ball_speedDown, ball_speedUp, levelUp, lifeUp, paddle_contraction, paddle_expansion, skull;

function preload() {
    //loads the sound tracks
    brickBall_coll = loadSound('assets/sound/brickball.mp3');
    wallBall_coll = loadSound('assets/sound/wallball.mp3');
    paddleBall_coll = loadSound('assets/sound/paddleball.mp3')
    levelup = loadSound('assets/sound/levelup.mp3');
    loselife = loadSound('assets/sound/loselife.mp3');
    gameover = loadSound('assets/sound/gameover.mp3');
    victory = loadSound('assets/sound/victory.mp3');

    //loads images
    paddle_expansion = loadImage('assets/image/paddle_expansion.png');
    paddle_contraction = loadImage('assets/image/paddle_contraction.png');
    ball_cotraction = loadImage('assets/image/ball_contraction.png');
    ball_expansion = loadImage('assets/image/ball_expansion.png');
    ball_plus_one = loadImage('assets/image/ball_plus_one.png');
    ball_speedUp = loadImage('assets/image/ball_speedUp.png');
    ball_speedDown = loadImage('assets/image/ball_speedDown.png');
    skull = loadImage('assets/image/skull.png');
    lifeUp = loadImage('assets/image/lifeUp.png');
    levelUp = loadImage('assets/image/levelUp(1).png');
}
function setup() {
    createCanvas(1250, 500);
    bar = new Bar();
    ball.push(new Ball());
    brick = new Brick(0, 0);
    brickArray(level);
    total_bricks = totalBricks(level);
}

function draw() {
    background(220);
    tmp++;
    if (tmp <= 2500) {
        printInstruction();
        // noLoop();
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
                for (let i = 0; i < ball.length; i++) {
                    ball[i].move(sp);
                }
            }
            else {
                ball[0].reset();
                sp = default_sp + level * 3;
                bar.length = default_bar_length;
                flag = true;
            }
        }
        else {
            for (let i = 0; i < ball.length; i++) {
                ball[i].move(sp);
            }
        }
        brick_ballColl();
        for (let i = 0; i < ball.length; i++) {
            ball[i].show();
        }
        score_life();
        if(powers.length != 0) {
            for (let i = 0; i < powers.length; i++) {
                powers[i].move();
                powers[i].show();
                doSomething(check_powerBar_coll());
            }
        }
    }
}
