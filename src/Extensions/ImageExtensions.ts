namespace psd2ugui {
    interface ImageInfo {
        colors: Array<string>
        info: BaseNode
    }

    interface ExportInfo {
        canExport: boolean
        exportName: string
    }

    export class ImageExtensions {
        private static imageHashArray: Array<ImageInfo>

        /**
         * 判断图片是否一致（从每张图片中取8*8个像素点，然后根据这些像素点判断rgb是否一致）
         *
         * @static
         * @param {Document} doc
         * @param {BaseNode} baseNode
         * @returns {ExportInfo}
         * @memberof ImageExtensions
         */
        public static GetSameImageExportName(doc: Document, baseNode: BaseNode): ExportInfo {
            let size = baseNode.baseLayer.getSize()
            let w = size.x
            let h = size.y
            if (doc == null) ShowError("doc is null")
            if (w < 8 || h < 8) ShowError("Image width < 8 || height < 8")

            let w_array = new Array<number>(8)
            let h_array = new Array<number>(8)
            for (let i = 0; i < 8; i++) {
                let tempw = w * i / 8.0
                let temph = h * i / 8.0

                w_array[i] = tempw
                h_array[i] = temph
            }

            let hexColors = new Array<string>(8 * 8)
            for (let i = 0; i < 8; i++) {
                let x = w_array[i]
                for (let j = 0; j < 8; j++) {
                    let y = h_array[j]
                    let pointSample = ColorSamplers.add([x, y])
                    let str = "none"
                    try {
                        str = pointSample.color.rgb.hexValue
                    } catch (error) {
                    }

                    hexColors[i * 8 + j] = str
                    pointSample.remove()
                }
            }

            for (let i = 0; i < ImageExtensions.imageHashArray.length; i++) {
                let colors = ImageExtensions.imageHashArray[i].colors
                let info = ImageExtensions.imageHashArray[i].info

                if (ImageExtensions.CheckColorsIsSame(hexColors, colors)) {
                    return { canExport: false, exportName: info.baseLayer.getExportName() }
                }
            }
            ImageExtensions.imageHashArray.push({ colors: hexColors, info: baseNode })

            return { canExport: true, exportName: baseNode.baseLayer.getExportName() }
        }

        public static CheckColorsIsSame(colors1: Array<string>, colors2: Array<string>): boolean {
            if (colors1.length != colors2.length) {
                return false
            }

            for (let i = 0; i < colors1.length; i++) {
                if (colors1[i] != colors2[i]) {
                    return false
                }
            }

            return true
        }
    }
}