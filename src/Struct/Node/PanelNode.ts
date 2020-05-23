import { IPanelJSONInfo } from './IJSONInfo';
import { BaseNode } from "./BaseNode";
import { BaseLayer } from '../Layer/BaseLayer';
import { ComponentType } from '../ComponentType';

export class PanelNode extends BaseNode {

    constructor(baseLayer: BaseLayer) {
        super(baseLayer)

        this.nodeType = ComponentType.PANEL
    }

    public isValid(): boolean {
        return true
    }
    protected internal_toJSON(): IPanelJSONInfo {
        return {

        }
    }
}