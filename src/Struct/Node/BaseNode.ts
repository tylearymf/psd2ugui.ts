import { BaseLayer } from "../Layer/BaseLayer"
import { AnchorType } from "../Unity/AnchorType"
import { SymbolType } from "../Unity/SymbolType"

export abstract class BaseNode {
    protected readonly baseLayer: BaseLayer
    protected typeName: string


    constructor(baseLayer: BaseLayer) {

    }

    public getAnchorType(): AnchorType {
        return this.baseLayer ? this.baseLayer.anchorType : AnchorType.CENTER
    }

    public getSymbolType(): SymbolType {
        return this.baseLayer ? this.baseLayer.symbolType : SymbolType.Symbol1
    }

    abstract toJSON(): any
    abstract isValid(): boolean
}