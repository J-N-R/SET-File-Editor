import { SA2Object } from './objects';

/** Typescript representation of a SET object. */
export interface SetObject {
    id: number;
    type: SA2Object, // might want to rename interface to ObjectType
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

/** Labels for what each property is used for in an object. */
export interface SetLabel {
    y?: string,
    xRot?: string,
    yRot?: string,
    zRot?: string,
    var1?: string,
    var2?: string,
    var3?: string,
}

/** Saves SetObject information into a file. */
export interface SetFile {
    fileName: string,
    isSA2Format?: boolean,
    setObjects: SetObject[],
    stage?: number,
    filePath?: string,
}
