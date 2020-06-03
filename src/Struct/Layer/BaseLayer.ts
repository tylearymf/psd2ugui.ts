namespace psd2ugui {
    export class BaseLayer {
        public readonly artLayer: ArtLayer
        public readonly layerSet: LayerSet
        public readonly baseNode: BaseNode

        public fullName: string
        public bounds: Vector4
        public layerType?: LayerType
        public visible: boolean
        public opacity: number
        public nodeName: string
        public nodeType?: ComponentType
        public nodeArgs: string[]
        public firstName: string
        public secondName: string
        public isCommon: boolean
        public symbolType: SymbolType = SymbolType.Symbol1
        public anchorType?: AnchorType
        public imageName: string


        protected scale_x: number
        protected scale_y: number

        constructor(public readonly doc: Document, public readonly layer: Layer) {
            this.artLayer = layer as ArtLayer
            this.layerSet = layer as LayerSet

            this.fullName = layer.name
            this.bounds = Vector4.parseBound(layer.bounds)
            this.layerType = !layer.typename ? undefined : layer.typename as LayerType
            this.visible = layer.visible
            //保留2位小数
            this.opacity = Math.round(layer.opacity) / 100

            let reg = new RegExp(`${SymbolType.Symbol1}|${SymbolType.Symbol2}`)
            let nameSplits = this.fullName.split(reg)
            this.firstName = nameSplits.length === 2 ? nameSplits[0] : ""
            this.secondName = nameSplits.length === 2 ? nameSplits[1] : ""
            this.isCommon = this.firstName.startsWith(Global.GetInstance().common_PrefixName)
            this.firstName = RemoveUnityNotSupportSymbol(this.firstName)

            if (Global.GetInstance().layerExportType === LayerExportType.EnableAndTag) {
                if (this.firstName === "" || this.secondName === "") {
                    this.doc.activeLayer = layer
                    ShowError(`该图层 \"${layer.name}\" 命名有问题.\n图层已被选中，请修正.`)
                }
            }

            for (const key in SymbolType) {
                const element = SymbolType[key];
                if (this.fullName.includes(element)) {
                    this.symbolType = <SymbolType>key
                    break;
                }
            }

            if (this.secondName !== "") {
                let nodeArguments = this.secondName.split("_")
                this.nodeName = nodeArguments[0]
                if (nodeArguments.length > 1) {
                    this.nodeType = nodeArguments[1] as ComponentType
                }
                let spliceCount = 2

                if (nodeArguments.length > 2) {
                    let tempAnchorType = nodeArguments[2]
                    for (let key in AnchorType) {
                        const element: string = AnchorType[key]
                        if (element === tempAnchorType) {
                            this.anchorType = <AnchorType>key
                            break;
                        }
                    }

                    if (this.anchorType) {
                        spliceCount = 3
                    }
                }

                //去除前x个数据
                nodeArguments.splice(0, spliceCount)
                this.nodeArgs = nodeArguments
            }

            switch (Global.GetInstance().layerExportType) {
                case LayerExportType.EnableLayer:
                case LayerExportType.AllLayer:
                    if (this.nodeName === "") {
                        this.nodeName = this.layer.name
                    }

                    if (!this.nodeType) {
                        let sizex = this.bounds.z
                        let sizey = this.bounds.w
                        if (this.layerType == LayerType.ArtLayer) {
                            if (this.artLayer.kind == LayerKind.TEXT) {
                                this.nodeType = ComponentType.LABEL
                            }
                            else if (sizex < Global.GetInstance().spriteMaxSize.x && sizey < Global.GetInstance().spriteMaxSize.y) {
                                this.nodeType = ComponentType.SPRITE
                            }
                            else {
                                this.nodeType = ComponentType.TEXTURE
                            }
                        }
                        else {
                            this.nodeType = ComponentType.PANEL
                        }
                    }
                    break;
            }

            this.nodeName = RemoveUnityNotSupportSymbol(this.nodeName)
            this.scale_x = Global.GetInstance().gameScreenSize.x / (<UnitValue>this.doc.width).value
            this.scale_y = Global.GetInstance().gameScreenSize.y / (<UnitValue>this.doc.height).value

            if (this.isValid()) {
                this.baseNode = NodeFactory.GetInstanceByType(this)

                if (this.baseNode.hasImage) {
                    this.imageName = `${this.nodeName}_${this.nodeType}_${Global.GetInstance().imageSuffixIndex}`
                    this.baseNode.imageName = this.getExportName()
                }
            }
        }

        isValid(): boolean {
            let result = false

            switch (Global.GetInstance().layerExportType) {
                case LayerExportType.EnableAndTag:
                    result = result || (this.nodeName !== "" && this.visible)
                    break;
                case LayerExportType.EnableLayer:
                    result == result || this.visible
                    break;
                case LayerExportType.AllLayer:
                    result = result || true
                    break;
                default:
                    ShowError("导出类型 未实现：" + Global.GetInstance().layerExportType)
                    break;
            }

            if (result) {
                switch (this.nodeType) {
                    case ComponentType.BUTTON:
                        result = result && ButtonNode.isValid(this.layer)
                        break;
                    case ComponentType.LABEL:
                        result = result && LabelNode.isValid(this.layer)
                        break;
                    case ComponentType.PANEL:
                        result = result && PanelNode.isValid(this.layer)
                        break;
                    case ComponentType.SLICE:
                        result = result && SliceNode.isValid(this.layer)
                        break;
                    case ComponentType.SPRITE:
                        result = result && SpriteNode.isValid(this.layer)
                        break;
                    case ComponentType.TEXTURE:
                        result = result && TextureNode.isValid(this.layer)
                        break;
                    case ComponentType.WINDOW:
                        result = result && WindowNode.isValid(this.layer)
                        break;
                    default:
                        this.doc.activeLayer = this.layer
                        ShowError(`节点类型 未实现：'${this.nodeType}'.\n图层已被选中，请修正.`)
                        break;
                }
            }

            return result
        }
        getPos(): Vector2 {
            return new Vector2(this.bounds.x, this.bounds.y)
        }
        getSize(): Vector2 {
            return new Vector2(this.bounds.z, this.bounds.w)
        }
        getUnityPos(): Vector2 {
            let pos = this.getPos()
            let size = this.getSize()
            let psdSize = new Vector2((<UnitValue>this.doc.width).value, (<UnitValue>this.doc.height).value)

            //先把轴调转，让其跟unity坐标轴方向一致
            pos.y = pos.y * -1

            let pivotType = Global.GetInstance().pivotType
            switch (pivotType) {
                case PivotType.TopLeft:
                    pos.x = pos.x - psdSize.x / 2
                    pos.y = psdSize.y / 2 + pos.y
                    break;
                case PivotType.Top:
                    pos.x = pos.x - psdSize.x / 2 + size.x / 2
                    pos.y = psdSize.y / 2 + pos.y
                    break;
                case PivotType.TopRight:
                    pos.x = pos.x - psdSize.x / 2 + size.x
                    pos.y = psdSize.y / 2 + pos.y
                    break;
                case PivotType.Left:
                    pos.x = pos.x - psdSize.x / 2
                    pos.y = psdSize.y / 2 + pos.y - size.y / 2
                    break;
                case PivotType.Center:
                    pos.x = pos.x - psdSize.x / 2 + size.x / 2
                    pos.y = psdSize.y / 2 + pos.y - size.y / 2
                    break;
                case PivotType.Right:
                    pos.x = pos.x - psdSize.x / 2 + size.x
                    pos.y = psdSize.y / 2 + pos.y - size.y / 2
                    break;
                case PivotType.BottomLeft:
                    pos.x = pos.x - psdSize.x / 2
                    pos.y = psdSize.y / 2 + pos.y - size.y
                    break;
                case PivotType.Bottom:
                    pos.x = pos.x - psdSize.x / 2 + size.x / 2
                    pos.y = psdSize.y / 2 + pos.y - size.y
                    break;
                case PivotType.BottomRight:
                    pos.x = pos.x - psdSize.x / 2 + size.x
                    pos.y = psdSize.y / 2 + pos.y - size.y
                    break;
                default:
                    ShowError(`锚点类型 未实现:${pivotType}`)
            }

            if (Global.GetInstance().enableFit) {
                pos.x = pos.x * this.scale_x
                pos.y = pos.y * this.scale_y
            }

            return pos
        }
        getUnitySize(): Vector2 {
            let size = this.getSize()

            if (Global.GetInstance().enableFit) {
                size.x = size.x * this.scale_x
                size.y = size.y * this.scale_y
            }

            return size
        }
        getExportName(): string {
            if (this.baseNode.hasImage) {
                //这里的firstName为“标识符中的第一个字符串”
                if (this.firstName != "") {
                    if (this.isCommon) {
                        return this.firstName
                    }
                    else {
                        return `${Global.GetInstance().moduleName}_${this.firstName}`
                    }
                }

                return this.imageName
            }
            //这里的nodeName为“图层名”

            return this.nodeName
        }
        toString(): string {
            return JSON.stringify(this)
        }
    }
}