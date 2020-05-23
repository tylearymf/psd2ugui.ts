import "types-for-adobe/Photoshop/2015.5/index"
import { SymbolType } from "../Unity/SymbolType"
import { AnchorType } from "../Unity/AnchorType"
import { Vector2 } from "../Unity/Vector2"
import { Vector3 } from "../Unity/Vector3"
import { Vector4 } from "../Unity/Vector4"
import { LayerType } from './LayerType'

export abstract class BaseLayer {
    public readonly doc: Document
    public readonly layer: Layer
    public readonly artLayer: ArtLayer
    public readonly layerSet: LayerSet

    public fullName: string
    public bounds: Bounds
    public layerType: LayerType
    public visible: boolean
    public opacity: number
    public nodeName: string
    public nodeTypeName: string
    public nodeArgs: string[]
    public firstName: string
    public secondName: string
    public isCommon: boolean
    public symbolType: SymbolType
    public anchorType: AnchorType

    protected scale_x: number
    protected scale_y: number

    constructor(doc: Document, layer: Layer) {
        this.doc = doc
        this.layer = layer

        this.artLayer = layer as ArtLayer
        this.layerSet = layer as LayerSet

    }

    abstract isValid(): boolean
    abstract getPos(): Vector2
    abstract getSize(): Vector2
    abstract getUnityPos(): Vector2
    abstract getUnitySize(): Vector2
    abstract getExportName(): string
}