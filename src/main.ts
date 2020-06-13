//software: https://helpx.adobe.com/download-install/kb/creative-cloud-apps-download.html
//json: https://github.com/tylearymf/Json-js/blob/master/json2.js
//api1: https://www.adobe.com/devnet/photoshop/scripting.html ☆☆☆☆☆☆
//api2: https://www.indesignjs.de/extendscriptAPI/indesign10/ ☆☆☆☆☆
//api3: http://nullice.com/archives/1790 ☆☆☆☆
//api4: http://jongware.mit.edu/Js/index_1.html ☆☆☆
//api5: Adobe ExtendScript Toolkit CC --> Help --> Object Model Viewer ☆☆☆☆☆
//api6: Photoshop_charID_stringID_List(https://gist.github.com/tylearymf/546e7f46069f2858fda7da148d9afc33) ☆☆☆☆☆
//      ActionDescriptor(http://objjob.phrogz.net/pshop/object/323)
//      ActionDescriptor(http://jongware.mit.edu/pscs5js_html/psjscs5/pc_ActionDescriptor.html)

namespace psd2ugui {

    //进度条相关
    let progressBar: Progressbar
    let progressIndex: number
    let progressTotalCount: number

    //配置相关
    let originRulerUnits: Units
    let originTypeUnits: TypeUnits
    let originDisplayDialogs: DialogModes

    function ApplySetting() {
        //保存配置
        originRulerUnits = app.preferences.rulerUnits
        originTypeUnits = app.preferences.typeUnits
        originDisplayDialogs = app.displayDialogs

        //修改配置
        app.displayDialogs = DialogModes.NO
        app.preferences.rulerUnits = Units.PIXELS
        app.preferences.typeUnits = TypeUnits.PIXELS
    }

    //还原配置
    function RevertSetting() {
        app.preferences.rulerUnits = originRulerUnits
        app.preferences.typeUnits = originTypeUnits
        app.displayDialogs = originDisplayDialogs
    }

    export function main() {

        //如果要调试就设置为2，然后出现异常的时候，ps会自动打开Adobe ExtendScript Toolkit CC并挂起ps
        Global.GetInstance().setDebugMode(0)

        if (app.documents.length <= 0) {
            ShowError("请打开文档后再操作!")
        }

        if (app.activeDocument.saved) {
            ShowMsg("文档路径：" + app.activeDocument.path)
        }
        else {
            ShowError("psd尚未保存，请保存后再操作")
        }

        ApplySetting()

        Global.GetInstance().psdPath = app.activeDocument.path.fsName
        Global.GetInstance().psdSize = new Vector2((<UnitValue>app.activeDocument.width).value, (<UnitValue>app.activeDocument.height).value)

        let resolutionStr = `     当前PSD分辨率：${Global.GetInstance().psdSize}，当前配置的游戏分辨率: ${Global.GetInstance().gameScreenSize}`
        WindowExtensions.ShowWindow("提示", "PSD导出UGUI配置" + resolutionStr, function (win: Window) {
            //开始导出时，禁用掉界面点击
            //这里如果在导出中Ps出现异常情况，则关闭不了这个窗口了，直到杀进程再开，所以这个先保留默认
            // win.enabled = false

            let configData = Global.GetInstance().getConfigData()

            if (Global.GetInstance().isTryCatch()) {
                let isError = false
                try {
                    StartExport(app.activeDocument, configData)
                } catch (error) {
                    if (error.fileName == "customException") {
                        return false;
                    }

                    isError = true
                    let str = error.toString()
                    str += "\nfileName:" + error.fileName
                    str += "\nline:" + error.line
                    // str += "\nstack:" + $.stack
                    ShowError(str)
                }
                finally {
                    //还原配置
                    RevertSetting()

                    //如果出现错误的时候，要保留现场，而不是清理现场
                    if (!isError && Global.GetInstance().mainDoc) {
                        Global.GetInstance().mainDoc.close(SaveOptions.DONOTSAVECHANGES)
                    }
                }
            }
            else {
                StartExport(app.activeDocument, configData)
                //还原配置
                RevertSetting()

                if (Global.GetInstance().mainDoc) {
                    Global.GetInstance().mainDoc.close(SaveOptions.DONOTSAVECHANGES)
                }
            }

            return win.close()
        }, function (win: Window) {

            return win.close()
        }, function (win: Window) {

            //导出进度
            UIExtensions.AddGroup(win, "导出进度", function (group: Group) {
                progressBar = group.add("progressbar")
                progressBar.value = 0
            })

            //模块名
            UIExtensions.AddGroup(win, "模块名", function (group: Group) {
                let moduleName = RemoveUnityNotSupportSymbol(Global.GetInstance().moduleName)
                let etext = group.add('edittext')
                Global.GetInstance().moduleName = moduleName.substring(0, moduleName.length - 4)
                etext.text = Global.GetInstance().moduleName
                etext.onChange = function () {
                    Global.GetInstance().moduleName = etext.text
                }
            })

            //导出类型
            UIExtensions.AddGroup(win, "导出类型", function (group: Group) {
                UIExtensions.AddDropDownList(group, LayerExportType, Global.GetInstance().layerExportType, function (drop: DropDownList) {
                    Global.GetInstance().layerExportType = (<any>drop.selection).text
                    ShowMsg("layerExportType:" + Global.GetInstance().layerExportType)
                })
            })

            //中心枢轴类型
            UIExtensions.AddGroup(win, "Pivot类型", function (group: Group) {
                UIExtensions.AddDropDownList(group, PivotType, PivotType.Center, function (drop: DropDownList) {
                    Global.GetInstance().pivotType = (<any>drop.selection).text
                    ShowMsg("pivotType:" + Global.GetInstance().pivotType)
                })
            })

            //是否开启适配选项
            UIExtensions.AddGroup(win, "是否开启适配", function (group: Group) {
                let checkbox = group.add("checkbox")
                checkbox.value = Global.GetInstance().enableFit
                checkbox.onClick = function () {
                    Global.GetInstance().enableFit = checkbox.value
                    ShowMsg("enableFit:" + Global.GetInstance().enableFit)
                }
                group.enabled = Global.GetInstance().psdSize.toString() != Global.GetInstance().gameScreenSize.toString()
            })

            //相同图片是否只导出一张
            UIExtensions.AddGroup(win, "相同图片是否只导出一张(如果图片过多，此过程会很慢)", function (group: Group) {
                let checkbox = group.add("checkbox")
                checkbox.value = Global.GetInstance().onlyOneImage
                checkbox.onClick = function () {
                    Global.GetInstance().onlyOneImage = checkbox.value
                    ShowMsg("onlyOneImage:" + Global.GetInstance().onlyOneImage)
                }
            })
        })
    }



