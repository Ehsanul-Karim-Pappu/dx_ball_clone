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
        this.radius = 8;
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
        }
        if (this.loc.x > width - this.radius) {
            this.velocity.x *= -1;
            this.loc.x = width - this.radius;
        }
        if (this.loc.y < this.radius) {
            this.loc.y = this.radius;
            this.velocity.y *= -1;
        }
        // drop
        if ((this.loc.x + this.radius > bar.mid - bar.length / 2) &&
            (this.loc.x - this.radius < bar.mid + bar.length / 2)) {
            if (this.loc.y + this.radius > bar.y) {
                this.loc.y = bar.y - this.radius;
                let angle = map(this.loc.x, bar.mid - bar.length / 2, bar.mid + bar.length / 2,
                    atan2(- height, - width) * 180 / Math.PI, atan2(- height, width) * 180 / Math.PI)
                this.velocity.setAngle(angle);
                console.log(angle);
                this.drop_cnt++;
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
