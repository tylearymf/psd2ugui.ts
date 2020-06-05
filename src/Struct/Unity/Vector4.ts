namespace psd2ugui {
    export class Vector4 extends Vector3 {

        public static zero: Vector4 = new Vector4(0, 0, 0, 0)

        constructor(x: number, y: number, z: number, public w: number) {
            super(x, y, z)

            this.w = w
        }

        public toString(): string {
            return "(" + this.x + "," + this.y + "," + this.z + "," + this.w + ")"
        }

        public static parseBound(array: UnitRect): Vector4 {
            let vec = Vector4.zero
            if (array) {
                let arrayLen = array.length

                for (let i = 0; i < arrayLen; i++) {
                    const element = array[i]
                    vec[VectorType[i]] = element
                }
                vec.z = vec.z - vec.x
                vec.w = vec.w - vec.y
            }
            return vec
        }

        public static parse(array: string[]): Vector4 {
            let vec = Vector4.zero
            let arrayLen = array ? array.length : 0
            if (arrayLen > 0) {
                const length: number = 4
                for (let i = 0; i < length; i++) {
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
}