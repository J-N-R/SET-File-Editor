import { SetObject } from './interfaces';
import { SA2Object } from './objects';
import { CITY_ESCAPE_OBJECTS } from './sa2-levels';

/** Mock Objects used for initial frontend development. */
const NUMBER_OF_OBJECTS = 1;
const OBJECTS = Array.from(CITY_ESCAPE_OBJECTS.values());

export const MOCK_OBJECTS: SetObject[] = [...Array(NUMBER_OF_OBJECTS).keys()]
        .map((index, value) => {
            return {id: value, type: OBJECTS[index % OBJECTS.length]};
        }
);