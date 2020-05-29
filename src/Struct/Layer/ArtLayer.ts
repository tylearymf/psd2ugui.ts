import { IArtLayerInfo } from '../EnumType/IArtLayerInfo';
import { BaseLayer } from "./BaseLayer";

export class ArtLayer extends BaseLayer {
    constructor(public readonly doc: Document, public readonly layer: Layer) {
        super(doc, layer)
    }

    public toJSON(): IArtLayerInfo {
        return {
            name: this.nodeName,
            layerTypeName: this.layerType.toString(),
            nodeTypeName: this.nodeType.toString(),
            nodeArgs: this.nodeArgs,
            pos: this.getUnityPos(),
            size: this.getUnitySize(),
            opacity: this.opacity,
            info: this.baseNode
        }
    }

    public export(): void {
        //TODO artLayer export
    }

}