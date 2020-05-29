import { BaseLayer } from "../Layer/BaseLayer"
import { AnchorType } from "../EnumType/AnchorType"
import { SymbolType } from "../EnumType/SymbolType"
import { ComponentType } from "../EnumType/ComponentType"
import { IJSONInfo } from "../Interface/IJSONInfo"

export abstract class BaseNode {
    protected nodeType: ComponentType
    protected anchorType: AnchorType
    protected symbolType: SymbolType

    public hasImage: boolean = false
    public imageName: string
    protected is9Slice: boolean = false
    protected isCommon: boolean = false

    constructor(protected readonly baseLayer: BaseLayer) {
        this.anchorType = baseLayer.anchorType
        this.symbolType = baseLayer.symbolType
    }

    public toJSON(): IJSONInfo {
        let json: IJSONInfo = this.internal_toJSON()

        json.nodeType = this.nodeType
        json.anchorType = this.anchorType
        json.symbolType = this.symbolType
        json.isCommon = this.isCommon

        return json
    }

    protected abstract internal_toJSON(): IJSONInfo
}