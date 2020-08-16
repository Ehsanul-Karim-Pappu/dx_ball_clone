function isFallen() {
    if (ball.length == 1) {
        //last ball
        if (ball[0].loc.y + ball[0].radius > bar.y) {
            if (
                ball[0].loc.x + ball[0].radius < bar.mid - bar.length / 2 ||
                ball[0].loc.x - ball[0].radius > bar.mid + bar.length / 2
            ) {
                life--;
                loselife.play();
                return true;
            }
        }
    }
    for (let i = 0; i < ball.length; i++) {
        if (ball[i].loc.y + ball[i].radius > bar.y) {
            if (
                ball[i].loc.x + ball[i].radius < bar.mid - bar.length / 2 ||
                ball[i].loc.x - ball[i].radius > bar.mid + bar.length / 2
            ) {
                ball.splice(i, 1);
                i--;
            }
        }
    }
    return false;
}

function mouseReleased() {
    isPressed = true;
}

function keyPressed() {
    // debugger;
    if (keyCode == RIGHT_ARROW) {
        console.log(level);
        broken_bricks = total_bricks;
        // level++;
        // brickArray(level);
        ball.splice(1, ball.length - 1);
        ball[0].reset();
        console.log(level);
    }

    if (keyCode == LEFT_ARROW) {
        ball.push(new Ball());
        ball[ball.length - 1].setloc(ball[0].loc.x, ball[0].loc.y);
        ball[ball.length - 1].setRanAngleUpward();
    }

    if (keyCode == 13) {
        tmp = 2500;
    }

    // if (keyCode == LEFT_ARROW) {
    //     console.log(level);
    //     level--;
    //     brickArray(level);
    //     console.log(level);
    // }
}

function brickArray(level) {
    for (let r = 0; r < levels[level].color.length; r++) {
        bricks[r] = [];
        for (let c = 0; c < levels[level].color[r].length; c++) {
            let x = c * (brick.hGap + brick.length) + 10;
            let y = r * (brick.vGap + brick.thickness) + 35;
            bricks[r][c] = new Brick(x, y);
            bricks[r][c].isHit = false;
            if (levels[level].extra[r][c] != ' ' && levels[level].extra[r][c] != '.') {
                bricks[r][c].setProperty(levels[level].extra[r][c]);
            }
        }
    }
}

function brickShow(level) {
    for (let r = 0; r < levels[level].color.length; r++) {
        for (let c = 0; c < levels[level].color[r].length; c++) {
            if (levels[level].color[r][c] != ' ') {
                if (!bricks[r][c].isHit) {
                    bricks[r][c].setColor(levels[level].color[r][c]);
                    bricks[r][c].show();
                }
            }
        }
    }
}

function brick_ballColl() {
    for (let i = 0; i < ball.length; i++) {
        let break_flag = false;
        let past_loc = new Vector();
        past_loc = ball[i].loc.subtract(ball[i].velocity);
        for (let r = bricks.length - 1; r >= 0; r--) {
            for (let c = bricks[r].length - 1; c >= 0; c--) {
                if (levels[level].color[r][c] != ' ' && !bricks[r][c].isHit) {
                    if (ball[i].loc.x >= past_loc.x && ball[i].loc.y <= past_loc.y) {
                        // going upward right
                        if (checkLeftSide(i, r, c) || checkBottomSide(i, r, c)) {
                            break_flag = true;
                            break;
                        }
                    }
                    if (ball[i].loc.x <= past_loc.x && ball[i].loc.y <= past_loc.y) {
                        // going upward left
                        if (checkRightSide(i, r, c) || checkBottomSide(i, r, c)) {
                            break_flag = true;
                            break;
                        }
                    }
                    if (ball[i].loc.x >= past_loc.x && ball[i].loc.y >= past_loc.y) {
                        // going downward right
                        if (checkLeftSide(i, r, c) || checkTopSide(i, r, c)) {
                            break_flag = true;
                            break;
                        }
                    }
                    if (ball[i].loc.x <= past_loc.x && ball[i].loc.y >= past_loc.y) {
                        // going downward left
                        if (checkRightSide(i, r, c) || checkTopSide(i, r, c)) {
                            break_flag = true;
                            break;
                        }
                    }
                }
            }
            if (break_flag) {
                break_flag = false;
                break;
            }
        }
    }
}

