import { SA2Object } from './content';

/** Typescript representation of a SET object. */
export interface SetObject {
    id: number;
    object: SA2Object, 
    x?: number,
    y?: number,
    z?: number,
    // Rotation data stored as degrees, converted to BAMS later.
    xRot?: number,
    yRot?: number,
    zRot?: number,
    var1?: number,
    var2?: number,
    var3?: number,
};

export interface ObjectGroup {
    name: string,
    objects: SA2Object[],
}
