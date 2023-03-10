import { SetObject } from './interfaces';
import { CITY_ESCAPE_OBJECTS } from './sa2-levels';

/** Mock Objects used for initial frontend development. */
const NUMBER_OF_OBJECTS = 1;
const OBJECTS = Array.from(CITY_ESCAPE_OBJECTS.values());

export const MOCK_OBJECTS: SetObject[] = [...Array(NUMBER_OF_OBJECTS).keys()]
        .map((index, value) => {
            return {id: value, type: OBJECTS[index % OBJECTS.length]};
        }
);



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
