function Particle(x, y) {
    this.x = x;
    this.y = y;
    
    this.display = function(x, y) {
        noStroke();
        fill(0);
        ellipse(x, y, 10, 10);
    }
}