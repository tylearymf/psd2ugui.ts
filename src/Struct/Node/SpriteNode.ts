import { BaseNode } from "./BaseNode";
import { IJSONInfo, ISpriteJSONInfo } from "../Interface/IJSONInfo";
import { BaseLayer } from "../Layer/BaseLayer";
import { ComponentType } from "../EnumType/ComponentType";

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