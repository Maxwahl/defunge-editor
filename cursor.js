export class Cursor {
    posX = 0;
    posY = 0;

    down() {
        this.posY += 1;
    }
    up() {
        this.posY -= 1
    }
    left() {
        this.posX -= 1;
    }
    right() {
        this.posX += 1;
    }
    newLine() {
        this.posX = 0;
        this.posY += 1;
    }
    last( prevLine ) {
        if ( this.posX == 0 ) {
            this.posY -= 1;
            this.posX = prevLine.length - 1;
        }
        else {
            this.left();
        }
    }
}