import { Point } from "./point.js"

export class Bridge {

    pointA;
    pointB;
    constructor () {
        this.pointA = new Point();
        this.pointB = undefined;
    }

    equals( other ) {
        return ( this.pointA.equals( other.pointA ) && this.pointB.equals( other.pointB ) ) || ( this.pointA.equals( other.pointB ) && this.pointB.equals( other.pointA ) );
    }

    isHorizontal() {
        return this.pointA.y == this.pointB.y;
    }


    isVertical() {
        return !this.isHorizontal();
    }
    between( x, y ) {
        return Math.min( this.pointA.x, this.pointB.x ) <= x &&
            x <= Math.max( this.pointA.x, this.pointB.x )
            && Math.min( this.pointA.y, this.pointB.y ) <= y &&
            y <= Math.max( this.pointA.y, this.pointB.y );
    }
}
