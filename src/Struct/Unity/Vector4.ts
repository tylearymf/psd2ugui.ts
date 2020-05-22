import { Vector3 } from "./Vector3"

export class Vector4 extends Vector3 {
    readonly w: number

    public static zero: Vector4 = new Vector4(0, 0, 0, 0)

    constructor(x: number, y: number, z: number, w: number) {
        super(x, y, z)

        this.w = w
    }

    public static parse(array: string[]): Vector4 {
        var val = new Vector4(0, 0, 0, 0)
        if (array) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
            }
        }

        return val
    }

    public toString(): string {
        return "(" + this.x + "," + this.y + "," + this.z + "," + this.w + ")"
    }
}