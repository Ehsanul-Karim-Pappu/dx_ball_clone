/*****************************************************************************
******************************************************************************
       ____                 _               _      _____ _
      |  _ \               | |             | |    / ____| |
      | |_) |_ __ ___  __ _| | _____  _   _| |_  | |    | | ___  _ __   ___
      |  _ <| '__/ _ \/ _` | |/ / _ \| | | | __| | |    | |/ _ \| '_ \ / _ \
      | |_) | | |  __/ (_| |   < (_) | |_| | |_  | |____| | (_) | | | |  __/
      |____/|_|  \___|\__,_|_|\_\___/ \__,_|\__|  \_____|_|\___/|_| |_|\___|
           | |
           | |__  _   _
           | '_ \| | | |
           | |_) | |_| |
       ____|_.__/ \__, |                  _   _  __          _
      |  ____| |   __/ |                 | | | |/ /         (_)
      | |__  | |__|___/  __ _ _ __  _   _| | | ' / __ _ _ __ _ _ __ ___
      |  __| | '_ \/ __|/ _` | '_ \| | | | | |  < / _` | '__| | '_ ` _ \
      | |____| | | \__ \ (_| | | | | |_| | | | . \ (_| | |  | | | | | | |
      |______|_| |_|___/\__,_|_| |_|\__,_|_| |_|\_\__,_|_|  |_|_| |_| |_|

*****************************************************************************
*****************************************************************************/

/*************************************************************
******Which symbol indicates What:******
////features//// 
'blank space' = no brick
'P'           = paddle expansion
'p'           = paddle contraction
'B'           = increase ball size
'b'           = decrease ball size
'+'           = add one ball
'S'           = increase velocity of ball
's'           = decrease velocity of ball
'X'           = skull/lose one life
'L'           = increase life by one
'l'           = level up

////color////
'r' = red
'g' = green
'b' = blue
'y' = yellow
'm' = magenta
'c' = cyan
**************************************************************/

let levels = [
    // {   //demo level
    //     extra: [
    //         "PpBb+SsXLBPpBb+SsXL",
    //         "PpBb+SsXLbPpBb+SsXL",
    //         "PpBb+SsXLPPpBb+SsXL",
    //         "PpBb+SsXLpPpBb+SsXL",
    //         "PpBb+SsXLSPpBb+SsXL"
    //     ],
    //     color: [
    //         "rrrrrrrrrrrrrrrrrrr",
    //         "ggggggggggggggggggg",
    //         "bbbbbbbbbbbbbbbbbbb",
    //         "ccccccccccccccccccc",
    //         "mmmmmmmmmmmmmmmmmmm"
    //     ]
    // },
    {
        //level 0
        extra: [
            '. . b . . . . l . .',
            ' . . . . . X . . . ',
            '. p . . L . . . + .',
            ' . . . . . S . P . ',
            '. . B . . . . L . .',
        ],
        color: [
            'r g b y m c r g b y',
            ' r g b y m c r g b ',
            'c r g b y m c r g b',
            ' c r g b y m c r g ',
            'm c r g b y m c r g',
        ],
    },

    {
        //level 1
        extra: [
            ' ...L....b...X..l. ',
            ' .   ...X..L..   . ',
            ' L .  p....+.  . X ',
            ' . .   B.l..   . . ',
            ' .s.    ...    ..S ',
            '         P         ',
        ],
        color: [
            ' bbbbbbbbbbbbbbbbb ',
            ' b   rrrrrrrrr   b ',
            ' b b  ggggggg  b b ',
            ' b b   yyyyy   b b ',
            ' bbb    ccc    bbb ',
            '         m         ',
        ],
    },

    {
        //level 2
        extra: [
            '       l..b.       ',
            '      ...L...      ',
            '     ..B....l.     ',
            '    ..X..l...S.    ',
            '   .+..s...L....   ',
            ' ..X....L....X...P ',
        ],
        color: [
            '      grbmbrg      ',
            '     grbmcmbrg     ',
            '    grbmcrcmbrg    ',
            '   grbmcrbrcmbrg   ',
            '  grbmcrbmbrcmbrg  ',
            ' grbmcrbmgmbrcmbrg ',
        ],
    },

    {
        //level 3
        extra: [
            'L.+ .s. ..L .X. . p',
            '. . . . . . . . . .',
            'P.. .X. .+. .L. . X',
            '.   . . .   .   + .',
            'B   + . L   P   .s.',
        ],
        color: [
            'rrr ggg bbb ccc y y',
            'r r g g b b c c y y',
            'rrr ggg bbb ccc y y',
            'r   g g b   c   y y',
            'r   g g b   c   yyy',
        ],
    },
];

