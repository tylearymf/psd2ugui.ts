namespace psd2ugui {
    export class LayerGroup extends BaseLayer {

        layers: Array<NormalLayer>

        constructor(doc: Document, public readonly layerSet: LayerSet) {
            super(doc, layerSet)

            if (this.isValid()) {
                //TODO
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