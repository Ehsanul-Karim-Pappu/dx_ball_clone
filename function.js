function isFallen() {
    if (ball.y > height) {
        if (ball.x + ball.radius < bar.mid - bar.length / 2 || ball.x - ball.radius > bar.mid + bar.length / 2) {
            return true;
        }
    }
    return false;
}

function reset() {
    console.log('reset');
    ball.x = bar.mid;
    ball.y = bar.y - ball.radius;
    ball.show(ball.x, ball.y);
    // ball.sp_x = 0;
    // ball.sp_y = 0;
}
