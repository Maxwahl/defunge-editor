import { Field } from "./field.js"
import { Bridge } from "./bridge.js";
import { Point } from "./point.js";

export class Editor {

    static movement = [ "^", "<", ">", "v", "?", "_", "|", "#" ];
    static operators = [ "+", "-", "/", "*", "%", "!", "`" ];
    static io = [ ".", ",", "&", "~" ];
    static stack = [ ":", "\\", "$", "g", "p" ];
    static end = [ "@" ];
    field;
    stringBegun;
    bridges;
    constructor () {
        this.field = new Field();
        this.bridges = new Array();
    }
    showField() {
        var table = $( "#field" );
        table.find( "tbody tr" ).remove();
        this.calcBridges();
        this.field.fillUp();
        var map = this.field.field
        for ( var i = 0; i < map.length; i++ ) {
            var innerArrayLength = map[ i ].length;
            var row = "";
            this.stringBegun = false;
            for ( var j = 0; j < innerArrayLength; j++ ) {
                var clazz = "class=\"";
                if ( this.field.cursor.posY === i && this.field.cursor.posX == j ) {
                    clazz += "activeText"
                }
                clazz += this.handleSyntaxHighlighting( map[ i ][ j ] );
                clazz += this.handleBridges( j, i );
                clazz += "\"";
                row += "<td " + clazz + ">" + map[ i ][ j ] + "</td>";
            }
            table.append( "<tr>" + row + "</tr>" );
        }
        table = document.getElementById( 'field' );
        var cell = table.getElementsByTagName( 'tr' )[ this.field.cursor.posY ].getElementsByTagName( 'td' )[ this.field.cursor.posX ];
        cell.scrollIntoView();
    }

    handleKey( key ) {
        this.field.handleKey( key, this.bridges );
    }

    handleSyntaxHighlighting( char ) {
        if ( this.stringBegun ) {
            if ( char == "\"" ) {
                this.stringBegun = false;
            }
            return " editor-string";
        }
        if ( char == "\"" ) {
            this.stringBegun = true;
            return " editor-string"
        }

        if ( Editor.movement.includes( char ) ) {
            return " editor-movement";
        }
        if ( Editor.operators.includes( char ) ) {
            return " editor-operators"
        }
        if ( Editor.io.includes( char ) ) {
            return " editor-io"
        }
        if ( Editor.stack.includes( char ) ) {
            return " editor-stack"
        }
        if ( Editor.end.includes( char ) ) {
            return " editor-end"
        }
        return "";
    }

