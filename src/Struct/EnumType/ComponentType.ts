namespace psd2ugui {
    /**
     * 组件类型
     *
     * @export
     * @enum {number}
     */
    export enum ComponentType {
        //文本
        LABEL = "lab",
        //精灵、小图
        SPRITE = "img",
        //大图
        TEXTURE = "rimg",
        //按钮
        BUTTON = "btn",
        //面板
        PANEL = "pnl",
        //窗口
        WINDOW = "wnd",
        //九宫格
        SLICE = "9s"
    }
}