//checks every side of a brick
function checkLeftSide(i, r, c) {
    if (
        ball[i].loc.x + ball[i].radius >= bricks[r][c].x &&
        ball[i].loc.x + ball[i].radius < bricks[r][c].x + brick.length / 2 &&
        ball[i].loc.y > bricks[r][c].y &&
        ball[i].loc.y < bricks[r][c].y + brick.thickness
    ) {
        if (bricks[r][c].property) {
            powers.push(new Power(bricks[r][c].x, bricks[r][c].y, bricks[r][c].property));
            powers[powers.length - 1].setImage();
        }
        ball[i].loc.x = bricks[r][c].x - ball[i].radius;
        ball[i].velocity.x *= -1;
        bricks[r][c].isHit = true;
        score++;
        brickBall_coll.play();
        // console.log('left');
        // console.log('ball[i]', ball[i].loc.x, ball[i].loc.y);
        // console.log('ball[i].edge.x',ball[i].loc.x + ball[i].radius, ball[i].loc.x - ball[i].radius);
        // console.log('brick[%d][%d]', r + 1, c + 1, bricks[r][c].x, bricks[r][c].y);
        broken_bricks++;
        return true;
    }
    return false;
}

function checkBottomSide(i, r, c) {
    if (
        ball[i].loc.y - ball[i].radius <= bricks[r][c].y + brick.thickness &&
        ball[i].loc.y - ball[i].radius > bricks[r][c].y &&
        ball[i].loc.x > bricks[r][c].x &&
        ball[i].loc.x < bricks[r][c].x + brick.length
    ) {
        if (bricks[r][c].property) {
            powers.push(new Power(bricks[r][c].x, bricks[r][c].y, bricks[r][c].property));
            powers[powers.length - 1].setImage();
        }
        ball[i].loc.y = bricks[r][c].y + brick.thickness + ball[i].radius;
        ball[i].velocity.y *= -1;
        bricks[r][c].isHit = true;
        score++;
        brickBall_coll.play();
        // console.log('bottom');
        // console.log('ball[i]', ball[i].loc.x, ball[i].loc.y);
        // console.log('ball[i].edge.y',ball[i].loc.y + ball[i].radius, ball[i].loc.y - ball[i].radius);
        // console.log('brick[%d][%d]', r + 1, c + 1, bricks[r][c].x, bricks[r][c].y);
        broken_bricks++;
        return true;
    }
    return false;
}

function checkRightSide(i, r, c) {
    if (
        ball[i].loc.x - ball[i].radius <= bricks[r][c].x + brick.length &&
        ball[i].loc.x - ball[i].radius > bricks[r][c].x + brick.length / 2 &&
        ball[i].loc.y > bricks[r][c].y &&
        ball[i].loc.y < bricks[r][c].y + brick.thickness
    ) {
        if (bricks[r][c].property) {
            powers.push(new Power(bricks[r][c].x, bricks[r][c].y, bricks[r][c].property));
            powers[powers.length - 1].setImage();
        }
        ball[i].loc.x = bricks[r][c].x + brick.length + ball[i].radius;
        ball[i].velocity.x *= -1;
        bricks[r][c].isHit = true;
        score++;
        brickBall_coll.play();
        // console.log('right');
        // console.log('ball[i]', ball[i].loc.x, ball[i].loc.y);
        // console.log('ball[i].edge.x',ball[i].loc.x + ball[i].radius, ball[i].loc.x - ball[i].radius);
        // console.log('brick[%d][%d]', r + 1, c + 1, bricks[r][c].x, bricks[r][c].y);
        broken_bricks++;
        return true;
    }
    return false;
}

