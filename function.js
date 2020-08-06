function isFallen() {
    if (ball.y + ball.radius >= bar.y) {
        if (ball.x + ball.radius < bar.mid - bar.length / 2 || ball.x - ball.radius > bar.mid + bar.length / 2) {
            return true;
        }
    }
    return false;
}
