import { VectorType } from "../EnumType/VectorType"

export class Vector2 {

    public static zero: Vector2 = new Vector2(0, 0)

    constructor(public x: number, public y: number) {
        this.x = x
        this.y = y
    }

    toString(): string {
        return "(" + this.x + "," + this.y + ")"
    }

    public static parse(array: string[]): Vector2 {
        let vec = new Vector2(0, 0)
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