function checkTopSide(i, r, c) {
    if (
        ball[i].loc.y + ball[i].radius >= bricks[r][c].y &&
        ball[i].loc.y + ball[i].radius < bricks[r][c].y + brick.thickness &&
        ball[i].loc.x > bricks[r][c].x &&
        ball[i].loc.x < bricks[r][c].x + brick.length
    ) {
        if (bricks[r][c].property) {
            powers.push(new Power(bricks[r][c].x, bricks[r][c].y, bricks[r][c].property));
            powers[powers.length - 1].setImage();
        }
        ball[i].loc.y = bricks[r][c].y - ball[i].radius;
        ball[i].velocity.y *= -1;
        bricks[r][c].isHit = true;
        score++;
        brickBall_coll.play();
        // console.log('top');
        // console.log('ball[i]', ball[i].loc.x, ball[i].loc.y);
        // console.log('ball[i].edge.y',ball[i].loc.y + ball[i].radius, ball[i].loc.y - ball[i].radius);
        // console.log('brick[%d][%d]', r + 1, c + 1, bricks[r][c].x, bricks[r][c].y);
        broken_bricks++;
        return true;
    }
    return false;
}

function check_powerBar_coll() {
    for (let i = 0; i < powers.length; i++) {
        if (
            powers[i].y + powers[i].thickness >= bar.y &&
            // powers[i].y + powers[i].thickness <= bar.y + bar.thickness &&
            powers[i].x + powers[i].length > bar.mid - bar.length / 2 &&
            powers[i].x < bar.mid + bar.length / 2
        ) {
            powerup.play();
            let p = powers[i].power;
            powers.splice(i, 1);
            i--;
            return p;
        }
        if (powers[i].y > height) {
            powers.splice(i, 1);
            i--;
        }
    }
}

function doSomething(value) {
    if (value == 'P') {
        if (bar.length < 400) {
            bar.length += 50;
        }
    } else if (value == 'p') {
        if (bar.length > 50) {
            bar.length -= 50;
        }
    } else if (value == 'B') {
        for (let i = 0; i < ball.length; i++) {
            ball[i].radius = 20;
        }
    } else if (value == 'b') {
        for (let i = 0; i < ball.length; i++) {
            ball[i].radius = 7;
        }
    } else if (value == '+') {
        ball.push(new Ball());
        ball[ball.length - 1].setloc(ball[0].loc.x, ball[0].loc.y);
        ball[ball.length - 1].setRanAngleUpward();
    } else if (value == 'S') {
        if (sp < 14) {
            sp += 3;
        }
    } else if (value == 's') {
        if (sp > 3) {
            sp -= 3;
        }
    } else if (value == 'X') {
        flag = true;
        life--;
        ball.splice(1, ball.length - 1);
        ball[0].reset();
        loselife.play();
    } else if (value == 'L') {
        if (life < 10) {
            life++;
        }
    } else if (value == 'l') {
        broken_bricks = total_bricks;
        ball.splice(1, ball.length - 1);
        ball[0].reset();
    }
}

function sp_inc(_sp) {
    return (_sp = default_sp + level * 3);
}

function totalBricks(level) {
    let cnt = 0;
    for (let r = 0; r < levels[level].color.length; r++) {
        for (let c = 0; c < levels[level].color[r].length; c++) {
            // console.log(level, r, c);
            if (levels[level].color[r][c] != ' ') cnt++;
        }
    }
    return cnt;
}

function level_inc(_level) {
    let flg = false;
    if (broken_bricks == total_bricks) {
        _level++;
        sp = sp_inc(sp);
        _level = checkWon(_level);
        life = 5;
        lives = [];
        bricks = [];
        brickArray(_level);
        broken_bricks = 0;
        total_bricks = totalBricks(_level);
        ball.splice(1, ball.length - 1);
        ball[0].reset();
        bar.length = default_bar_length;
        levelup.play();
        flg = true;
        // debugger;
    }
    //wanted to pause a while after the ball has fallen
    // if (isPressed || flg) {
    //     isPressed = false;
    //     ball.move(sp);
    // }
    // else {
    //     ball.reset();
    // }
    return _level;
}

