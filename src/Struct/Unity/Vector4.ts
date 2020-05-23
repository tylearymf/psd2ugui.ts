import { VectorType } from './../VectorType';
import { Vector3 } from "./Vector3"

export class Vector4 extends Vector3 {

    w: number

    public static zero: Vector4 = new Vector4(0, 0, 0, 0)

    constructor(x: number, y: number, z: number, w: number) {
        super(x, y, z)

        this.w = w
    }

    public toString(): string {
        return "(" + this.x + "," + this.y + "," + this.z + "," + this.w + ")"
    }

    public static parse(array: string[]): Vector4 {
        var vec = new Vector4(0, 0, 0, 0)
        if (array) {
            let arrayLen = array.length

            for (let i = 0; i < arrayLen; i++) {
                const element = parseInt(array[i]);

                if (arrayLen == 1) {
                    vec.w = vec.z = vec.y = vec.x = element
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