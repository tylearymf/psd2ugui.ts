namespace psd2ugui {
    export class TextureNode extends BaseNode {

        imageName: string

        constructor(baseLayer: BaseLayer) {
            super(baseLayer)

            this.nodeType = ComponentType.TEXTURE
            this.hasImage = true
        }

        protected internal_toJSON(): ITextureJSONInfo {
            return {
                imageName: this.imageName
            }
        }


        public static isValid(layer: Layer): boolean {
            return true
        }
    }
}