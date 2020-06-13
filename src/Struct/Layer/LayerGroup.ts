namespace psd2ugui {
    export class LayerGroup extends BaseLayer {

        layers: Array<BaseLayer>

        constructor(doc: Document, public readonly layerSet: LayerSet) {
            super(doc, layerSet)

            if (this.isValid()) {
                this.layers = LayerExtensions.GetLayerInfos(doc, layerSet.layers)
            }
        }

        public toJSON() {

        }

        public export(): void {
            for (let i = 0; i < this.layers.length; i++) {
                const element = this.layers[i];
                element.export()
            }
        }
    }
}