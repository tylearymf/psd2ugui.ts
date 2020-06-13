namespace psd2ugui {
    export class LayerExtensions {

        public static GetLayerInfos(doc: Document, layers: Layers): Array<BaseLayer> {
            let infos: Array<BaseLayer> = new Array<BaseLayer>()

            for (let i = layers.length - 1; i >= 0; i--) {
                const element = layers[i];

                let isContinue = false
                switch (Global.GetInstance().layerExportType) {
                    case LayerExportType.EnableAndTag:
                        isContinue = !element.visible
                        break;
                    case LayerExportType.EnableLayer:
                        isContinue = !element.visible
                        break;
                    default:
                        isContinue = false
                        break;
                }
                if (isContinue) continue;

                switch (element.typename) {
                    case LayerType.ArtLayer:
                        let artLayer = element as ArtLayer
                        let normalLayer = new NormalLayer(doc, artLayer)
                        if (!normalLayer.isValid()) continue;

                        //栅格化图层
                        if (artLayer.kind !== LayerKind.TEXT) {
                            try {
                                artLayer.rasterize(RasterizeType.ENTIRELAYER)
                            } catch (error) {
                            }
                        }

                        infos.push(normalLayer)
                        break;
                    case LayerType.LayerSet:
                        let layerSet = element as LayerSet
                        let layerGroup = new LayerGroup(doc, layerSet)
                        if (!layerGroup.isValid()) continue;

                        infos.push(layerGroup)
                        break;
                }
            }

            return infos
        }
    }
}