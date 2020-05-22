import { AAA } from "./index3"
import * as VVV from "./hello"

class BBB extends AAA {
    constructor(b: string, c: number) {
        super(b, c)
    }

    ddd(test: string) {
        alert(test)


        let aba = "123"
        var bbbad = "123455"

    }
}
debugger
var b = new BBB("222", 33)
b.bbb("1")
b.ddd("2")

var anddd: any = `sfaf
ggg
hnjnasd;${b}5t55bbbasdf`

let aba = "123"
var bbbad = "123455"

const basd = "1323523"
function varTest() {
    var x = 1;
    if (true) {
        var x = 2;  // 同样的变量!
        alert(x.toString())
    }
    alert(x.toString())
}

function letTest() {
    let x = 1;
    if (true) {
        let x = 2;  // 不同的变量
        alert(x.toString())
    }
    alert(x.toString())
}

varTest()
letTest()

let a1: Array<BBB> = new Array<BBB>()
a1.push(new BBB("1", 2))
a1.push(new BBB("2", 3))
a1.push(new BBB("3", 4))
a1.push(new BBB("4", 5))

alert(a1.length.toString())

for (let i = 0; i < a1.length; i++) {
    const element = a1[i];
    element.ddd(i.toString())
}

interface ABC {
    name()
    nbb()
    blasf()
}

class CCC implements ABC {
    name() {
        // throw new Error("Method not implemented.")
    }
    nbb() {
        throw new Error("Method not implemented.")
    }
    blasf() {
        throw new Error("Method not implemented.")
    }
}

let c: CCC = new CCC()
c.name()
// debugger
alert(app.version)

var a = new VVV.tsTest.hello()
a.sayHello("123")