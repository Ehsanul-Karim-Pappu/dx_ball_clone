let bar = null, ball = null;
let flag = null;

function setup() {
    createCanvas(650, 450);
    bar = new Bar();
    ball = new Ball();
}

function draw() {
    background(220);
    bar.show(mouseX);
    if (isFallen() || flag) {
        if (mouseIsPressed) {
            flag = false;
            ball.move();
        }
        else {
            ball.reset();
            flag = true;
        }
    }
    else ball.move();
    ball.show();
}
