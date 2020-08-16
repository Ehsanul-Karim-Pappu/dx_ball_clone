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
                // console.log(this.drop_cnt);
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
        this.type = null;
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
        this.thickness = 50;
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
