namespace psd2ugui {
    export interface IJSONInfo {
        nodeType?: string,
        anchorType?: string,
        symbolType?: string,
        isCommon?: boolean
    }

    export interface IImageJSONInfo extends IJSONInfo {
        imageName: string
    }

    export interface ISpriteJSONInfo extends IImageJSONInfo {
    }

    export interface ITextureJSONInfo extends IImageJSONInfo {
    }

    export interface IButtonJSONInfo extends IJSONInfo, ISpriteJSONInfo {
        btnType: ButtonType,
    }

    export interface ILabelJSONInfo extends IJSONInfo {
        content: string,
        font: string,
        fontSize: number,
        color: string,
        outlineColor: string,
        outlineSize: Vector2,
        alignment: Justification,
        direction: Direction,
    }

    export interface IPanelJSONInfo extends IJSONInfo {

    }

    export interface ISliceJSONInfo extends IJSONInfo {

    }

    export interface IWindowJSONInfo extends IJSONInfo {

    }

    export interface IConfigJSONInfo {
        name: string,
        size: Vector2,
        pivot: Vector2,
        layers: Array<BaseLayer>
    }
}