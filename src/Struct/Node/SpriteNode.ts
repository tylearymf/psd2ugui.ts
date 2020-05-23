import { BaseNode } from "./BaseNode";
import { IJSONInfo, ISpriteJSONInfo } from "./IJSONInfo";
import { BaseLayer } from "../Layer/BaseLayer";
import { ComponentType } from "../ComponentType";

export class SpriteNode extends BaseNode {

    imageName: string

    constructor(baseLayer: BaseLayer) {
        super(baseLayer)

        this.nodeType = ComponentType.SPRITE
        this.hasImage = true
        this.imageName = baseLayer.getExportName()
    }

    public isValid(): boolean {
        return true
    }
    protected internal_toJSON(): ISpriteJSONInfo {
        return {
            imageName: this.imageName
        }
    }
}