function checkWon(_level) {
    if (_level == levels.length) {
        victory.play();
        _level = levels.length - 1;
        fill(0);
        textAlign(CENTER);
        textSize(30);
        text('Congratulations', width / 2, height / 2);
        text('You won!', width / 2, height / 2 + 40);
        text('Score :', width / 2 - 10, height / 2 + 80);
        text(score, width / 2 + 65, height / 2 + 80);
        textSize(20);
        text('Press F5/Reload to restart!', width / 2, height / 2 + 120);
        noLoop();
    }
    return _level;
}

function gameOver() {
    gameover.play();
    fill(0);
    textAlign(CENTER);
    textSize(30);
    text('Sorry!', width / 2, height / 2 + 10);
    text('You lose!', width / 2, height / 2 + 50);
    text('Score :', width / 2 - 10, height / 2 + 90);
    text(score, width / 2 + 65, height / 2 + 90);
    textSize(20);
    text('Press F5/Reload to restart!', width / 2, height / 2 + 130);
    noLoop();
}

function score_life() {
    // Score
    fill(0);
    textSize(20);
    text('Score :', width - 120, 20);
    text(score, width - 55, 20);

    //Life
    let gap = 10;
    for (let i = 0; i < life; i++) {
        lives.push(new Bar());
        lives[i].length = 40;
        lives[i].thickness = 8;
        lives[i].y = 10;
        lives[i].show(i * (lives[i].length + gap) + 40);
    }
}

function printInstruction() {
    fill(0);
    textAlign(CENTER);
    textSize(45);
    text('Instructions', width / 2, 50);
    textAlign(LEFT);
    textSize(23);
    text("* Press 'ENTER' to skip", 20, 100);
    text('* To move the paddle, use the mouse.', 20, 130);
    text(
        '* The ball will appear in the middle of the canvas at the beginning and start moving downwards in a random direction.',
        20,
        160
    );
    text(
        '* Player will have 5 lives at each level and each time the ball has fallen, player will lose a life.',
        20,
        190
    );
    text(
        '* There are four levels. The speed of the ball will increase as the level increases.',
        20,
        220
    );
    text(
        '* There are also some Power-Ups. This Power-Ups will appear randomly when a brick is being broken.',
        20,
        250
    );
    text(
        '* Player can catch or avoid the Power-Ups with the paddle. Effects of different Power-Ups are described below.',
        20,
        280
    );
    image(paddle_expansion, 20, 310, 70, 70);
    image(paddle_contraction, 140, 310, 70, 70);
    image(ball_cotraction, 260, 310, 70, 70);
    image(ball_expansion, 380, 310, 70, 70);
    image(ball_plus_one, 500, 310, 70, 70);
    image(ball_speedUp, 620, 310, 70, 70);
    image(ball_speedDown, 740, 310, 70, 70);
    image(skull, 860, 310, 70, 70);
    image(lifeUp, 980, 310, 70, 70);
    image(levelUp, 1100, 310, 70, 70);
    textSize(17);
    textAlign(CENTER);
    text('paddle', 55, 390);
    text('expansion', 55, 410);
    text('paddle', 175, 390);
    text('contraction', 175, 410);
    text('decrease', 295, 390);
    text('ball size', 295, 410);
    text('increase', 415, 390);
    text('ball size', 415, 410);
    text('add', 535, 390);
    text('one ball', 535, 410);
    text('increase ball', 655, 390);
    text('velocity', 655, 410);
    text('decrease ball', 775, 390);
    text('velocity', 775, 410);
    text('lose', 895, 390);
    text('one life', 895, 410);
    text('gain', 1015, 390);
    text('one life', 1015, 410);
    text('go to', 1135, 390);
    text('next level', 1135, 410);
    textAlign(LEFT);
    text("* Press 'LEFT-ARROW' key to move to next level (NOT RECOMMENDED)", 20, 450);
}
