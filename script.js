let bar = null, ball = null;
let flag = null;
let default_sp = 30;
let sp = default_sp;
let isPressed = false;
let bricks = [];
let level = 1;

function setup() {
    createCanvas(1250, 500);
    bar = new Bar();
    ball = new Ball();
    brick = new Brick(0, 0);
    brickArray(level);
}

function draw() {
    background(220);
    brickShow(level);
    sp = sp_level(sp);
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
    // console.log('speed', sp);
}
