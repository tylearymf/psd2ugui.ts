namespace psd2ugui {
    interface IConfigData {
        /**
         * PSD路径
         */
        psdPath: string
        /**
         * PSD尺寸大小
         */
        psdSize: Vector2
        /**
         * 游戏画面大小
         */
        gameScreenSize: Vector2
        /**
         * 模块名
         */
        moduleName: string
        /**
         * 是否开启适配
         */
        enableFit: boolean
        /**
         * 相同图片是否只导出一张
         */
        onlyOneImage: boolean
        /**
         * 中心枢轴类型
         */
        pivotType: PivotType
        /**
         * 导出类型
         */
        layerExportType: LayerExportType
    }

    export class Config {

        private pivot: Vector2

        constructor(public readonly doc: Document, public readonly info: IConfigData, public readonly layers: Array<BaseLayer>) {
            let pivotType = this.info.pivotType

            switch (pivotType) {
                case PivotType.TopLeft:
                    this.pivot = new Vector2(0, 1)
                    break;
                case PivotType.Top:
                    this.pivot = new Vector2(0.5, 1)
                    break;
                case PivotType.TopRight:
                    this.pivot = new Vector2(1, 1)
                    break;
                case PivotType.Left:
                    this.pivot = new Vector2(0, 0.5)
                    break;
                case PivotType.Center:
                    this.pivot = new Vector2(0.5, 0.5)
                    break;
                case PivotType.Right:
                    this.pivot = new Vector2(1, 0.5)
                    break;
                case PivotType.BottomLeft:
                    this.pivot = new Vector2(0, 0)
                    break;
                case PivotType.Bottom:
                    this.pivot = new Vector2(0.5, 0)
                    break;
                case PivotType.BottomRight:
                    this.pivot = new Vector2(1, 0)
                    break;
                default:
                    this.pivot = Vector2.zero
                    break;
            }
        }

        public getPivotValue(): Vector2 {
            return this.pivot
        }

        public toJSON(): IConfigJSONInfo {
            return {
                name: this.info.moduleName,
                size: this.info.psdSize,
                pivot: this.pivot,
                layers: this.layers
            }
        }
    }
}