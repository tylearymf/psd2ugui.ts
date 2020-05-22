export class Vector2 {
    readonly x: number
    readonly y: number

    public static zero: Vector2 = new Vector2(0, 0)

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    toString(): string {
        return "(" + this.x + "," + this.y + ")"
    }
}