namespace psd2ugui {
    export class NodeFactory {

        public static GetInstanceByType(baseLayer: BaseLayer) {
            var nodeType = baseLayer.nodeType
            Global.GetInstance().mainDoc.activeLayer = baseLayer.layer

            let node: BaseNode = null
            switch (nodeType) {
                case ComponentType.LABEL:
                    node = new LabelNode(baseLayer)
                    break;
                case ComponentType.SPRITE:
                    node = new SpriteNode(baseLayer)
                    break;
                case ComponentType.SLICE:
                    node = new SliceNode(baseLayer)
                    break;
                case ComponentType.TEXTURE:
                    node = new TextureNode(baseLayer)
                    break;
                case ComponentType.BUTTON:
                    node = new ButtonNode(baseLayer)
                    break;
                case ComponentType.PANEL:
                    node = new PanelNode(baseLayer)
                    break;
                case ComponentType.WINDOW:
                    node = new WindowNode(baseLayer)
                    break;
                default:
                    throw new Error(`NodeFactory.GetInstanceByType(). 没有实现该节点类型：: ${nodeType}`);
                    break;
            }

            return node
        }

    }
}