namespace psd2ugui {
    export class Global {

        private static s_Instance: Global;
        public static GetInstance(): Global {
            if (this.s_Instance === undefined) {
                this.s_Instance = new Global()
            }

            return this.s_Instance
        }

        private imageSuffixIndex: number = 0

        /**
         * 是否弹窗
         *
         * @static
         * @type {boolean}
         * @memberof Global
         */
        public showDialog: boolean = false

        /**
         * 图层导出类型
         *
         * @static
         * @type {LayerExportType}
         * @memberof Global
         */
        public layerExportType: LayerExportType = LayerExportType.EnableLayer

        /**
         * 精灵最大尺寸，如果超出该尺寸则自动切换为大图
         * 必须在未指定图层类型的时候才有效
         * 
         * @static
         * @type {Vector2}
         * @memberof Global
         */
        public spriteMaxSize: Vector2 = new Vector2(512, 512)

        /**
         * 游戏屏幕尺寸
         *
         * @static
         * @type {Vector2}
         * @memberof Global
         */
        public gameScreenSize: Vector2 = new Vector2(1920, 1080)

        /**
         * 中心枢轴类型
         *
         * @static
         * @type {PivotType}
         * @memberof Global
         */
        public pivotType: PivotType = PivotType.Center

        /**
         * 是否自适应
         *
         * @static
         * @type {boolean}
         * @memberof Global
         */
        public enableFit: boolean = false

        /**
         * 模块名
         *
         * @static
         * @type {string}
         * @memberof Global
         */
        public moduleName: string = ""

        /**
         * PSD 文件路径
         *
         * @type {string}
         * @memberof Global
         */
        public psdPath: string = ""

        /**
         * PSD 尺寸
         *
         * @type {Vector2}
         * @memberof Global
         */
        public psdSize: Vector2

        /**
         * 基于像素点检测，相同图片是否只导出一张
         *
         * @type {boolean}
         * @memberof Global
         */
        public onlyOneImage: boolean = false

        /**
         * 主文档
         *
         * @static
         * @type {Document}
         * @memberof Global
         */
        public mainDoc: Document

        /**
         * 导出图片后缀索引
         *
         * @static
         * @type {number}
         * @memberof Global
         */
        public getImageSuffixIndex(): number {
            this.imageSuffixIndex = this.imageSuffixIndex + 1
            return this.imageSuffixIndex
        }

        /**
         * 公共文件夹名称
         *
         * @static
         * @type {string}
         * @memberof Global
         */
        public common_FolderName: string = "Common"

        /**
         * 公共资源前缀名称
         *
         * @static
         * @type {string}
         * @memberof Global
         */
        public common_PrefixName: string = "common_"

        /**
         * 第一个窗口名
         *
         * @type {string}
         * @memberof Global
         */
        public firstWindowName: string = ""

        /**
         * 第一个面板名
         *
         * @type {string}
         * @memberof Global
         */
        public firstPanelName: string = ""

        /**
         * 基本配置信息
         *
         * @type {Config}
         * @memberof Global
         */
        public config: Config

        /**
         * 文件目录配置信息
         *
         * @type {FileConfig}
         * @memberof Global
         */
        public fileConfig: FileConfig

        /**
         * The current debugging level, which enables or disables the JavaScript debugger.
         * One of 0 (no debugging), 1 (break on runtime errors), or 2 (full debug mode).
         *
         * @param {number} mode
         * @memberof Global
         */
        public setDebugMode(mode: number) {
            $.level = mode
        }

        /**
         * 是否捕获异常
         *
         * @returns {boolean}
         * @memberof Global
         */
        public isTryCatch(): boolean {
            return $.level != 2
        }

        /**
         * 获取一份配置数据
         *
         * @returns {IConfigData}
         * @memberof Global
         */
        public getConfigData(): IConfigData {
            let configData: IConfigData = {
                psdPath: this.psdPath,
                psdSize: this.psdSize,
                pivotType: this.pivotType,
                gameScreenSize: this.gameScreenSize,
                enableFit: this.enableFit,
                onlyOneImage: this.onlyOneImage,
                layerExportType: this.layerExportType,
                moduleName: this.moduleName
            }

            return configData
        }

        /**
         * 同名资源不导出
         *
         * @type {boolean}
         * @memberof Global
         */
        public sameNameNoExport: boolean = true
        public exportNameDic: any = {}

        /**
         * 导出方案
         * 1 为 默认的Web模式导出
         * 2 为 PNG模式导出
         *
         * @type {number}
         * @memberof Global
         */
        public exportImagePlan: number = 1

    }
}