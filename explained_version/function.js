/***********************************************************************
************************************************************************
         functions used in the script.js, are defined here
************************************************************************
***********************************************************************/




//checks if the ball is fallen or not
//if the ball's location passes the bar then user will lose a Life
//and a sound track will be played.
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

//this is a p5 js function. every time the mouse button is released, code inside this
//function will be executed
function mouseReleased() {
    isPressed = true;
}

//this function creates a brick array of a given level. it tracks the levels array
//in level.js file and creates the brick array. and each element in this array is
//an Brick object (defined  at class.js under Brick)
function brickArray(level) {
    for (let r = 0; r < levels[level].color.length; r++) {
        bricks[r] = [];
        for (let c = 0; c < levels[level].color[r].length; c++) {
            let x = c * (brick.hGap + brick.length) + 10;
            let y = r * (brick.vGap + brick.thickness) + 35;
            bricks[r][c] = new Brick(x, y);
            bricks[r][c].isHit = false;
            // if (levels[level].extra[r][c] != ' ' && levels[level].extra[r][c] != '.') {
            //     bricks[r][c].setProperty(levels[level].extra[r][c]);
            // }
        }
    }
}


//this function is for display the created brick array in the canvas. it tracks the
//levels array for the formation and the color property of each brick and checks if
//the brick is already hit. if hit, then won't display in canvas.
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


//this is the main function of this whole game. Inside this function, the two nested for
//loop checks if the the ball hit any brick. first it compare the formation with the levels
//array and checks if the brick is hit or not earlier. if hit already then no need to check
//and goes to next iteration. if not hit the checks the current location of the ball and the
//current brick. if the ball collide with the brick then set the isHit property to true,
//increases the score and increment the broken_bricks variable and plays a sound file.
//Bug
//But my collision detection has two bug which is not fixed currently. if the velocity of the
//ball increases to a amount that for each successive increase of the velocity, the ball passes
//several bricks then there will be a problem.The ball may skip one or two bricks. means the
//ball may skip one or two bricks and collide with the insider brick. there is also a problem with
//the loop. since i was checking the bricks from below, the bricks below are getting more preference.
//this causes some problem. there is also a side preference problem of a brick. i checked the left side
//first, then right side, then top then bottom.
function brick_ballColl() {
    let br_flag = false;
    for (let r  = bricks.length - 1; r >= 0; r --) {
        for (let c = bricks[r].length - 1; c >= 0; c--) {
            if (levels[level].color[r][c] != ' ' && !bricks[r][c].isHit) {
                if (ball.loc.x + ball.radius > bricks[r][c].x &&
                    ball.loc.x - ball.radius < bricks[r][c].x + brick.length / 2 &&
                    ball.loc.y >= bricks[r][c].y &&
                    ball.loc.y <= bricks[r][c].y + brick.thickness) {
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
                        br_flag = true;
                        broken_bricks++;
                        break;
                }
                else if (ball.loc.x - ball.radius < bricks[r][c].x + brick.length &&
                    ball.loc.x + ball.radius > bricks[r][c].x + brick.length / 2 &&
                    ball.loc.y >= bricks[r][c].y &&
                    ball.loc.y <= bricks[r][c].y + brick.thickness) {
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
                        br_flag = true;
                        broken_bricks++;
                        break;
                }
                else if (ball.loc.y + ball.radius > bricks[r][c].y &&
                    ball.loc.y - ball.radius < bricks[r][c].y + brick.thickness / 2 &&
                    ball.loc.x + ball.radius >= bricks[r][c].x &&
                    ball.loc.x - ball.radius <= bricks[r][c].x + brick.length) {
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
                        br_flag = true;
                        broken_bricks++;
                        break;
                }
                else if (ball.loc.y - ball.radius < bricks[r][c].y + brick.thickness &&
                    ball.loc.y + ball.radius > bricks[r][c].y + brick.thickness / 2 &&
                    ball.loc.x + ball.radius >= bricks[r][c].x &&
                    ball.loc.x - ball.radius <= bricks[r][c].x + brick.length) {
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
                        br_flag = true;
                        broken_bricks++;
                        break;
                }
            }
        }
        if (br_flag) {
            br_flag = false;
            break;
        }
    }
}

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


//increases the speed by 3
function sp_inc(_sp) {
    // if (ball.drop_cnt == 5) {
        ball.drop_cnt = 0;
        return _sp += 3;
    // }
    // return _sp;
}


//calculate the total brick at a given level from the levels array.
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


//increases the level. this function checks if the broken_bricks is equal to the calculated
//total bricks. if equal then increments level, increases the speed, set lives to a given default
//value. then creates the brick array for the incremented level. set the broken_bricks value to
//zero. and calculate the total_bricks of the incremented level. resets the ball's location and
//plays a sound track.
//wanted to stop the ball after level change (absent in this version)
function level_inc(_level) {
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
        // debugger;
    }
    // if (isPressed || flg) {
    //     isPressed = false;
    //     ball.move(sp);
    // }
    // else {
    //     ball.reset();
    // }
    return _level;
}


//checks if won or not. if the level is equal to the length of the levels array then player
//has finished the last level. cause currently the length of the levels array is 4, and i
//have numbered the level from zero. so level 3 is the last level and if the player has
//finished level 3 (last level) then the level_inc(_level) will increment the level to 4,
//and the condition will satisfy. then some text, and score will be displayed.
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


//if game is over then displays some text and score
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


//displays the score and lives at the canvas
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


//Instructions for the player, how to play
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
}
