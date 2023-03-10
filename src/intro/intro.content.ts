interface IntroNote {
    readonly icon: string;
    readonly text: string;
}

/** Content for the 'Intro' page. */
export const NOTES: IntroNote[] = [
    {
        icon: 'lock',
        text: 'Each level\'s enemy types are restricted by level.',
    },
    {
        icon: 'pin',
        text: 'Blender coordinates are different from game coordinates.',
    },
    {
        icon: 'info',
        text: 'Keep an eye out for "help" menus to explain object types and variables!',
    },
    {
        icon: 'tag',
        text: 'Hex values are supported! Just start your values with an \'x.\' Also, rotation values are in degrees.',
    },
];



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
