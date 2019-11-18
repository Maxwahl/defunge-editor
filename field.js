import { Cursor } from "./cursor.js";

export class Field {

    field = new Array( 1 );
    cursor = new Cursor();
    constructor () {
        for ( var i = 0; i < 1; i++ ) {
            this.field[ i ] = new Array( 1 );
        }

        for ( var i = 0; i < 1; i++ ) {
            for ( var j = 0; j < 1; j++ ) {
                this.field[ i ][ j ] = " "
            }
        }
    }

    putChar( character ) {
        this.field[ this.cursor.posY ][ this.cursor.posX ] = character;
        this.cursor.right();
    }

    removeChar() {
        this.cursor.last( this.field[ this.cursor.posY - 1 ] );
        this.field[ this.cursor.posY ][ this.cursor.posX ] = " ";
    }
    newLine() {
        this.cursor.newLine();
    }
    handleKey( key ) {

        if ( key.keyCode != 16 && key.keyCode != 17 && key.keyCode != 18 && key.keyCode != 225 ) {
            key.preventDefault();
            if ( key.key === "Backspace" || key.key === "Delete" ) {
                this.removeChar();
            }
            else if ( key.key === "Enter" ) {
                this.cursor.newLine();
            }
            else if ( key.key === "ArrowUp" ) {
                this.cursor.up();
            }
            else if ( key.key === "ArrowDown" ) {
                this.cursor.down();
            }
            else if ( key.key === "ArrowLeft" ) {
                this.cursor.left();
            }
            else if ( key.key === "ArrowRight" ) {
                this.cursor.right();
            }
            else if ( key.key === "Dead" ) {
                this.putChar( "^" );
            }
            else {
                this.putChar( key.key );
            }
            this.fillUp();
        }
    }
    fillUp() {
        var maxColLength = 0;
        for ( var i = 0; i < this.field.length; i++ ) {
            maxColLength = Math.max( maxColLength, this.field[ i ].length );
        }
        if ( this.cursor.posY >= this.field.length ) {
            this.field.push();
            this.field[ this.cursor.posY ] = new Array( maxColLength ).fill( " " );
        }
        while ( this.cursor.posX >= this.field[ this.cursor.posY ].length ) {
            this.field[ this.cursor.posY ].push( " " )
        }
        for ( var i = 0; i < this.field.length; i++ ) {
            if ( this.field[ i ].length < maxColLength ) {
                while ( this.cursor.posX >= this.field[ i ].length ) {
                    this.field[ i ].push( " " )
                }
            }
        }
    }
}