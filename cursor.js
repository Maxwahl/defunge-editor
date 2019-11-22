export class Cursor {
    posX = 0;
    posY = 0;

    lastY = 0;
    lastX = 0;
    down() {
        this.lastY = this.posY
        this.posY += 1;

    }
    up() {
        this.lastY = this.posY
        this.posY = Math.max( this.posY - 1, 0 );
    }
    left() {
        this.lastX = this.posX;
        this.posX = Math.max( this.posX - 1, 0 );
    }
    right() {
        this.lastX = this.posX;
        this.posX += 1;
    }
    newLine() {
        this.lastY = this.posY
        this.posY += 1;
    }
    last( prevLine ) {
        if ( this.posX == 0 ) {
            this.lastY = this.posY
            this.posY -= 1;
            this.lastX = this.posX
            this.posX = prevLine.length - 1;
        }
        else {
            this.left();
        }
    }
}