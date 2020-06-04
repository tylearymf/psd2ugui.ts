namespace psd2ugui {
    export class NormalLayer extends BaseLayer {
        constructor(doc: Document, public readonly artlayer: ArtLayer) {
            super(doc, artlayer)
        }


        public toJSON(): IArtLayerInfo {
            let layerTypeName: string | undefined = this.layerType?.toString()
            if (layerTypeName == undefined) layerTypeName = ''

            let nodeTypeName: string | undefined = this.nodeType?.toString()
            if (nodeTypeName == undefined) nodeTypeName = ''

            return {
                name: this.nodeName,
                layerTypeName: layerTypeName,
                nodeTypeName: nodeTypeName,
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