function isFallen() {
    if (ball.loc.y + ball.radius >= bar.y) {
        if (ball.loc.x + ball.radius < bar.mid - bar.length / 2 ||
            ball.loc.x - ball.radius > bar.mid + bar.length / 2) {
            // console.log('fallen');
            return true;
        }
    }
    return false;
}

function sp_level(_sp) {
    if (ball.drop_cnt == 5) {
        ball.drop_cnt = 0;
        return _sp += 5;
    }
    return _sp;
}

function mouseReleased() {
    isPressed = true;
}

function brickArray(level) {
    for (let r = 0; r < levels[level].length; r++) {
        bricks[r] = [];
        for (let c = 0; c < levels[level][r].length; c++) {
            let x = c * (brick.hGap + brick.length) + 10;
            let y = r * (brick.vGap + brick.thickness) + 15;
            bricks[r][c] = new Brick(x, y);
            bricks[r][c].isHit = false;
        }
    }
}

function brickShow(level) {
    for (let r  = 0; r < bricks.length; r ++) {
        for (let c = 0; c < bricks[r].length; c++) {
            if (levels[level][r][c] == '.' && !bricks[r][c].isHit)
                bricks[r][c].show();
        }
    }
}

function brick_ballColl() {
    for (let r  = 0; r < bricks.length; r ++) {
        for (let c = 0; c < bricks[r].length; c++) {
            if (levels[level][r][c] == '.' && !bricks[r][c].isHit) {
                if (ball.loc.x + ball.radius > bricks[r][c].x &&
                    ball.loc.x - ball.radius < bricks[r][c].x + brick.length &&
                    ball.loc.y + ball.radius > bricks[r][c].y &&
                    ball.loc.y - ball.radius < bricks[r][c].y + brick.thickness) {
                        ball.velocity.y *= -1;
                        bricks[r][c].isHit = true;
                        console.log(bricks[r][c].isHit);
                }
            }
        }
    }
}
