import { BaseLayer } from "./BaseLayer";

export class Layer extends BaseLayer {
    isValid(): boolean {
        throw new Error("Method not implemented.");
    }
    getPos(): import("../Unity/Vector2").Vector2 {
        throw new Error("Method not implemented.");
    }
    getSize(): import("../Unity/Vector2").Vector2 {
        throw new Error("Method not implemented.");
    }
    getUnityPos(): import("../Unity/Vector2").Vector2 {
        throw new Error("Method not implemented.");
    }
    getUnitySize(): import("../Unity/Vector2").Vector2 {
        throw new Error("Method not implemented.");
    }
    getExportName(): string {
        throw new Error("Method not implemented.");
    }

}