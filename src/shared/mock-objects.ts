import { SetObject } from './interfaces';
import { SA2Object } from './objects';

/** Mock Objects used for initial frontend development. */
const NUMBER_OF_OBJECTS = 1;

export const OBJECTS: SetObject[] = [...Array(NUMBER_OF_OBJECTS).keys()]
        .map((index, value) => {
            return {id: value, type: SA2Object.ITEMBOX};
        }
);