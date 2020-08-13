//levels
let levels = [
    {   //level 0
        extra: [
            ". . S . . . . . . .",
            " . . . . . . . . X ",
            ". p . . L . . . . .",
            " . . . . . . . P . ",
            ". . S . s . . l . ."
        ],
        color: [
            "r g b y m c r g b y",
            " r g b y m c r g b ",
            "c r g b y m c r g b",
            " c r g b y m c r g ",
            "m c r g b y m c r g"
        ]
    },

    {   //level 1
        extra: [
            " ................. ",
            " .   .........   . ",
            " . .  .......  . . ",
            " . .   .....   . . ",
            " ...    ...    ... ",
            "         .         "
        ],
        color: [
            " bbbbbbbbbbbbbbbbb ",
            " b   rrrrrrrrr   b ",
            " b b  ggggggg  b b ",
            " b b   yyyyy   b b ",
            " bbb    ccc    bbb ",
            "         m         "
        ]
    },

    {   //level 2
        extra: [
            "       .....       ",
            "      .......      ",
            "     .........     ",
            "    ...........    ",
            "   .............   ",
            " ................. "
        ],
        color: [
            "       rbgbr       ",
            "      rbmgmbr      ",
            "     rbmcgcmbr     ",
            "    rbmcrgrcmbr    ",
            "   rbmcrbgbrcmbr   ",
            " rrbmcrbmgmbrcmbrr "
        ]
    },

    {   //level 3
        extra: [
            "... ... ... ... . .",
            ". . . . . . . . . .",
            "... ... ... ... . .",
            ".   . . .   .   . .",
            ".   . . .   .   ..."
        ],
        color: [
            "rrr ggg bbb ccc y y",
            "r r g g b b c c y y",
            "rrr ggg bbb ccc y y",
            "r   g g b   c   y y",
            "r   g g b   c   yyy"
        ]
    }
]



//main code

let bar = null, ball = null;
let flag = null;
let default_sp = 5;
let sp = default_sp;
let isPressed = false;
let bricks = [];
let level = 0;
let total_bricks = 0, broken_bricks = 0;
let life = 5;  //also change the value at function.js at line 189
let lives = [];
let tmp = 0;
let score = 0;
// let xtra = {
//     paddleExpand : false,
//     paddleContraction : false,
//     speedUp : false,
//     speedDown : false,
//     skull : false,
//     lifeUp : false,
//     levelUp : false
// }
let brickBall_coll, wallBall_coll, paddleBall_coll, levelup, loselife, gameover, victory;

function preload() {
    brickBall_coll = loadSound('sound/brickball.mp3');
    wallBall_coll = loadSound('sound/wallball.mp3');
    paddleBall_coll = loadSound('sound/paddleball.mp3')
    levelup = loadSound('sound/levelup.mp3');
    loselife = loadSound('sound/loselife.mp3');
    gameover = loadSound('sound/gameover.mp3');
    victory = loadSound('sound/victory.mp3');
}
function setup() {
    createCanvas(1250, 500);
    bar = new Bar();
    ball = new Ball();
    brick = new Brick(0, 0);
    brickArray(level);
    total_bricks = totalBricks(level);
}

function draw() {
    background(220);
    tmp++;
    if (tmp <= 700) {
        printInstruction();
    }
    else {
        if (life == 0) gameOver();
        level = level_inc(level);
        brickShow(level);
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
                // sp = default_sp;
                flag = true;
            }
        }
        else ball.move(sp);
        brick_ballColl();
        ball.show();
        score_life();
    }
}




//classes and objects

class Bar {
    constructor() {
        this.length = 150;
        this.thickness = 8;
        this.clearance = 4;
        this.x;
        this.y = height - (this.thickness + this.clearance);
        this.mid;
    }

    show(xpos) {
        this.x = xpos - this.length / 2;
        fill(255, 100, 0);
        if (this.x <= 0) {
            rect(0, this.y, this.length, this.thickness, 20); //edge condition
            this.mid = this.length / 2;
        }
        else if (this.x + this.length >= width) {
            rect(width - this.length, this.y, this.length, this.thickness, 20); //edge condition
            this.mid = width - this.length / 2;
        }
        else {
            rect(this.x, this.y, this.length, this.thickness, 20); //normal condition
            this.mid = xpos;
        }
    }
}

class Ball {
    constructor() {
        this.loc = new Vector(width / 2, height / 2);
        this.radius = 10;
        this.velocity = new Vector(1, 1);
        this.velocity.setAngle(random(atan2(height, width) * 180 / Math.PI,
            atan2(height, - width) * 180 / Math.PI));
        this.drop_cnt = 0;
    }

    move(speed) {
        // console.log(this.velocity.getMagnitude(), this.velocity.getAngle());
        this.velocity.setMagnitude(speed);
        this.loc.addTo(this.velocity);
        if (this.loc.x < this.radius) {
            this.velocity.x *= -1;
            this.loc.x = this.radius;
            wallBall_coll.play();
        }
        if (this.loc.x > width - this.radius) {
            this.velocity.x *= -1;
            this.loc.x = width - this.radius;
            wallBall_coll.play();
        }
        if (this.loc.y < this.radius) {
            this.loc.y = this.radius;
            this.velocity.y *= -1;
            wallBall_coll.play();
        }
        // drop
        if ((this.loc.x + this.radius > bar.mid - bar.length / 2) &&
            (this.loc.x - this.radius < bar.mid + bar.length / 2)) {
            if (this.loc.y + this.radius > bar.y) {
                this.loc.y = bar.y - this.radius;
                let angle = map(this.loc.x, bar.mid - bar.length / 2, bar.mid + bar.length / 2,
                    atan2(- height, - width) * 180 / Math.PI, atan2(- height, width) * 180 / Math.PI)
                this.velocity.setAngle(angle);
                this.drop_cnt++;
                paddleBall_coll.play();
                // console.log(this.drop_cnt);
            }
        }
        return this.drop_cnt;
    }

    reset() {
        // console.log('reset');
        this.loc.x = bar.mid;
        this.loc.y = bar.y - this.radius;
        if (this.velocity.y > 0) this.velocity.y *= -1;
    }

    show() {
        fill(0, 255, 0);
        ellipse(this.loc.x, this.loc.y, this.radius * 2);
    }
}

class Brick {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.length = 60;
        this.thickness = 30;
        this.hGap = 5;
        this.vGap = 5;
        this.isHit;
        this.property = false;
    }

    show () {
        this.setColor();
        rect(this.x, this.y, this.length, this.thickness, 3);
    }

    setColor(val) {
        if (val == 'r') fill(255, 0, 0);
        if (val == 'g') fill(0, 255, 0);
        if (val == 'b') fill(0, 0, 255);
        if (val == 'y') fill(255, 255, 0);
        if (val == 'm') fill(255, 0, 255);
        if (val == 'c') fill(0, 255, 255);
    }

    setProperty(val) {
        this.property = val;
    }
}


//functions

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
}
