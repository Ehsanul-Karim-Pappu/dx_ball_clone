let bar, ball;

function setup() {
    createCanvas(650, 450);
    bar = new Bar();
    ball = new Ball();
}

function draw() {
    background(220);
    bar.show(mouseX);
    if (isFallen()) reset();
    ball.move();
    ball.show();
}
