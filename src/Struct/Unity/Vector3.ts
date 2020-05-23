import { Vector2 } from "./Vector2"
import { VectorType } from "../VectorType"

export class Vector3 extends Vector2 {
    z: number

    public static zero: Vector3 = new Vector3(0, 0, 0)

    constructor(x: number, y: number, z: number) {
        super(x, y)

        this.z = z
    }

    toString(): string {
        return "(" + this.x + "," + this.y + "," + this.z + ")"
    }

    public static parse(array: string[]): Vector3 {
        var vec = new Vector3(0, 0, 0)
        if (array) {
            let arrayLen = array.length

            for (let i = 0; i < arrayLen; i++) {
                const element = parseInt(array[i]);

                if (arrayLen == 1) {
                    vec.z = vec.y = vec.x = element
                    break;
                }
                else {
                    vec[VectorType[i]] = element
                }
            }
        }

        return vec
    }
}