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
                    ball.loc.x - ball.radius < bricks[r][c].x + brick.length / 2 &&
                    ball.loc.y >= bricks[r][c].y &&
                    ball.loc.y <= bricks[r][c].y + brick.thickness) {
                        ball.loc.x = bricks[r][c].x - ball.radius;
                        ball.velocity.x *= -1;
                        bricks[r][c].isHit = true;
                        console.log('left');
                        console.log('ball', ball.loc.x, ball.loc.y);
                        console.log('ball.edge.x',ball.loc.x + ball.radius, ball.loc.x - ball.radius);
                        console.log('brick[%d][%d]', r + 1, c + 1, bricks[r][c].x, bricks[r][c].y);
                }
                if (ball.loc.x - ball.radius < bricks[r][c].x + brick.length &&
                    ball.loc.x + ball.radius > bricks[r][c].x + brick.length / 2 &&
                    ball.loc.y >= bricks[r][c].y &&
                    ball.loc.y <= bricks[r][c].y + brick.thickness) {
                        ball.loc.x = bricks[r][c].x + brick.length + ball.radius;
                        ball.velocity.x *= -1;
                        bricks[r][c].isHit = true;
                        console.log('right');
                        console.log('ball', ball.loc.x, ball.loc.y);
                        console.log('ball.edge.x',ball.loc.x + ball.radius, ball.loc.x - ball.radius);
                        console.log('brick[%d][%d]', r + 1, c + 1, bricks[r][c].x, bricks[r][c].y);
                }
                if (ball.loc.y + ball.radius > bricks[r][c].y &&
                    ball.loc.y - ball.radius < bricks[r][c].y + brick.thickness / 2 &&
                    ball.loc.x >= bricks[r][c].x &&
                    ball.loc.x <= bricks[r][c].x + brick.length) {
                        ball.loc.y = bricks[r][c].y - ball.radius;
                        ball.velocity.y *= -1;
                        bricks[r][c].isHit = true;
                        console.log('top');
                        console.log('ball', ball.loc.x, ball.loc.y);
                        console.log('ball.edge.y',ball.loc.y + ball.radius, ball.loc.y - ball.radius);
                        console.log('brick[%d][%d]', r + 1, c + 1, bricks[r][c].x, bricks[r][c].y);
                }
                if (ball.loc.y - ball.radius < bricks[r][c].y + brick.thickness &&
                    ball.loc.y + ball.radius > bricks[r][c].y + brick.thickness / 2 &&
                    ball.loc.x >= bricks[r][c].x &&
                    ball.loc.x <= bricks[r][c].x + brick.length) {
                        ball.loc.y = bricks[r][c].y + brick.thickness + ball.radius;
                        ball.velocity.y *= -1;
                        bricks[r][c].isHit = true;
                        console.log('bottom');
                        console.log('ball', ball.loc.x, ball.loc.y);
                        console.log('ball.edge.y',ball.loc.y + ball.radius, ball.loc.y - ball.radius);
                        console.log('brick[%d][%d]', r + 1, c + 1, bricks[r][c].x, bricks[r][c].y);
                }
            }
        }
    }
}
