export class Cursor {
    posX = 0;
    posY = 0;

    down() {
        this.posY += 1;
    }
    up() {
        this.posY = Math.max( this.posY - 1, 0 );
    }
    left() {
        this.posX = Math.max( this.posX - 1, 0 );
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