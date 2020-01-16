const Direction = {
    UP: [0, -1],
    DOWN: [0, 1],
    LEFT: [-1, 0],
    RIGHT: [1, 0]
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class Interpreter{

    editorField;
    maxX;
    maxY; 
    cursorCallback;

    constructor(field, cursorCallback) {
        this.editorField = window.$.extend(true, {}, field.field);
        console.log(this.editorField);
        this.maxX = field.lastCol();
        this.maxY = field.lastRow();
        this.cursorCallback = cursorCallback;
    }

    cursorX = 0;
    cursorY = 0;

    directionVector = Direction.RIGHT;

    start() {
        for(let i = 0; i < 1000; i++){
            console.log(`Cursor: ${this.cursorX}, ${this.cursorY}`)
            const char = this.editorField[this.cursorY][this.cursorX];
            
            if(this.cursorCallback) this.cursorCallback(this.cursorX, this.cursorY);
            this.handle(char);
            this.step();
            
        }
    }

    handle(char) {
        if(char in this.handlers){
            handlers[char]()
        }
    }

    step() {
        this.cursorX += this.directionVector[0];
        this.cursorY += this.directionVector[1];
        if(this.cursorX > this.maxX) this.cursorX = 0;
        if(this.cursorY > this.maxY) this.cursorY = 0;
    }

    handlers = {
        '>': function() {
            this.directionVector = Direction.LEFT;
        },
        '<': function() {
            this.directionVector = Direction.RIGHT;
        }
    }
}