namespace psd2ugui {
    export class NormalLayer extends BaseLayer {

        constructor(doc: Document, public readonly artlayer: ArtLayer) {
            super(doc, artlayer)
        }


        public toJSON(): IArtLayerInfo {
            let layerTypeName: string | undefined = this.layerType?.toString()
            if (layerTypeName == undefined) layerTypeName = ''

            let nodeTypeName: string | undefined = this.nodeType?.toString()
            if (nodeTypeName == undefined) nodeTypeName = ''

            return {
                name: this.nodeName,
                layerTypeName: layerTypeName,
                nodeTypeName: nodeTypeName,
                nodeArgs: this.nodeArgs,
                pos: this.getUnityPos(),
                size: this.getUnitySize(),
                opacity: this.opacity,
                info: this.baseNode
            }
        }

        public export(): void {
            var folderFullName = Global.GetInstance().fileConfig.getWindowPath()
            //如果是公共图片，则修改导出路径
            if (this.isCommon) {
                folderFullName = Global.GetInstance().fileConfig.getCommonPath()
            }

            ShowMsg("export:" + folderFullName + "\n" + this.toString())

            //更新进度条
            updateProgressBar()

            //获取图片大小
            var size = this.getSize()
            //获取图片导出名
            var exportName = this.getExportName()

            if (Global.GetInstance().sameNameNoExport) {
                //重复图片名不导出
                if (Global.GetInstance().exportNameDic[exportName] == true) return
            }

            //不是图片的或者是空图层的不导出
            if (!this.baseNode.hasImage || size.x == 0 || size.y == 0) return

            //这里name如果是包含:的话，会导致ps报错，所以直接给定个字符串
            var tempDoc = app.documents.add(Math.max(size.x, 2), Math.max(size.y, 2), this.doc.resolution, "temp", NewDocumentMode.RGB, DocumentFill.TRANSPARENT)
            app.activeDocument = this.doc
            var tempLayer = this.layer.duplicate(tempDoc, ElementPlacement.INSIDE)
            var pos = this.getPos()
            app.activeDocument = tempDoc

            var isLock = tempLayer.allLocked
            tempLayer.allLocked = false
            tempLayer.translate(-pos.x, -pos.y)
            tempLayer.allLocked = isLock

            //是否为九宫格切图
            if (this.baseNode instanceof SliceNode) {
                this.baseNode.sliceSprite(tempDoc, tempLayer as ArtLayer)
            }

            //如果开启了相同图片检测
            if (Global.GetInstance().config.data.onlyOneImage) {
                var exportObj = ImageExtensions.GetSameImageExportName(app.activeDocument, this.baseNode)
                var canExport = exportObj.canExport
                exportName = exportObj.exportName
                if (!canExport) {
                    ShowMsg("之前已经导出过相同图片了，不需要再导出了")
                    this.baseNode.imageName = exportName
                    tempDoc.close(SaveOptions.DONOTSAVECHANGES)
                    return
                }
            }

            if (Global.GetInstance().sameNameNoExport) {
                //记录导出图片名
                Global.GetInstance().exportNameDic[exportName] = true
            }

            //建立子文件夹
            var subFolderName = this.baseNode.nodeType == ComponentType.TEXTURE ? "Textures" : "Sprites"
            var subFolder = new Folder(`${folderFullName}/${subFolderName}`)
            if (!subFolder.exists) subFolder.create()

            //导出图片并关闭文档
            var file = new File(`${folderFullName}/${subFolderName}/${exportName}.png`)

            //智能图层时特殊处理
            if (this.artlayer && this.artLayer.kind == LayerKind.SMARTOBJECT) {
                var idnewPlacedLayer = app.stringIDToTypeID("newPlacedLayer")
                app.executeAction(idnewPlacedLayer, undefined, DialogModes.NO)
                var idplacedLayerEditContents = app.stringIDToTypeID("placedLayerEditContents")
                var desc200 = new ActionDescriptor()
                app.executeAction(idplacedLayerEditContents, desc200, DialogModes.NO)

                var pngOption = new PNGSaveOptions()
                pngOption.compression = 9
                pngOption.interlaced = false
                app.activeDocument.saveAs(file, pngOption, true, Extension.UPPERCASE)
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES)
                tempDoc.close(SaveOptions.DONOTSAVECHANGES)
            }
            else if (Global.GetInstance().exportImagePlan == 1) {
                var webOption = new ExportOptionsSaveForWeb()
                webOption.format = SaveDocumentType.PNG
                webOption.PNG8 = false
                tempDoc.exportDocument(file, ExportType.SAVEFORWEB, webOption)
                tempDoc.close(SaveOptions.DONOTSAVECHANGES)
            }
            else if (Global.GetInstance().exportImagePlan == 2) {
                var pngOption = new PNGSaveOptions()
                pngOption.compression = 9
                pngOption.interlaced = false
                tempDoc.saveAs(file, pngOption, true, Extension.UPPERCASE)
                tempDoc.close(SaveOptions.DONOTSAVECHANGES)
            }
            else {
                ShowError("该导出方案未实现！")
            }
        }
    }
}