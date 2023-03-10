import { SetObject, SetLabel, SortingOption, SetFile } from './interfaces';

/** Version of the Set Editor. */
export const VERSION = '1.02';

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
        name: 'Type',
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
    const stage = Number(fileName?.match(/\d/g)?.join('') ?? 0);
    const isSA2Format = fileName.includes('_');

    return {
        fileName,
        ...(stage !== 0 && {stage}),
        isSA2Format,
        setObjects: [],
        filePath,
    };
}
