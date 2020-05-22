import { Vector2 } from "./Vector2"

export class Vector3 extends Vector2 {
    readonly z: number

    public static zero: Vector3 = new Vector3(0, 0, 0)

    constructor(x: number, y: number, z: number) {
        super(x, y)

        this.z = z
    }

    toString(): string {
        return "(" + this.x + "," + this.y + "," + this.z + ")"
    }
}