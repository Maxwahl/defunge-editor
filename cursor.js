export class Cursor {
    posX = 0;
    posY = 0;

    lastY = 0;
    lastX = 0;

    lastMovement = ";"

    down() {
        this.lastY = this.posY
        this.posY += 1;
        this.lastMovement = "down"
    }
    up() {
        this.lastY = this.posY
        this.posY = Math.max( this.posY - 1, 0 );
        this.lastMovement = "up"
    }
    left() {
        this.lastX = this.posX;
        this.posX = Math.max( this.posX - 1, 0 );
        this.lastMovement = "left"
    }
    right() {
        this.lastX = this.posX;
        this.posX += 1;
        this.lastMovement = "right"
    }
    newLine() {
        this.lastY = this.posY
        this.posY += 1;
    }
    last( prevLine ) {
        if ( this.posX == 0 ) {
            this.lastY = this.posY
            this.posY = Math.max( this.posY - 1, 0 )
            this.lastX = this.posX
            if ( prevLine != undefined ) {
                this.posX = prevLine.length - 1;
            }
            else {
                this.posX = 0;
            }
        }
        else {
            this.left();
        }
    }
}