let bar = null,
    ball = [];
let flag = null;
let default_sp = 5;
let default_ball_radius = 10;
let default_bar_length = 150;
let sp = default_sp;
let isPressed = false;
let bricks = [];
let level = 0;
let total_bricks = 0,
    broken_bricks = 0;
let life = 5; //also change the value at function.js in level_inc() function
let lives = [];
let tmp = 0;
let score = 0;
let powers = [];
let brickBall_coll, wallBall_coll, paddleBall_coll, levelup, loselife, gameover, victory;
let ball_contraction,
    ball_expansion,
    ball_plus_one,
    ball_speedDown,
    ball_speedUp,
    levelUp,
    lifeUp,
    paddle_contraction,
    paddle_expansion,
    skull;

function preload() {
    //loads the sound tracks
    brickBall_coll = loadSound('assets/sound/brickball.mp3');
    wallBall_coll = loadSound('assets/sound/wallball.mp3');
    paddleBall_coll = loadSound('assets/sound/paddleball.mp3');
    levelup = loadSound('assets/sound/levelup.mp3');
    loselife = loadSound('assets/sound/loselife.mp3');
    gameover = loadSound('assets/sound/gameover.mp3');
    victory = loadSound('assets/sound/victory.mp3');

    //loads images
    paddle_expansion = loadImage('assets/image/paddle_expansion.png');
    paddle_contraction = loadImage('assets/image/paddle_contraction.png');
    ball_cotraction = loadImage('assets/image/ball_contraction.png');
    ball_expansion = loadImage('assets/image/ball_expansion.png');
    ball_plus_one = loadImage('assets/image/ball_plus_one.png');
    ball_speedUp = loadImage('assets/image/ball_speedUp.png');
    ball_speedDown = loadImage('assets/image/ball_speedDown.png');
    skull = loadImage('assets/image/skull.png');
    lifeUp = loadImage('assets/image/lifeUp.png');
    levelUp = loadImage('assets/image/levelUp(1).png');
}
function setup() {
    createCanvas(1250, 500);
    bar = new Bar();
    ball.push(new Ball());
    brick = new Brick(0, 0);
    brickArray(level);
    total_bricks = totalBricks(level);
}

function draw() {
    background(220);
    tmp++;
    if (tmp <= 900) {
        printInstruction();
        // noLoop();
    } else {
        if (life == 0) gameOver();
        level = level_inc(level);
        brickShow(level);
        bar.show(mouseX);
        // debugger;
        if (isFallen() || flag) {
            if (isPressed) {
                isPressed = false;
                flag = false;
                for (let i = 0; i < ball.length; i++) {
                    ball[i].move(sp);
                }
            } else {
                ball[0].reset();
                sp = default_sp + level * 3;
                bar.length = default_bar_length;
                flag = true;
            }
        } else {
            for (let i = 0; i < ball.length; i++) {
                ball[i].move(sp);
            }
        }
        brick_ballColl();
        for (let i = 0; i < ball.length; i++) {
            ball[i].show();
        }
        score_life();
        if (powers.length != 0) {
            for (let i = 0; i < powers.length; i++) {
                powers[i].move();
                powers[i].show();
                doSomething(check_powerBar_coll());
            }
        }
    }
}

class Bar {
    constructor() {
        this.length = default_bar_length;
        this.thickness = 8;
        this.clearance = 4;
        this.x = null;
        this.y = height - (this.thickness + this.clearance);
        this.mid = null;
    }

    show(xpos) {
        this.x = xpos - this.length / 2;
        fill(255, 100, 0);
        if (this.x <= 0) {
            rect(0, this.y, this.length, this.thickness, 20); //edge condition
            this.mid = this.length / 2;
        } else if (this.x + this.length >= width) {
            rect(width - this.length, this.y, this.length, this.thickness, 20); //edge condition
            this.mid = width - this.length / 2;
        } else {
            rect(this.x, this.y, this.length, this.thickness, 20); //normal condition
            this.mid = xpos;
        }
    }
}

