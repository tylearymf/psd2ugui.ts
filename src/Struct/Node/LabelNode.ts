import { BaseNode } from "./BaseNode";
import { ILabelJSONInfo, IJSONInfo, IButtonJSONInfo, ISpriteJSONInfo } from "../Interface/IJSONInfo";
import { BaseLayer } from "../Layer/BaseLayer";
import { ComponentType } from "../EnumType/ComponentType";
import { Vector2 } from "../Unity/Vector2";

export class LabelNode extends BaseNode {

    private textItem: TextItem

    content: string
    color: string = "FFFFFF"
    font: string
    fontSize: number
    outlineColor: string
    outlineSize: Vector2 = Vector2.zero
    alignment: Justification = Justification.CENTER
    direction: Direction = Direction.HORIZONTAL

    constructor(baseLayer: BaseLayer) {
        super(baseLayer)

        this.nodeType = ComponentType.LABEL

        try {
            this.textItem = baseLayer.artLayer.textItem
            this.content = this.textItem.contents
            this.font = this.textItem.font
            this.color = this.textItem.color.rgb.hexValue
            //TODO this.fontSize = ActionDescriptorExtensions.GetTextItemSize()


        } catch (error) {

        }
    }

    protected internal_toJSON(): ILabelJSONInfo {
        return {
            content: this.content,
            color: this.color,
            font: this.font,
            fontSize: this.fontSize,
            outlineColor: this.outlineColor,
            outlineSize: this.outlineSize,
            alignment: this.alignment,
            direction: this.direction,
        }
    }
    

    public static isValid(layer: Layer): boolean {
        return true
    }

}