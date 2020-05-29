import { WindowNode } from './../Struct/Node/WindowNode';
import { PanelNode } from './../Struct/Node/PanelNode';
import { ButtonNode } from './../Struct/Node/ButtonNode';
import { TextureNode } from './../Struct/Node/TextureNode';
import { SliceNode } from './../Struct/Node/SliceNode';
import { SpriteNode } from './../Struct/Node/SpriteNode';
import { LabelNode } from './../Struct/Node/LabelNode';
import { ComponentType } from './../Struct/EnumType/ComponentType';
import { Global } from './../Global';
import { BaseLayer } from './../Struct/Layer/BaseLayer';
import { BaseNode } from '../Struct/Node/BaseNode';

export class NodeFactory {

    public static GetInstanceByType(baseLayer: BaseLayer) {
        var nodeType = baseLayer.nodeType
        Global.mainDoc.activeLayer = baseLayer.layer

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