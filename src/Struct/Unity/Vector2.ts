import { VectorType } from "../VectorType"

export class Vector2 {
    x: number
    y: number

    public static zero: Vector2 = new Vector2(0, 0)

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    toString(): string {
        return "(" + this.x + "," + this.y + ")"
    }

    public static parse(array: string[]): Vector2 {
        var vec = new Vector2(0, 0)
        if (array) {
            let arrayLen = array.length

            for (let i = 0; i < arrayLen; i++) {
                const element = parseInt(array[i]);

                if (arrayLen == 1) {
                    vec.y = vec.x = element
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