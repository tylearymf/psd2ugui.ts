import { ITextureJSONInfo } from './IJSONInfo';
import { BaseNode } from "./BaseNode";
import { BaseLayer } from '../Layer/BaseLayer';
import { ComponentType } from '../ComponentType';

export class TextureNode extends BaseNode {

    imageName: string

    constructor(baseLayer: BaseLayer) {
        super(baseLayer)

        this.nodeType = ComponentType.TEXTURE
        this.hasImage = true
    }

    public isValid(): boolean {
        return true
    }
    protected internal_toJSON(): ITextureJSONInfo {
        return {
            imageName: this.imageName
        }
    }

}