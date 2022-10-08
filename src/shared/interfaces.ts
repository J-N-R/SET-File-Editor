/** Typescript representation of a SET object. */
export interface SetObject {
    // Internal id for frontend.
    id?: number,
    // Sonic adventure 2 id.
    oid: number,
    name: string,
    x: number,
    y: number,
    z: number,
    // Rotation data stored as degrees, converted to BAMS later.
    xRot?: number,
    yRot?: number,
    zRot?: number,
    var1?: number,
    var2?: number,
    var3?: number,
};
  