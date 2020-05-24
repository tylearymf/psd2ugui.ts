/**
 * 导出类型
 *
 * @export
 * @enum {number}
 */
export enum LayerExportType {
    /**
     * 已正确命名的并且显示的图层
     */
    EnableAndTag = "已正确命名的并且显示的图层",
    /**
     * 所有显示的图层（不用命名节点）
     */
    EnableLayer = "所有显示的图层（不用命名节点）",
    /**
     * 所有图层(包含隐藏图层且不用命名节点)
     */
    AllLayer = "所有图层(包含隐藏图层且不用命名节点)",
}