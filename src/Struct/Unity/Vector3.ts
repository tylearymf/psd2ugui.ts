class Vector3 extends Vector2 {
    readonly z: number

    constructor(x: number, y: number, z: number) {
        super(x, y)

        this.z = z
    }

    toString(): string {
        return "(" + this.x + "," + this.y + "," + this.z + ")"
    }
}