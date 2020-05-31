namespace psd2ugui {
    /**
     *
     *
     * @export
     * @class ButtonNode
     * @extends {BaseNode}
     */
    export class ButtonNode extends BaseNode {

        btnType: ButtonType

        constructor(baseLayer: BaseLayer) {
            super(baseLayer)

            this.nodeType = ComponentType.BUTTON

            //两种模式，
            switch (baseLayer.layerType) {
                //·按钮自身是图片的，
                case LayerType.ArtLayer:
                    this.hasImage = true
                    this.btnType = ButtonType.Self
                    break;
                //·按钮只是容器，图片或者文本在该Layer的子Layer中
                case LayerType.LayerSet:
                    this.hasImage = false
                    this.btnType = ButtonType.Container
                    break;
            }
        }

        protected internal_toJSON(): IButtonJSONInfo {
            return {
                btnType: this.btnType,
                imageName: this.baseLayer.getExportName(),
            }
        }


        public static isValid(layer: Layer): boolean {
            return true
        }
    }
}