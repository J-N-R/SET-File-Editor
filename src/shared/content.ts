import { SetObject, SetLabel, SortingOption, SetFile } from './interfaces';

/** Version of the Set Editor. */
export const VERSION = '1.12';

/** URL to find latest Set Editor version. */
export const VERSION_URL = 'https://raw.githubusercontent.com/J-N-R/' +
    'SET-File-Editor/master/VERSION.txt';

/** Keys used to iterate over an object's custom properties. */
export const CUSTOM_KEYS: (keyof SetLabel)[] = ['var1', 'var2', 'var3'];

/** Link to this project's latest release. */
export const RELEASES_URL = 'https://github.com/J-N-R/SET-File-Editor/releases';

/** Different ways of sorting objects in the editor. */
export const SORTING_OPTIONS: SortingOption[] = [
    {
        name: 'Time created',
        sortingFn: (a: SetObject, b: SetObject) => a.id - b.id,
    },
    {
        name: 'Name',
        sortingFn: (a: SetObject, b: SetObject) => a.type.localeCompare(b.type),
    },
    {
        name: 'Category',
        sortingFn: (a: SetObject, b: SetObject) => {
            const aClass = a.displayInfo?.categoryClass ?? '';
            const bClass = b.displayInfo?.categoryClass ?? '';
            return aClass.localeCompare(bClass);
        },
    },
    {
        name: 'x',
        color: 'accent',
        sortingFn: (a: SetObject, b: SetObject) => 
            (Number(a.x) || 0) - (Number(b.x) || 0),
    },
    {
        name: 'y',
        color: 'accent',
        sortingFn: (a: SetObject, b: SetObject) => 
            (Number(a.y) || 0) - (Number(b.y) || 0),
    },
    {
        name: 'z',
        color: 'accent',
        sortingFn: (a: SetObject, b: SetObject) =>
            (Number(a.z) || 0) - (Number(b.z) || 0),
    },
];

/** Estimates file information from name. */
export function convertToSetFile(filePath: string): SetFile {
    const fileName = filePath.split('\\').pop() ?? '';
    const stage = Number(fileName.split('_')[0].match(/\d/g)?.join('') ?? 0);
    const isSA2Format = fileName.includes('_');

    return {
        fileName,
        ...(stage !== 0 && {stage}),
        isSA2Format,
        setObjects: [],
        filePath,
    };
}



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
