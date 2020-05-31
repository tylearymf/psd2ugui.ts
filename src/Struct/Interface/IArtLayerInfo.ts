namespace psd2ugui {
    export interface IArtLayerInfo {
        name: string
        layerTypeName: string
        nodeTypeName: string
        nodeArgs: string[]
        pos: Vector2
        size: Vector2
        opacity: number
        info: BaseNode
    }
}