    calcBridges() {
        this.bridges = new Array();
        for ( var i = 0; i < this.field.field.length; i++ ) {
            for ( var j = 0; j < this.field.field[ i ].length; j++ ) {
                var newBridge = new Bridge();
                newBridge.pointA = new Point( j, i );
                if ( this.field.field[ i ][ j ] == ">" ) {
                    var end = this.findBridgeEndRight( j, i );
                    newBridge.pointB = new Point( end, i );
                }
                else if ( this.field.field[ i ][ j ] == "<" ) {
                    var end = this.findBridgeEndLeft( j, i );
                    newBridge.pointB = new Point( end, i );
                }
                else if ( this.field.field[ i ][ j ] == "v" ) {
                    var end = this.findBridgeEndDown( j, i );
                    newBridge.pointB = new Point( j, end );
                }
                else if ( this.field.field[ i ][ j ] == "^" ) {
                    var end = this.findBridgeEndUp( j, i );
                    newBridge.pointB = new Point( j, end );
                }
                else if ( this.field.field[ i ][ j ] == "_" ) {
                    var end = this.findBridgeEndRight( j, i );
                    newBridge.pointB = new Point( end, i );
                    var secondBridge = new Bridge();
                    secondBridge.pointA = newBridge.pointA;
                    end = this.findBridgeEndLeft( j, i )
                    secondBridge.pointB = new Point( end, i );
                    this.addBridge( secondBridge );
                }
                else if ( this.field.field[ i ][ j ] == "|" ) {
                    var end = this.findBridgeEndDown( j, i );
                    newBridge.pointB = new Point( j, end );
                    var secondBridge = new Bridge();
                    secondBridge.pointA = newBridge.pointA;
                    end = this.findBridgeEndUp( j, i )
                    secondBridge.pointB = new Point( j, end );
                    this.addBridge( secondBridge );
                }
                else if ( this.field.field[ i ][ j ] == "?" ) {
                    var end = this.findBridgeEndLeft( j, i );
                    newBridge.pointB = new Point( end, i );


                    var rightBridge = new Bridge();
                    rightBridge.pointA = newBridge.pointA;
                    end = this.findBridgeEndRight( j, i )
                    rightBridge.pointB = new Point( end, i );
                    this.addBridge( rightBridge );


                    var upBridge = new Bridge();
                    upBridge.pointA = newBridge.pointA;
                    end = this.findBridgeEndUp( j, i )
                    upBridge.pointB = new Point( j, end );
                    this.addBridge( upBridge );
                    var downBridge = new Bridge();
                    downBridge.pointA = newBridge.pointA;
                    end = this.findBridgeEndDown( j, i )
                    downBridge.pointB = new Point( j, end );
                    this.addBridge( downBridge );
                }

                if ( !!newBridge.pointB ) {
                    this.addBridge( newBridge );
                }
            }
        }

        var newBridges = new Array();
        for ( var i = 0; i < this.field.field.length; i++ ) {
            for ( var j = 0; j < this.field.field[ i ].length; j++ ) {
                if ( this.field.field[ i ][ j ] == "#" ) {
                    console.log( "found skip" )
                    for ( var b = 0; b < this.bridges.length; b++ ) {
                        if ( this.bridges[ b ].between( j, i ) ) {
                            if ( this.bridges[ b ].isHorizontal() ) {
                                var leftBridge = new Bridge();
                                leftBridge.pointA = new Point( j, i );
                                var end = this.findBridgeEndLeft( j, i );
                                leftBridge.pointB = new Point( end, i )
                                newBridges.push( leftBridge );
                                var rightBridge = new Bridge();
                                rightBridge.pointA = new Point( j, i );
                                var end = this.findBridgeEndRight( j, i );
                                rightBridge.pointB = new Point( end, i )
                                newBridges.push( rightBridge );


                            }
                            else {
                                var downBridge = new Bridge();
                                downBridge.pointA = new Point( j, i );
                                var end = this.findBridgeEndDown( j, i );
                                downBridge.pointB = new Point( j, end )
                                newBridges.push( downBridge );
                                var upBridge = new Bridge();
                                upBridge.pointA = new Point( j, i );
                                var end = this.findBridgeEndUp( j, i );
                                upBridge.pointB = new Point( j, end )
                                newBridges.push( upBridge );
                            }
                        }
                    }
                }
            }
        }
        newBridges.forEach( it => this.addBridge( it ) );



        var startHasBridge = false;
        if ( Editor.movement.includes( this.field.field[ 0 ][ 0 ] ) ) {
            startHasBridge = true;
        }

        if ( !startHasBridge ) {
            var startBridge = new Bridge();
            startBridge.pointA = new Point( 0, 0 );
            var end = this.findBridgeEndRight( 0, 0 );
            startBridge.pointB = new Point( end, 0 );
            this.addBridge( startBridge );
        }
    }
    addBridge( bridge ) {
        if ( !this.bridgeIsContained( bridge ) ) {
            this.bridges.push( bridge );
        }
    }


    handleBridges( x, y ) {
        var isBridge = "";
        this.bridges.forEach( element => {
            if ( element.between( x, y ) ) {
                isBridge = " bridge"
            }
        } );
        return isBridge;
    }
    bridgeIsContained( bridge ) {
        let isContained = false;
        for ( var i = 0; i < this.bridges.length; i++ ) {
            if ( this.bridges[ i ].equals( bridge ) ) {
                isContained = true;
            }
        }

        return isContained;
    }


    findBridgeEndRight( x, y ) {
        var line = this.field.field[ y ];
        for ( var i = x + 1; i < line.length; i++ ) {
            if ( Editor.movement.includes( line[ i ] ) ) {
                return i;
            }
        }
        return line.length - 1;
    }
    findBridgeEndLeft( x, y ) {
        var line = this.field.field[ y ];
        for ( var i = x - 1; i >= 0; i-- ) {
            if ( Editor.movement.includes( line[ i ] ) ) {
                return i;
            }
        }
        return 0;
    }
    findBridgeEndDown( x, y ) {
        var line = this.field.field.map( element => element[ x ] );
        for ( var i = y + 1; i < line.length; i++ ) {
            if ( Editor.movement.includes( line[ i ] ) ) {
                return i;
            }
        }
        return line.length - 1;
    }
    findBridgeEndUp( x, y ) {
        var line = this.field.field.map( element => element[ x ] );
        for ( var i = y - 1; i >= 0; i-- ) {
            if ( Editor.movement.includes( line[ i ] ) ) {
                return i;
            }
        }
        return 0;
    }
}