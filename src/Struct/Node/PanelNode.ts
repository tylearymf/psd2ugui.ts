namespace psd2ugui {
    export class PanelNode extends BaseNode {

        constructor(baseLayer: BaseLayer) {
            super(baseLayer)

            this.nodeType = ComponentType.PANEL
        }

        protected internal_toJSON(): IPanelJSONInfo {
            return {

            }
        }


        public static isValid(layer: Layer): boolean {
            return true
        }
    }
}