    //更新导出进度
    export function updateProgressBar() {
        progressBar.value = (progressIndex / progressTotalCount) * 100.0
        progressIndex = progressIndex + 1
    }

    //开始导出
    function StartExport(doc: Document, info: IConfigData) {
        //复制一份psd文档
        Global.GetInstance().mainDoc = doc.duplicate("temp", false)
        doc = Global.GetInstance().mainDoc
        app.activeDocument = Global.GetInstance().mainDoc

        //检查残留文件夹
        Global.GetInstance().config = new Config(doc, info)
        Global.GetInstance().fileConfig = new FileConfig(Global.GetInstance().config)
        let path = Global.GetInstance().fileConfig.getRootPath()
        let folder = new Folder(path)
        //getFiles 会返回 文件夹 和 文件
        let files = folder.getFiles()
        if (files && files.length > 0) {
            WindowExtensions.ShowWindow("警告", `该文件夹“${path}”不为空，是否清空再生成？`, function (win: Window) {
                //files[i].remove()
                //如果file返回的是个空的文件夹才能直接删除，否则是删不掉的
                //所以下面直接调用Windows的命令执行删除操作了
                let fsName = folder.fsName
                fsName = fsName.replace(/\//g, '\\')
                let cmd = `rmdir /q /s ${fsName}`
                app.system(cmd)
                return win.close()
            }, function (win: Window) {
                return win.close()
            }, function (win: Window) {
                //ongui
            }, "清空文件夹再生成", "直接覆盖")
        }

        //在你打开psd后，如果没选中任意一个Layer时，有时候导出会报错，所以就有了下面这块奇葩的代码
        //开始的时候需要选中一个Layer，而且还不能是当前选中的Layer，还有个当activeLayer设置后，会自动把该Layer的visible设置为true
        if (doc.layers.length > 0) {
            let tempActiveLayer = doc.activeLayer
            for (let i = 0; i < doc.layers.length; i++) {
                let tempLayer = doc.layers[i]
                if (tempLayer != tempActiveLayer) {
                    let visible = tempLayer.visible
                    doc.activeLayer = tempLayer
                    tempLayer.visible = visible
                    break
                }
            }
        }

        //图层集合(只包含根节点的)
        let infos = LayerExtensions.GetLayerInfos(doc, doc.layers)
        Global.GetInstance().config.setLayers(infos)

        if (infos.length <= 0) {
            ShowError("该文档没有图层可以导出！")
            return
        }

        //设置进度
        progressIndex = 1
        progressTotalCount = 0
        function getTotalCount(list: { length: number, [index: number]: object }) {
            for (let i = 0; i < list.length; i++) {
                let info = list[i]
                if (info instanceof NormalLayer) {
                    progressTotalCount = progressTotalCount + 1
                }
                else if (info instanceof LayerGroup) {
                    getTotalCount(info.layers)
                }
            }
        }
        getTotalCount(infos)

        //导出
        for (let i = 0, totalCount = infos.length; i < totalCount; i++) {
            infos[i].export()
        }

        Global.GetInstance().fileConfig.save()

        //导出成功后打开文件夹
        Global.GetInstance().fileConfig.showInExplorer()
    }
}