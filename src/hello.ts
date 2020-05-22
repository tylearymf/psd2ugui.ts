export namespace tsTest {
    export class hello {
        public sayHello(person: string) {
            return 'Hello, ' + person;
        }
    }

    let h = new hello();
    let user = 'Hello hoijoifds';
    debugger
    alert(h.sayHello(user));


    // // 源码中
    // function testPromise() {
    //     return new Promise((resolve, reject) => {
    //         resolve(12313)
    //     })
    // }
    // testPromise().then(res => {
    //     alert(res)
    // })
}