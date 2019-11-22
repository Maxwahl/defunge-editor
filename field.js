import { Cursor } from "./cursor.js";

export class Field {

    field;
    cursor = new Cursor();
    constructor () {
        this.field = new Array( 1 );;
        for ( var i = 0; i < 1; i++ ) {
            this.field[ i ] = new Array( 1 ).fill( " " );
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
        //add cursor space
        if ( this.field[ this.cursor.posY ] == undefined ) {
            this.field.push();
            this.field[ this.cursor.posY ] = new Array( this.cursor.posX + 1 ).fill( " " )

        }
        else if ( this.field[ this.cursor.posY ][ this.cursor.posX ] == undefined ) {
            this.field[ this.cursor.posY ][ this.cursor.posX ] = " "
        }

        //remove empty rows (trailing)
        var lastRow = this.lastRow();
        this.field.length = lastRow + 1;
        //get current cursor

        var maxCol = Math.max.apply( Math, $.map( this.field, function ( el ) { return el.length } ) ) - 1;
        for ( var i = 0; i < this.field.length; i++ ) {
            if ( this.field[ i ].length < maxCol + 1 ) {
                this.field[ i ].length = maxCol + 1;
                this.field[ i ].fill( " ", this.field[ i ].length, maxCol - 1 );
            }
        }
        var lastCol = this.lastCol();
        for ( var i = 0; i < this.field.length; i++ ) {
            this.field[ i ].length = lastCol + 1;
        }

        for ( var i = 0; i < this.field.length; i++ ) {
            for ( var j = 0; j < this.field[ i ].length; j++ ) {
                if ( this.field[ i ][ j ] == undefined ) {
                    this.field[ i ][ j ] = " "
                }
            }
        }



    }

    lastCharInLineAt( lineIndex ) {
        var line = this.field[ lineIndex ];
        var lastChar = -1;
        if ( line !== undefined ) {
            for ( var i = 0; i < line.length; i++ ) {
                if ( line[ i ] != " " ) {
                    lastChar = i + 1; // index  + space because of character adding
                }
            }
        }
        return lastChar;
    }

    isEmpty( array ) {
        var isEmpty = true;
        if ( array == undefined ) {
            return false;
        }
        array.forEach( element => {
            if ( element != " " ) {
                isEmpty = false;
            }
        } );
        return isEmpty;
    }
    lastRow() {
        var lastRow = this.field.length - 1;
        for ( var i = this.field.length - 1; i >= 0; i-- ) {
            if ( !this.isEmpty( this.field[ i ] ) || i == this.cursor.posY ) {
                lastRow = i;
                break;
            }
        }

        return lastRow;
    }

    lastCol() {
        var lastCol = Math.max.apply( Math, $.map( this.field, function ( el ) { return el.length } ) ) - 1;
        for ( var i = lastCol; i >= 0; i-- ) {
            var col = this.field.map( e => e[ i ] );
            if ( !this.isEmpty( col ) || i == this.cursor.posX ) {
                lastCol = i;
                break;
            }
        }
        return lastCol;
    }
}