namespace psd2ugui {
    declare var Error

    /**
     * 普通弹窗
     *
     * @export
     * @param {string} msg
     */
    export function ShowMsg(msg: string) {
        if (Global.showDialog)
            alert(msg)
    }

    /**
     * 警告弹窗
     *
     * @export
     * @param {string} msg
     */
    export function ShowWarn(msg: string) {
        alert(msg)
    }

    /**
     * 错误弹窗
     *
     * @export
     * @param {string} msg
     */
    export function ShowError(msg: string) {
        alert(msg)
        throw new Error(msg, "customException", 0)
    }

    /**
     * RGB转Hex扩展
     *
     * @export
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @param {number} a
     * @returns {string}
     */
    export function RGBToHex(r: number, g: number, b: number, a: number): string {
        let toHex = function (rgb) {
            var hex = Number(rgb).toString(16)
            if (hex.length < 2) {
                hex = "0" + hex
            }
            return hex
        }

        var red = toHex(r)
        var green = toHex(g)
        var blue = toHex(b)
        var alpha = "FF"

        if (a) {
            alpha = toHex(a)
        }

        return red + green + blue + alpha
    }

    /**
     * 去除Unity里面的一些不支持的特殊符号
     *
     * @export
     * @param {string} str
     * @returns {string}
     */
    export function RemoveUnityNotSupportSymbol(str: string): string {
        str = str.replace(/[\/\?\<\>\\\:\*\|\s\.]/g, "_")
        return str
    }
}