namespace psd2ugui {
    export class ActionDescriptorExtensions {

        public static readonly ActionDescriptorName: string = "ActionDescriptor"
        public static readonly ActionReferenceName: string = "ActionReference"
        public static readonly ActionListName: string = "ActionList"

        /**
         * msg为自定义消息，必须设置，否则不显示
         *
         * @param {string} msg
         * @param {ActionDescriptor} descriptor
         * @memberof ActionDescriptorExtensions
         */
        public static ShowAllKeysByDescriptor(msg: string, descriptor: ActionDescriptor) {
            if (!Global.GetInstance().showDialog || !descriptor || msg == undefined) {
                return
            }

            let str = `count:${descriptor.count.toString()}\n`
            let typeName = descriptor.typename
            for (let i = 0; i < descriptor.count; i++) {
                if (typeName == ActionDescriptorExtensions.ActionDescriptorName) {
                    let id = descriptor.getKey(i)

                    str += `${i}. ActionDescriptor ID:${id}, charID:${app.typeIDToCharID(id)}, stringID:${app.typeIDToStringID(id)}, type:${descriptor.getType(id)}`
                }
                else if (typeName == ActionDescriptorExtensions.ActionReferenceName) {
                    let id = descriptor.getReference(i).getIndex()
                    str += `${i}. ActionReference ID:${id}`
                }
                else if (typeName == ActionDescriptorExtensions.ActionListName) {
                    let id = descriptor.getType(i)
                    str += `${i}. ActionList ID:${id}`
                }

                str += "\n"
            }

            if (str != "") {
                msg = `customMsg:${msg} descriptorMsg:${str}`
                $.writeln(msg)
                ShowMsg(msg)
            }
        }

        /**
         * 获取选中的图层的Descriptor
         *
         * @param {string} msg
         * @returns {ActionDescriptor}
         * @memberof ActionDescriptorExtensions
         */
        public static GetLayerDescriptor(msg?: string): ActionDescriptor {
            let reference = new ActionReference()
            reference.putEnumerated(app.charIDToTypeID("Lyr "), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"))
            let layerDescriptor = app.executeActionGet(reference)
            ActionDescriptorExtensions.ShowAllKeysByDescriptor(msg as string, layerDescriptor)
            return layerDescriptor
        }

        /**
         * 获取选中的图层的所有附加效果
         *
         * @static
         * @param {string} msg
         * @returns {ActionDescriptor}
         * @memberof ActionDescriptorExtensions
         */
        public static GetEffectsByActiveLayer(msg?: string): ActionDescriptor {
            let layerDescriptor = ActionDescriptorExtensions.GetLayerDescriptor()
            let effectDescriptor = ActionDescriptorExtensions.GetValueByDescriptor(layerDescriptor, "Lefx")
            ActionDescriptorExtensions.ShowAllKeysByDescriptor(msg as string, effectDescriptor)
            return effectDescriptor
        }

        /**
         * 获取选中的Layer的描边效果对象
         *
         * @static
         * @param {string} [msg]
         * @returns {ActionDescriptor}
         * @memberof ActionDescriptorExtensions
         */
        public static GetOutlineDescriptor(msg?: string): ActionDescriptor {
            let layerEffects = ActionDescriptorExtensions.GetEffectsByActiveLayer()
            let outlineDescriptor = ActionDescriptorExtensions.GetValueByDescriptor(layerEffects, "FrFX")
            ActionDescriptorExtensions.ShowAllKeysByDescriptor(msg as string, outlineDescriptor)
            return outlineDescriptor
        }
        /**
         * 获取选中的文本的size（textItem.size返回的值不准确）
         *
         * @static
         * @param {string} [msg]
         * @returns {number}
         * @memberof ActionDescriptorExtensions
         */
        public static GetTextItemSize(msg?: string): number {
            let layerDescriptor = ActionDescriptorExtensions.GetLayerDescriptor()
            let txtDescriptor = ActionDescriptorExtensions.GetValueByDescriptor(layerDescriptor, "Txt ")
            let txttDescriptor = ActionDescriptorExtensions.GetValueByDescriptor(txtDescriptor, "Txtt")
            let element = txttDescriptor.getObjectValue(0)
            let txtsDescriptor = ActionDescriptorExtensions.GetValueByDescriptor(element, "TxtS")
            ActionDescriptorExtensions.ShowAllKeysByDescriptor(msg as string, txtsDescriptor)
            let size = ActionDescriptorExtensions.GetValueByDescriptor(txtsDescriptor, "impliedFontSize")
            size = Math.round(size + 0.5)

            return size
        }

        /**
         * 根据Descriptor的Key获取Value
         *
         * @static
         * @param {ActionDescriptor} descriptor
         * @param {string} key
         * @returns {ActionDescriptor}
         * @memberof ActionDescriptorExtensions
         */
        public static GetValueByDescriptor(descriptor: ActionDescriptor, key: string): any {
            if (descriptor == null || descriptor.typename != "ActionDescriptor") return null

            let id = 0
            if (key.length == 4) {
                id = app.charIDToTypeID(key)
            }
            else {
                id = app.stringIDToTypeID(key)
            }

            if (!descriptor.hasKey(id)) {
                return null
            }

            let typeName = descriptor.getType(id).toString()
            switch (typeName) {
                case "DescValueType.BOOLEANTYPE":
                    return descriptor.getBoolean(id)
                case "DescValueType.CLASSTYPE":
                    return descriptor.getClass(id)
                case "DescValueType.DOUBLETYPE":
                    return descriptor.getDouble(id)
                case "DescValueType.ENUMERATEDTYPE":
                    return app.typeIDToCharID(descriptor.getEnumerationValue(id))
                case "DescValueType.INTEGERTYPE":
                    return descriptor.getInteger(id)
                case "DescValueType.LISTTYPE":
                    return descriptor.getList(id)
                case "DescValueType.OBJECTTYPE":
                    return descriptor.getObjectValue(id)
                case "DescValueType.REFERENCETYPE":
                    return descriptor.getReference(id)
                case "DescValueType.STRINGTYPE":
                    return descriptor.getString(id)
                case "DescValueType.UNITDOUBLE":
                    return descriptor.getUnitDoubleValue(id)
                case "DescValueType.ALIASTYPE":
                    return descriptor.getPath(id)
                case "DescValueType.RAWTYPE":
                    return descriptor.getData(id)
                default:
                    return null
            }
        }

        /**
         * 获取16进制RGB值
         *
         * @static
         * @param {ActionDescriptor} descriptor
         * @returns {string}
         * @memberof ActionDescriptorExtensions
         */
        public static GetHexColorByDescriptor(descriptor: ActionDescriptor): string {
            let colorDescriptor: ActionDescriptor = ActionDescriptorExtensions.GetValueByDescriptor(descriptor, "Clr ")
            let redValue: number = ActionDescriptorExtensions.GetValueByDescriptor(colorDescriptor, "Rd  ")
            let greenValue: number = ActionDescriptorExtensions.GetValueByDescriptor(colorDescriptor, "Grn ")
            let blueValue: number = ActionDescriptorExtensions.GetValueByDescriptor(colorDescriptor, "Bl  ")
            let opacityValue: number = ActionDescriptorExtensions.GetValueByDescriptor(descriptor, "Opct") * 2.55
            let hexColor = RGBToHex(redValue, greenValue, blueValue, opacityValue)

            return hexColor
        }
    }
}