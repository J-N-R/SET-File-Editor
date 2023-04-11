import { SA2Object } from './objects';

/**
 * Represents an object in Sonic Adventure. Properties such as x, y, and z are
 * string to support hex values, and are converted to number at save time.
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
    // An object's custom variables, which must have its own set label.
    var1?: string,
    var2?: string,
    var3?: string,
    displayInfo?: DisplayInfo,
};

/** Labels describing the purpose of each object property. */
export interface SetLabel {
    y?: string,
    z?: string,
    xRot?: string,
    yRot?: string,
    zRot?: string,
    var1?: string,
    var2?: string,
    var3?: string,
}

/** Extra info used in rendering Set Objects. */
export interface DisplayInfo {
    internalName: string,
    categoryClass: string,
    customVariableCount: number,
    setLabel?: SetLabel,
    // Used to determine whether to display a question mark icon or info icon
    fieldIcons?: SetLabel,
}

/**
 * Saves SetObject information into a file.
 * TODO: This feels like two interfaces in one, some info is used just for
 * reading, while other info is just used for saving. Maybe split this up?
 **/
export interface SetFile {
    fileName: string,
    isSA2Format?: boolean,
    setObjects: SetObject[],
    stage?: number,
    filePath?: string,
    coordinateStyle?: CoordinateStyle,
}

/** Sorts objects based on attributes. */
export interface SortingOption {
    name: string,
    color?: string,
    sortingFn: SortingFn
}

/** Method for sorting objects. */
export type SortingFn = (a: SetObject, b: SetObject) => number;

/** Different ways of handle coordinates. */
export type CoordinateStyle = 'game' | 'blender';



// Legal jargon.
/*************************************************************************
 * Copyright 2023 Google LLC
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 * 
 *  https://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *************************************************************************/
