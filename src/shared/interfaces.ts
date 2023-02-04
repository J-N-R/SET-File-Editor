import { SA2Object } from './objects';

/** Typescript representation of a SET object. */
export interface SetObject {
    id: number;
    object: SA2Object, // might want to rename interface to ObjectType
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

/** Groups SA2Objects into categories */
export interface ObjectGroup {
    name: string,
    objects: SA2Object[],
}

/** Saves SetObject information into a file. */
export interface SetFile {
    fileName: string,
    isSA2Format: boolean,
    setObjects: SetObject[],
}
