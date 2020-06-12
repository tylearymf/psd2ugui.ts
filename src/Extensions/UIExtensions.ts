namespace psd2ugui {
    interface IKeyValue {
        [index: string]: string
    }

    export class UIExtensions {
        public static AddGroup(win: Window, text: string, callback: any) {
            let group = win.add("group")
            let stext = group.add("statictext")
            stext.alignment = ["fill", "center"]
            stext.text = text
            callback(group)
        }

        public static AddDropDownList = function (group: Group, type: IKeyValue, defaultValue: string, callback: any) {
            let drop = group.add("dropdownlist")
            for (let key in type) {
                drop.add("item", type[key])
            }
            let item = drop.find(defaultValue)
            if (item) item.selected = true
            drop.onChange = function () {
                callback(drop)
            }
        }
    }
}