function isFallen() {
    if (ball.loc.y + ball.radius > bar.y) {
        if (ball.loc.x + ball.radius < bar.mid - bar.length / 2 ||
            ball.loc.x - ball.radius > bar.mid + bar.length / 2) {
            life--;
            loselife.play();
            // console.log(life);
            return true;
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
        ball.reset();
        console.log(level);
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
    for (let r  = 0; r < levels[level].color.length; r ++) {
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
    let break_flag = false;
    let past_loc = new Vector();
    past_loc = ball.loc.subtract(ball.velocity);
    for (let r  = bricks.length - 1; r >= 0; r --) {
        for (let c = bricks[r].length - 1; c >= 0; c--) {
            if (levels[level].color[r][c] != ' ' && !bricks[r][c].isHit) {
                if (ball.loc.x >= past_loc.x && ball.loc.y <= past_loc.y) { // going upward right
                    if (checkLeftSide(r, c) || checkBottomSide(r, c)) {
                        break_flag = true;
                    }
                }
                if (ball.loc.x <= past_loc.x && ball.loc.y <= past_loc.y) { // going upward left
                    if (checkRightSide(r, c) || checkBottomSide(r, c)) {
                        break_flag = true;
                    }
                }
                if (ball.loc.x >= past_loc.x && ball.loc.y >= past_loc.y) { // going downward right
                    if (checkLeftSide(r, c) || checkTopSide(r, c)) {
                        break_flag = true;
                    }
                }
                if (ball.loc.x <= past_loc.x && ball.loc.y >= past_loc.y) { // going downward left
                    if (checkRightSide(r, c) || checkTopSide(r, c)) {
                        break_flag = true;
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

//checks every side of a brick
function checkLeftSide(r, c) {
    if (ball.loc.x + ball.radius >= bricks[r][c].x &&
        ball.loc.x + ball.radius < bricks[r][c].x + brick.length / 2 &&
        ball.loc.y > bricks[r][c].y &&
        ball.loc.y < bricks[r][c].y + brick.thickness) {
            // if (bricks[r][c].property) {
            //     setXflag();
            // }
            ball.loc.x = bricks[r][c].x - ball.radius;
            ball.velocity.x *= -1;
            bricks[r][c].isHit = true;
            score++;
            brickBall_coll.play();
            // console.log('left');
            // console.log('ball', ball.loc.x, ball.loc.y);
            // console.log('ball.edge.x',ball.loc.x + ball.radius, ball.loc.x - ball.radius);
            // console.log('brick[%d][%d]', r + 1, c + 1, bricks[r][c].x, bricks[r][c].y);
            broken_bricks++;
            return true;
    }
    return false;
}

function checkBottomSide(r, c) {
    if (ball.loc.y - ball.radius <= bricks[r][c].y + brick.thickness &&
        ball.loc.y - ball.radius > bricks[r][c].y &&
        ball.loc.x > bricks[r][c].x &&
        ball.loc.x < bricks[r][c].x + brick.length) {
            // if (bricks[r][c].property) {
            //     setXflag(r, c);
            // }
            ball.loc.y = bricks[r][c].y + brick.thickness + ball.radius;
            ball.velocity.y *= -1;
            bricks[r][c].isHit = true;
            score++;
            brickBall_coll.play();
            // console.log('bottom');
            // console.log('ball', ball.loc.x, ball.loc.y);
            // console.log('ball.edge.y',ball.loc.y + ball.radius, ball.loc.y - ball.radius);
            // console.log('brick[%d][%d]', r + 1, c + 1, bricks[r][c].x, bricks[r][c].y);
            broken_bricks++;
            return true;
    }
    return false;
}

function checkRightSide(r, c) {
    if (ball.loc.x - ball.radius <= bricks[r][c].x + brick.length &&
        ball.loc.x - ball.radius > bricks[r][c].x + brick.length / 2 &&
        ball.loc.y > bricks[r][c].y &&
        ball.loc.y < bricks[r][c].y + brick.thickness) {
            // if (bricks[r][c].property) {
            //     setXflag();
            // }
            ball.loc.x = bricks[r][c].x + brick.length + ball.radius;
            ball.velocity.x *= -1;
            bricks[r][c].isHit = true;
            score++;
            brickBall_coll.play();
            // console.log('right');
            // console.log('ball', ball.loc.x, ball.loc.y);
            // console.log('ball.edge.x',ball.loc.x + ball.radius, ball.loc.x - ball.radius);
            // console.log('brick[%d][%d]', r + 1, c + 1, bricks[r][c].x, bricks[r][c].y);
            broken_bricks++;
            return true;
    }
    return false;
}

function checkTopSide(r, c) {
    if (ball.loc.y + ball.radius >= bricks[r][c].y &&
        ball.loc.y + ball.radius < bricks[r][c].y + brick.thickness &&
        ball.loc.x > bricks[r][c].x &&
        ball.loc.x < bricks[r][c].x + brick.length) {
            // if (bricks[r][c].property) {
            //     setXflag();
            // }
            ball.loc.y = bricks[r][c].y - ball.radius;
            ball.velocity.y *= -1;
            bricks[r][c].isHit = true;
            score++;
            brickBall_coll.play();
            // console.log('top');
            // console.log('ball', ball.loc.x, ball.loc.y);
            // console.log('ball.edge.y',ball.loc.y + ball.radius, ball.loc.y - ball.radius);
            // console.log('brick[%d][%d]', r + 1, c + 1, bricks[r][c].x, bricks[r][c].y);
            broken_bricks++;
            return true;
    }
    return false;
}

//special bricks
// function setXflag(r, c) {
//     if (bricks[r][c].property == 'P') {
//
//     }
//     if (bricks[r][c].property == 'p') {
//
//     }
//     if (bricks[r][c].property == 'S') {
//
//     }
//     if (bricks[r][c].property == 's') {
//
//     }
//     if (bricks[r][c].property == 'X') {
//
//     }
//     if (bricks[r][c].property == 'l') {
//
//     }
//     if (bricks[r][c].property == 'L') {
//
//     }
// }

function sp_inc(_sp) {
    // if (ball.drop_cnt == 5) {
        ball.drop_cnt = 0;
        return _sp += 3;
    // }
    // return _sp;
}

function totalBricks(level) {
    let cnt = 0;
    for (let r  = 0; r < levels[level].color.length; r ++) {
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
        ball.reset();
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
        _level = 3;
        fill(0);
        textAlign(CENTER);
        textSize(30);
        text("Congratulations", width / 2, height / 2);
        text("You won!", width / 2, height / 2 + 40);
        text("Score :", width / 2 - 10, height / 2 + 80);
        text(score, width / 2 + 65, height / 2 + 80);
        textSize(20);
        text("Press F5/Reload to restart!", width / 2, height / 2 + 120);
        noLoop();
    }
    return _level;
}

function gameOver() {
    gameover.play();
    fill(0);
    textAlign(CENTER);
    textSize(30);
    text("Sorry!", width / 2, height / 2 + 10);
    text("You lose!", width / 2, height / 2 + 50);
    text("Score :", width / 2 - 10, height / 2 + 90);
    text(score, width / 2 + 65, height / 2 + 90);
    textSize(20);
    text("Press F5/Reload to restart!", width / 2, height / 2 + 130);
    noLoop();
}

function score_life() {
    // Score
    fill(0);
    textSize(20);
    text("Score :", width - 120, 20);
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
    textSize(30);
    text("Instructions", width / 2, height / 2 - 100);
    textAlign(LEFT);
    textSize(20);
    text("* To move the paddle, use the mouse.", width / 2 - 500, height / 2 - 70);
    text("* The ball will appear in the middle of the canvas at the beginning and start moving downwards in a random direction.", width / 2 - 500, height / 2 - 40);
    text("* You will have 5 lives at each level and each time the ball has fallen, you will lose a life.", width / 2 - 500, height / 2 - 10);
    text("* There are four levels. The speed of the ball will increase as the level increases.", width / 2 - 500, height / 2 + 20);
    text("* Press 'LEFT-ARROW' key to move to next level", width / 2 - 500, height / 2 + 50);
}