class Ball {
    constructor() {
        this.loc = new Vector(width / 2, height / 2);
        this.radius = default_ball_radius;
        this.velocity = new Vector(1, 1);
        this.velocity.setAngle(
            random((atan2(height, width) * 180) / Math.PI, (atan2(height, -width) * 180) / Math.PI)
        );
        this.drop_cnt = 0;
    }

    move(speed) {
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
        if (
            this.loc.x + this.radius > bar.mid - bar.length / 2 &&
            this.loc.x - this.radius < bar.mid + bar.length / 2
        ) {
            if (this.loc.y + this.radius > bar.y) {
                this.loc.y = bar.y - this.radius;
                let angle = map(
                    this.loc.x,
                    bar.mid - bar.length / 2,
                    bar.mid + bar.length / 2,
                    (atan2(-height, -width) * 180) / Math.PI,
                    (atan2(-height, width) * 180) / Math.PI
                );
                this.velocity.setAngle(angle);
                this.drop_cnt++;
                paddleBall_coll.play();
            }
        }
        return this.drop_cnt;
    }

    reset() {
        // console.log('reset');
        this.radius = default_ball_radius;
        this.loc.x = bar.mid;
        this.loc.y = bar.y - this.radius;
        if (this.velocity.y > 0) this.velocity.y *= -1; //nahole ball reset hoyar sathe sathe ekta drop khay
    }

    setloc(_x, _y) {
        this.loc.x = _x;
        this.loc.y = _y;
    }
    setRanAngleUpward() {
        this.velocity.setAngle(
            random(
                (atan2(-height, -width) * 180) / Math.PI,
                (atan2(-height, width) * 180) / Math.PI
            )
        );
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
        this.hGap = 3;
        this.vGap = 3;
        this.isHit = null;
        this.property = null;
    }

    show() {
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

class Power {
    constructor(_x, _y, _power) {
        this.x = _x;
        this.y = _y;
        this.thickness = 40;
        this.length = 50;
        this.yVelocity = 6;
        this.img = null;
        this.power = _power;
    }

    setImage() {
        if (this.power == 'P') {
            this.img = paddle_expansion;
        } else if (this.power == 'p') {
            this.img = paddle_contraction;
        } else if (this.power == 'B') {
            this.img = ball_expansion;
        } else if (this.power == 'b') {
            this.img = ball_cotraction;
        } else if (this.power == '+') {
            this.img = ball_plus_one;
        } else if (this.power == 'S') {
            this.img = ball_speedUp;
        } else if (this.power == 's') {
            this.img = ball_speedDown;
        } else if (this.power == 'X') {
            this.img = skull;
        } else if (this.power == 'L') {
            this.img = lifeUp;
        } else if (this.power == 'l') {
            this.img = levelUp;
        }
    }

    move() {
        this.y += this.yVelocity + level * 1;
    }

    show() {
        image(this.img, this.x, this.y, this.length, this.thickness);
    }
}

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
    if (keyCode == RIGHT_ARROW) {
        console.log(level);
        broken_bricks = total_bricks;
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
        tmp = 900;
    }
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
    }
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
        '* There are also some Power-Ups. This Power-Ups will appear randomly when a brick is being broken',
        20,
        250
    );
    text(
        '* Player can catch or avoid the Power-Ups with the paddle. Effects of different Power-Ups are described below.',
        20,
        280
    );
    image(paddle_expansion, 20, 310, 70, 60);
    image(paddle_contraction, 140, 310, 70, 60);
    image(ball_cotraction, 260, 310, 70, 60);
    image(ball_expansion, 380, 310, 70, 60);
    image(ball_plus_one, 500, 310, 70, 60);
    image(ball_speedUp, 620, 310, 70, 60);
    image(ball_speedDown, 740, 310, 70, 60);
    image(skull, 860, 310, 70, 60);
    image(lifeUp, 980, 310, 70, 60);
    image(levelUp, 1100, 310, 70, 60);
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
