namespace psd2ugui {
    export class Global {

        /**
         * 是否弹窗
         *
         * @static
         * @type {boolean}
         * @memberof Global
         */
        public static showDialog: boolean = true

        /**
         * 图层导出类型
         *
         * @static
         * @type {LayerExportType}
         * @memberof Global
         */
        public static layerExportType: LayerExportType = LayerExportType.EnableAndTag

        /**
         * 精灵最大尺寸，如果超出该尺寸则自动切换为大图
         * 必须在未指定图层类型的时候才有效
         * 
         * @static
         * @type {Vector2}
         * @memberof Global
         */
        public static spriteMaxSize: Vector2 = new Vector2(512, 512)

        /**
         * 游戏屏幕尺寸
         *
         * @static
         * @type {Vector2}
         * @memberof Global
         */
        public static gameScreenSize: Vector2 = new Vector2(1920, 1080)

        /**
         * 中心枢轴类型
         *
         * @static
         * @type {PivotType}
         * @memberof Global
         */
        public static pivotType: PivotType = PivotType.Center

        /**
         * 是否自适应
         *
         * @static
         * @type {boolean}
         * @memberof Global
         */
        public static enableFit: boolean = false

        /**
         * 模块名
         *
         * @static
         * @type {string}
         * @memberof Global
         */
        public static moduleName: string

        /**
         * 主文档
         *
         * @static
         * @type {Document}
         * @memberof Global
         */
        public static mainDoc: Document

        /**
         * 导出图片后缀索引
         *
         * @static
         * @type {number}
         * @memberof Global
         */
        public static imageSuffixIndex: number

        /**
         * 公共文件夹名称
         *
         * @static
         * @type {string}
         * @memberof Global
         */
        public static common_FolderName: string = "Common"

        /**
         * 公共资源前缀名称
         *
         * @static
         * @type {string}
         * @memberof Global
         */
        public static common_PrefixName: string = "common_"

    }
}