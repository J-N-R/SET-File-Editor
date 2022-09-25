/** Typescript representation of a SET object. */
export interface SetObject {
    type: string,
    x: number,
    y: number,
    z: number,
    // Rotation data stored as degrees, converted to BAMS later.
    xRot: number,
    yRot: number,
    zRot: number,
    var1?: number,
    var2?: number,
    var3?: number,
}
