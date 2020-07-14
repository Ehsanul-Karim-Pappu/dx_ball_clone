var isPressed = false;
var sp_x = 1,
    sp_y = 1;
var ball_pos = {
    x: 0,
    y: 0
},
    ball_rad = 20;
var bar = {
    w: 126,
    thick: 8,
    clearance: 4
};

function setup() {
    createCanvas(600, 450);

}

function draw() {
    var bar_pos = mouseX - bar.w / 2;
    background(220);

    if (mouseX <= bar.w / 2)
        bar_pos = 2;
    if (mouseX >= width - bar.w / 2)
        bar_pos = width - bar.w - 2;

    fill(255, 100, 0);
    rect(bar_pos, height - (bar.thick + bar.clearance), bar.w, bar.thick, 20);
    fill(0, 255, 0);
    if (isPressed) {
        ellipse(ball_pos.x, ball_pos.y, ball_rad, ball_rad);
        ball_move();
        ball_pos.y += sp_y;
        ball_pos.x += sp_x;
    } else
        ellipse(bar_pos + bar.w / 2, height - (bar.thick + bar.clearance + ball_rad / 2), ball_rad, ball_rad);

}

function mousePressed() {
    var bar_pos = mouseX - bar.w / 2;
    isPressed = true;
    ball_pos = {
        x: bar_pos + bar.w / 2,
        y: height - (bar.thick + bar.clearance + ball_rad / 2)
    };
}

function ball_move() {
    var bar_pos = mouseX - bar.w / 2;
    if (ball_pos.x > width - ball_rad / 2 || ball_pos.x < 0)
        sp_x *= -1;
    if (((ball_pos.y > height - (bar.thick + bar.clearance + ball_rad / 2)) && (ball_pos.x == bar_pos + bar.w / 2)) || ball_pos.y < 0)
        sp_y *= -1;
}