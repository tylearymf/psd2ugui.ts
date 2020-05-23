import { Vector4 } from './../Unity/Vector4';
import { ISliceJSONInfo } from './IJSONInfo';
import { BaseNode } from "./BaseNode";
import { BaseLayer } from '../Layer/BaseLayer';
import { ComponentType } from '../ComponentType';

export class SliceNode extends BaseNode {

    border: Vector4 = Vector4.zero

    constructor(baseLayer: BaseLayer) {
        super(baseLayer)

        this.nodeType = ComponentType.SLICE
        this.hasImage = true

        let nodeArgs = baseLayer.nodeArgs
        this.border = Vector4.parse(nodeArgs)
    }

    public sliceSprite(tempDoc: Document, tempLayer: ArtLayer): void {
        //获取裁剪信息
        let size = this.baseLayer.getSize()
        let left = this.border.x
        let top = this.border.y
        let right = this.border.z
        let bottom = this.border.w

        if (left < 0 || right < 0 || bottom < 0 || top < 0) {
            //TODO ShowError
            // ShowError("九宫格信息错误！有效裁剪区域小于0")
        }

        if ((left + right) > size.x || (top + bottom) > size.y) {
            //TODO ShowError
            // ShowError("九宫格信息错误！裁剪区域大于图片尺寸")
        }

        try {
            //复制四份图层
            let leftTopPartDoc = tempDoc.duplicate("leftTopPart", true)
            let leftTopLayer = null

            let rightTopPartDoc = tempDoc.duplicate("rightTopPart", true)
            let rightTopLayer = null

            let leftBottomPartDoc = tempDoc.duplicate("leftBottomPart", true)
            let leftBottomLayer = null

            let rightBottomPartDoc = tempDoc.duplicate("rightBottomPart", true)
            let rightBottomLayer = null

            //移除原图层
            app.activeDocument = tempDoc
            tempLayer.remove()

            //开始裁剪
            //crop方法的bounds:left top right bottom，其中四个点都是以左上角为基准点计算的

            //裁剪左上部分
            app.activeDocument = leftTopPartDoc
            leftTopPartDoc.crop([0, 0, left, top])
            let tempLayer2 = leftTopPartDoc.layers[0].duplicate(leftTopPartDoc, ElementPlacement.INSIDE)
            leftTopLayer = tempLayer2.duplicate(tempDoc, ElementPlacement.INSIDE)
            leftTopPartDoc.close(SaveOptions.DONOTSAVECHANGES)

            //裁剪右上部分
            app.activeDocument = rightTopPartDoc
            rightTopPartDoc.crop([size.x - right, 0, size.x, top])
            tempLayer2 = rightTopPartDoc.layers[0].duplicate(rightTopPartDoc, ElementPlacement.INSIDE)
            rightTopLayer = tempLayer2.duplicate(tempDoc, ElementPlacement.INSIDE)
            rightTopPartDoc.close(SaveOptions.DONOTSAVECHANGES)

            //裁剪左下部分
            app.activeDocument = leftBottomPartDoc
            leftBottomPartDoc.crop([0, size.y - bottom, left, size.y])
            tempLayer2 = leftBottomPartDoc.layers[0].duplicate(leftBottomPartDoc, ElementPlacement.INSIDE)
            leftBottomLayer = tempLayer2.duplicate(tempDoc, ElementPlacement.INSIDE)
            leftBottomPartDoc.close(SaveOptions.DONOTSAVECHANGES)

            //裁剪右下部分
            app.activeDocument = rightBottomPartDoc
            rightBottomPartDoc.crop([size.x - right, size.y - bottom, size.x, size.y])
            tempLayer2 = rightBottomPartDoc.layers[0].duplicate(rightBottomPartDoc, ElementPlacement.INSIDE)
            rightBottomLayer = tempLayer2.duplicate(tempDoc, ElementPlacement.INSIDE)
            rightBottomPartDoc.close(SaveOptions.DONOTSAVECHANGES)

            //调整位置
            app.activeDocument = tempDoc
            let leftTopBounds = leftTopLayer.bounds
            leftTopLayer.translate(-leftTopBounds[0] + 1, -leftTopBounds[1])
            let rightTopBounds = rightTopLayer.bounds
            rightTopLayer.translate(-rightTopBounds[0] + left, -rightTopBounds[1])
            let leftBottomBounds = leftBottomLayer.bounds
            leftBottomLayer.translate(-leftBottomBounds[0] + 1, -leftBottomBounds[1] + top - 1)
            let rightBottomBounds = rightBottomLayer.bounds
            rightBottomLayer.translate(-rightBottomBounds[0] + left, -rightBottomBounds[1] + top - 1)

            //合并为一个图层
            tempDoc.mergeVisibleLayers()
            tempDoc.trim(TrimType.TRANSPARENT)
        } catch (error) {
            //TODO ShowError
            // ShowError("导出九宫格图片错误！" + error.toString())
        }
    }

    public isValid(): boolean {
        return true
    }
    protected internal_toJSON(): ISliceJSONInfo {
        return {

        }
    }

}