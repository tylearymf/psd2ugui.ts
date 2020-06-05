namespace psd2ugui {
    export class Vector2 implements IStringIndexer {

        public static zero: Vector2 = new Vector2(0, 0)

        constructor(public x: number, public y: number) {
            this.x = x
            this.y = y
        }

        [key: string]: any

        toString(): string {
            return "(" + this.x + "," + this.y + ")"
        }

        public static parse(array: string[]): Vector2 {
            let vec = new Vector2(0, 0)
            let arrayLen = array ? array.length : 0
            if (arrayLen > 0) {
                const length: number = 2
                for (let i = 0; i < length; i++) {
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
}