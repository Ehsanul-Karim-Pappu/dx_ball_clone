let bar = null, ball = null;
let flag = null;
let default_sp = 5;
let sp = default_sp;
let isPressed = false;

function setup() {
    createCanvas(850, 550);
    bar = new Bar();
    ball = new Ball();
}

function draw() {
    background(220);
    sp = level(sp);
    bar.show(mouseX);
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
    ball.show();
    console.log('speed', sp);
}
