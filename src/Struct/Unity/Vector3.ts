namespace psd2ugui {
    export class Vector3 extends Vector2 {

        public static zero: Vector3 = new Vector3(0, 0, 0)

        constructor(x: number, y: number, public z: number) {
            super(x, y)

            this.z = z
        }

        toString(): string {
            return "(" + this.x + "," + this.y + "," + this.z + ")"
        }

        public static parse(array: string[]): Vector3 {
            let vec = new Vector3(0, 0, 0)
            let arrayLen = array ? array.length : 0
            if (arrayLen > 0) {
                const length: number = 3
                for (let i = 0; i < length; i++) {
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
}