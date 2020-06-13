namespace psd2ugui {
    export class WindowNode extends BaseNode {

        constructor(baseLayer: BaseLayer) {
            super(baseLayer)

            this.nodeType = ComponentType.WINDOW

            if (Global.GetInstance().firstWindowName == "") {
                Global.GetInstance().firstWindowName = baseLayer.nodeName
            }
        }

        protected internal_toJSON(): IWindowJSONInfo {
            return {

            }
        }


        public static isValid(layer: Layer): boolean {
            return true
        }
    }
}