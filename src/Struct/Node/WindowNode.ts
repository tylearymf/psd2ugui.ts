import { IWindowJSONInfo } from './IJSONInfo';
import { BaseNode } from "./BaseNode";
import { BaseLayer } from '../Layer/BaseLayer';
import { ComponentType } from '../ComponentType';

export class WindowNode extends BaseNode {

    constructor(baseLayer: BaseLayer) {
        super(baseLayer)

        this.nodeType = ComponentType.WINDOW
    }

    public isValid(): boolean {
        return true
    }
    protected internal_toJSON(): IWindowJSONInfo {
        return {

        }
    }
}