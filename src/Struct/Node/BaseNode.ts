import { BaseLayer } from "../Layer/BaseLayer"
import { AnchorType } from "../Unity/AnchorType"
import { SymbolType } from "../Unity/SymbolType"
import { ComponentType } from "../ComponentType"
import { IJSONInfo, IButtonJSONInfo } from "./IJSONInfo"

export abstract class BaseNode {
    protected readonly baseLayer: BaseLayer

    protected nodeType: ComponentType
    protected anchorType: AnchorType
    protected symbolType: SymbolType

    protected hasImage: boolean = false
    protected is9Slice: boolean = false
    protected isCommon: boolean = false

    constructor(baseLayer: BaseLayer) {
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

    public abstract isValid(): boolean
    protected abstract internal_toJSON(): IJSONInfo
}