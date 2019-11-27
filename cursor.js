export class Cursor {
    posX = 0;
    posY = 0;

    lastY = 0;
    lastX = 0;

    lastMovement = ";"

    down( isDelete = false ) {
        this.lastY = this.posY
        this.posY += 1;
        if ( !isDelete ) {
            this.lastMovement = "down"
        }
    }
    up( isDelete = false ) {
        this.lastY = this.posY
        this.posY = Math.max( this.posY - 1, 0 );
        if ( !isDelete ) {
            this.lastMovement = "up"
        }
    }
    left( isDelete = false ) {
        this.lastX = this.posX;
        this.posX = Math.max( this.posX - 1, 0 );
        if ( !isDelete ) {
            this.lastMovement = "left"
        }
    }
    right( isDelete = false ) {
        this.lastX = this.posX;
        this.posX += 1;
        if ( !isDelete ) {
            this.lastMovement = "right"
        }
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