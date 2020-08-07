function isFallen() {
    if (ball.loc.y + ball.radius >= bar.y) {
        if (ball.loc.x + ball.radius < bar.mid - bar.length / 2 || ball.loc.x - ball.radius > bar.mid + bar.length / 2) {
            // console.log('fallen');
            return true;
        }
    }
    return false;
}

function level(_sp) {
    if (ball.drop_cnt == 5) {
        ball.drop_cnt = 0;
        return _sp += 5;
    }
    return _sp;
}
