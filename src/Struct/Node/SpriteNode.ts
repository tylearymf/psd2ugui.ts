namespace psd2ugui {
    export class SpriteNode extends BaseNode {

        imageName: string

        constructor(baseLayer: BaseLayer) {
            super(baseLayer)

            this.nodeType = ComponentType.SPRITE
            this.hasImage = true
            this.imageName = baseLayer.getExportName()
        }

        protected internal_toJSON(): ISpriteJSONInfo {
            return {
                imageName: this.imageName
            }
        }

        public static isValid(layer: Layer): boolean {
            return true
        }
    }
}