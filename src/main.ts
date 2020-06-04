namespace psd2ugui {

    export function main() {
        let a = new Vector2(1, 2)
        // let b = new Vector3(3, 4, 5)
        // let c = new Vector4(6, 7, 8, 9)

        // alert(`a:${a} b:${b} c:${c}`)

        alert(`app.version: ${app.version}`)

        //  a = <any>false
        a = <any>true
        let d = a ? 1 : "34"

        alert(`d:${d}`)

        alert(JSON.stringify(a))
        // alert(`BaseNode:${typeof (BaseNode)}`)
    }
}