import { IPanelJSONInfo } from '../Interface/IJSONInfo';
import { BaseNode } from "./BaseNode";
import { BaseLayer } from '../Layer/BaseLayer';
import { ComponentType } from '../EnumType/ComponentType';

export class PanelNode extends BaseNode {

    constructor(baseLayer: BaseLayer) {
        super(baseLayer)

        this.nodeType = ComponentType.PANEL
    }

    protected internal_toJSON(): IPanelJSONInfo {
        return {

        }
    }
    
    
    public static isValid(layer: Layer): boolean {
        return true
    }
}