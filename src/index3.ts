
export class AAA {
    constructor(b: string, c: number) {
        alert(b + ":" + c)
    }

    bbb(params: string) {
        alert(params)
    }
}

var a = new AAA("1233", 12)
a.bbb("{a:1,b:2}")




class DDD {

}