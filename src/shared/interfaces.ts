import { SA2Object } from './objects';

/**
 * Represents an object in Sonic Adventure.
 * The string values are numbers that can also be represented in hexidecimal.
*/
export interface SetObject {
    id: number,
    type: SA2Object,
    x?: string,
    y?: string,
    z?: string,
    // Rotation data stored as degrees, converted to BAMS later.
    xRot?: string,
    yRot?: string,
    zRot?: string,
    var1?: string,
    var2?: string,
    var3?: string,
    displayInfo?: DisplayInfo,
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

/** Extra info used in rendering Set Objects. */
export interface DisplayInfo {
    isExpanded: boolean,
    internalName: string,
    categoryClass: string,
    customVariableCount: number,
    setLabel?: SetLabel,
}

/** Saves SetObject information into a file. */
export interface SetFile {
    fileName: string,
    isSA2Format?: boolean,
    setObjects: SetObject[],
    stage?: number,
    filePath?: string,
}

/** Sorts objects based on attributes. */
export interface SortingOption {
    name: string,
    color?: string,
    sortingFn: SortingFn
}

/** Method for sorting objects. */
export type SortingFn = (a: SetObject, b: SetObject) => number;
