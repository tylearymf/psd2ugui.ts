namespace psd2ugui {
    export class FileConfig {
        private name: string
        private extension: string
        private folderName: string
        private config: Config
        private moduleName: string
        private path: string

        constructor(config: Config) {
            this.name = "Config"
            this.extension = ".JSON"
            this.folderName = "Configs"
            this.config = config
            this.path = config.data.psdPath
            this.moduleName = RemoveUnityNotSupportSymbol(config.data.moduleName)
        }
        /**
         * 获取导出根目录的路径
         *
         * @returns {string}
         * @memberof FileConfig
         */
        public getRootPath(): string {
            var path = `${this.path}/Export_${this.moduleName}`
            var folder = new Folder(path)
            if (!folder.exists) folder.create()

            return path
        }

        /**
         * 获取模块信息的导出路径
         *
         * @returns {string}
         * @memberof FileConfig
         */
        public getWindowPath(): string {
            var path = `${this.getRootPath()}/${this.moduleName}`
            var folder = new Folder(path)
            if (!folder.exists) folder.create()

            return path
        }

        /**
         * 获取公共图集的导出路径
         *
         * @returns {string}
         * @memberof FileConfig
         */
        public getCommonPath(): string {
            var path = `${this.getRootPath()}/Common`
            var folder = new Folder(path)
            if (!folder.exists) folder.create()

            return path
        }

        /**
         * getConfigFolderPath
         *
         * @returns {string}
         * @memberof FileConfig
         */
        public getConfigFolderPath(): string {
            var path = `${this.getWindowPath()}/${this.folderName}`
            var folder = new Folder(path)
            if (!folder.exists) folder.create()

            return path
        }

        /**
         * 获取配置文件的路径
         *
         * @returns {string}
         * @memberof FileConfig
         */
        public getConfigFullName(): string {
            var windowName = Global.GetInstance().firstWindowName
            if (windowName == "") {
                windowName = Global.GetInstance().firstPanelName
            }
            if (windowName != "") {
                windowName = "_" + windowName
            }

            return `${this.getConfigFolderPath()}/${this.name}${windowName}${this.extension}`
        }

        public save() {
            if (this.path == "" || !this.config) {
                ShowError("配置出错，不能保存")
            }

            var file = new File(this.getConfigFullName())
            file.encoding = "UTF8"
            file.lineFeed = "Windows"
            file.readonly = true
            file.open("w")
            var str = JSON.stringify(this.config)
            ShowMsg(str)
            file.writeln(str)
            file.close()
        }

        public showInExplorer() {
            var folder = new Folder(this.getRootPath())
            folder.execute()
        }
    }
}