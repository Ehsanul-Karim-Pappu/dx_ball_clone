/***************************************************************************
****************************************************************************
All the classes and methods are defined here.
****************************************************************************
***************************************************************************/




// Bar object
class Bar {
    constructor() {
        //properties of a Bar object
        this.length = 150;
        this.thickness = 8;
        this.clearance = 4;
        this.x;                                                 //top left horizontal px
        this.y = height - (this.thickness + this.clearance);    //top left vertical px
        this.mid;
    }

    //method to show/draw/display the Bar object at given position(xpos)
    //as i display the bar in the canvas by the horizontal position of the mouse,
    //if mouseX goes beyond the left or right boundary of the canvas then the bar should
    //be displayed at the corner edge of the canvas.
    show(xpos) {
        this.x = xpos - this.length / 2;
        fill(255, 100, 0);
        if (this.x <= 0) {
            rect(0, this.y, this.length, this.thickness, 20); //left boundary constrain
            this.mid = this.length / 2;
        }
        else if (this.x + this.length >= width) {
            rect(width - this.length, this.y, this.length, this.thickness, 20); //right boundary constrain
            this.mid = width - this.length / 2;
        }
        else {
            rect(this.x, this.y, this.length, this.thickness, 20); //normal condition
            this.mid = xpos;
        }
    }
}


//Ball object
class Ball {
    constructor() {
        //properties of a Ball object
        this.loc = new Vector(width / 2, height / 2);   //creates a location vector. defination - vector.js.
                                                        //here the ball will appear at the middle of the canvas at beginning
                                                        //of the game
        this.radius = 10;
        this.velocity = new Vector(1, 1);                    //creates a velocity vector. defination - vector.js
        this.velocity.setAngle(random(atan2(height, width) * 180 / Math.PI,     //set a random angle at first
                                      atan2(height, - width) * 180 / Math.PI));
        this.drop_cnt = 0;
    }

    //method for moving the ball at a given speed. here 'speed' is the magnitude of the velocity vector
    move(speed) {
        // console.log(this.velocity.getMagnitude(), this.velocity.getAngle());
        this.velocity.setMagnitude(speed);      //sets the magnitude of the velocity vector at a given magnitude.(vector.js)
        this.loc.addTo(this.velocity);          //adds the location vector to velocity vector to calcualte the new position of the Ball


        //here i checked if the new calcualted position is valid or not. if the newly calcualted position of the goes
        //beyond the canvas boundary(left, right, top), then reverse the respected component of the velocity vector
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
        //here i checked if the ball hit the bar or not.here I keep tracking the position of the bar by the middle horizontal position
        //of the bar(bar.mid). now if the ball's newly calcualted location is within the length of the bar then the angle of the velocity
        //is set based on where tha ball dropped on the bar.
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

    //reset the location of the ball at the middle of the bar
    reset() {
        // console.log('reset');
        this.loc.x = bar.mid;
        this.loc.y = bar.y - this.radius;
        if (this.velocity.y > 0) this.velocity.y *= -1;
    }

    //draw the ball in the canvas
    show() {
        fill(0, 255, 0);
        ellipse(this.loc.x, this.loc.y, this.radius * 2);  //p5 js funtion
    }
}

//Brick object
class Brick {
    constructor(_x, _y) {
        //properties of a Brick object
        this.x = _x;
        this.y = _y;
        this.length = 60;
        this.thickness = 30;
        this.hGap = 5;          //horizontal gape between two bricks
        this.vGap = 5;          //vertical gape between two bricks
        this.isHit;             //if this brick is hit or not. if hit, then isHit = true;
        this.property = false;  //contains info of the brick (this property wasn't used in this version)
    }

    //displays the brick in the canvas
    show () {
        this.setColor();        //set the brick color according to some given info
        rect(this.x, this.y, this.length, this.thickness, 3);
    }

    //set color of a brick according to the levels array in level.js file
    setColor(val) {
        if (val == 'r') fill(255, 0, 0);
        if (val == 'g') fill(0, 255, 0);
        if (val == 'b') fill(0, 0, 255);
        if (val == 'y') fill(255, 255, 0);
        if (val == 'm') fill(255, 0, 255);
        if (val == 'c') fill(0, 255, 255);
    }

    //this wasn't used in current version
    setProperty(val) {
        this.property = val;
    }
}
