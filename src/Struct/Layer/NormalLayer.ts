namespace psd2ugui {
    export class NormalLayer extends BaseLayer {
        constructor(doc: Document, public readonly artlayer: ArtLayer) {
            super(doc, artlayer)
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

        public export(folderFullName: string): void {
            //TODO artLayer export
        }

    }
}