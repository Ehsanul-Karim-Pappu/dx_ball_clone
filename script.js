let bar = null, ball = null;
let flag = null;
let default_sp = 10;
let sp = default_sp;
let isPressed = false;
let bricks = [];
let level = 0;
let total_bricks = 0, broken_bricks = 0;

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
    level = level_inc(level);
    if (level == 2) {
        console.log('1');
        debugger;
    }
    brickShow(level);
    sp = sp_inc(sp);
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
            sp = default_sp;
            flag = true;
        }
    }
    else ball.move(sp);
    brick_ballColl();
    ball.show();
    // console.log(total_bricks, broken_bricks);
}
