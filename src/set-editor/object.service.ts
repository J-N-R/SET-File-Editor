import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { CoordinateStyle, DisplayInfo, SetLabel, SetObject, SortingOption } from '../shared/interfaces';
import { CATEGORIZED_OBJECTS } from '../shared/object-categories';
import { SA2_LEVELS } from '../shared/sa2-levels';
import { SA2Object } from '../shared/objects';
import { SA2_LABELS } from '../shared/object-labels';
import { CUSTOM_KEYS } from '../shared/content';
import { SORTING_OPTIONS } from '../shared/content';

/** Handles SET object storage, manipulation, and creation. */
@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  private nextID = 0;
  private objectList: SetObject[] = [];
  private sortingOption = SORTING_OPTIONS[0];
  private coordinateStyle: CoordinateStyle = 'game';

  private readonly objectSubject = new ReplaySubject<SetObject[]>();
  readonly objectsEmitter: Observable<SetObject[]> = this.objectSubject;

  addBlankObject(levelObjectGroups: Map<string, Set<SA2Object>>,
      stage: number) {
    const object = {
      id: this.nextID,
      type: DEFAULT_ITEM,
      displayInfo: this.getDisplayInfo(levelObjectGroups, stage, DEFAULT_ITEM),
    }
    // Attempt to insert object without sorting, if not insert then sort.
    switch (this.sortingOption.name) {
      case 'Time created':
        this.objectList.push(object);
        break;
      case 'x':
      case 'y':
      case 'z':
        this.objectList.unshift(object);
        break;
      default:
        this.objectList.push(object);
        this.objectList.sort(this.sortingOption.sortingFn);
    }
    this.nextID++;
    this.objectSubject.next(this.objectList);
  }

  deleteObject(id: number) {
    this.objectList = this.objectList.filter((object) => object.id !== id);
    this.objectSubject.next(this.objectList);
  }

  /**
   * Sets the internal object list, categorizes objects, and calculates
   * display info.
   **/
  setObjectList(levelObjectGroups: Map<string, Set<SA2Object>>, stage: number,
      objectList: SetObject[]) {
    objectList.map((object) => {
      object.displayInfo = object.displayInfo ?? this.getDisplayInfo(
          levelObjectGroups, stage, object.type);
      return object;
    });
    this.nextID = objectList.length + 1;
    this.objectList = objectList.sort(this.sortingOption.sortingFn);
    this.objectSubject.next(this.objectList);
  }

  clearObjectList() {
    this.nextID = 0;
    this.objectList.length = 0;
    this.objectSubject.next(this.objectList);
  }

  /**
   * Retrieves all the objects available to use in a given level, categorized.
   **/
  getLevelObjects(stage: number): Map<string, Set<SA2Object>> {
    const levelObjects = SA2_LEVELS.get(stage);
    if (!levelObjects) {
      console.error('Stage: "' + stage + '" not found.');
      return new Map([
        [
          'Unknown Stage Detected',
          new Set([SA2Object.DMYOBJ]),
        ],
      ]);
    }

    // Go through every object available in the given stage, and categorize it.
    const objectCategories = new Map<string, Set<SA2Object>>();
    for (const object of levelObjects) {
      const objectCategory = this.getCategory(CATEGORIZED_OBJECTS, object);
      if (objectCategory) {
        if (!objectCategories.has(objectCategory)) {
          objectCategories.set(objectCategory, new Set([object]));
        }
        else {
          objectCategories.get(objectCategory)!.add(object);
        }
      }
    }
    
    /**
     * Sort the categories by the order they're outlined in the data. This
     * allows us to set our own order.
     **/
    return new Map([...objectCategories.entries()].sort(([a], [b]) => 
        (SORTED_CATEGORY_INDEX.get(a) ?? Number.MAX_VALUE) -
        (SORTED_CATEGORY_INDEX.get(b) ?? Number.MAX_VALUE)));
  }

  getDisplayInfo(levelObjectGroups: Map<string, Set<SA2Object>>, stage: number,
      objectType: SA2Object): DisplayInfo {
    const setLabel = this.getSetLabel(stage, objectType);
    return {
      isExpanded: false,
      internalName: INTERNAL_NAMES.get(objectType) ?? 'UNKNOWN',
      categoryClass: CATEGORY_CLASSLIST[this.getCategory(
          levelObjectGroups, objectType)],
      customVariableCount: this.getCustomVariableCount(setLabel ?? {}),
      ...(setLabel !== undefined && {setLabel}),
    };
  }

  setSortingOption(sortingOption: SortingOption) {
    this.sortingOption = sortingOption;
    this.objectList.sort(sortingOption.sortingFn);
    this.objectSubject.next(this.objectList);
  }

  setCoordinateStyle(coordinateStyle: CoordinateStyle) {
    this.coordinateStyle = coordinateStyle;
    this.objectList.map((object) => {
      if (object.displayInfo?.setLabel) {
        [object.displayInfo.setLabel.y, object.displayInfo.setLabel.z] = [object.displayInfo.setLabel.z, object.displayInfo.setLabel.y];
        [object.displayInfo.setLabel.yRot, object.displayInfo.setLabel.zRot] = [object.displayInfo.setLabel.zRot, object.displayInfo.setLabel.yRot];
      }
    })
  }

  private getCategory(levelObjectGroups: Map<string, Set<SA2Object>>, objectType: SA2Object): string {
    for (const [category, objectList] of levelObjectGroups) {
      if (objectList.has(objectType)) {
        return category;
      }
    }
    return 'Uncategorized';
  }

  private getSetLabel(stage: number, objectType: SA2Object): SetLabel|undefined {
    if(!SA2_LABELS.has(objectType)) {
      return undefined;
    }

    const stageLabels = SA2_LABELS.get(objectType)!;
    const setLabel: SetLabel = {...stageLabels.get(-1), ...stageLabels.get(stage)};
    if (this.coordinateStyle === 'blender') {
      [setLabel.yRot, setLabel.zRot] = [setLabel.zRot, setLabel.yRot];
      [setLabel.y, setLabel.z] = [setLabel.z, setLabel.y];
    }
    return Object.keys(setLabel).length > 0 ? setLabel : undefined;
  }

  private getCustomVariableCount(setLabel: SetLabel): number {
    return CUSTOM_KEYS.reduce((accumulator, objectKey) =>
        accumulator + (setLabel[objectKey] != undefined ? 1 : 0),
        0
    );
  }
}

const DEFAULT_ITEM = SA2Object.RING;
const INTERNAL_NAMES = new Map<SA2Object, string>(Object.entries(SA2Object).map(
  ([internalName, objectName]) => [objectName, internalName]
));
const SORTED_CATEGORY_INDEX = new Map(Array.from(CATEGORIZED_OBJECTS.keys())
    .map((object, index) => [object, index]));
const CATEGORY_CLASSLIST: Readonly<Record<string, string>> = {
  'Enemies': 'enemy',
  'Collectibles': 'collectible',
  'Stage Interactables': 'interactable',
  'Decoration': 'decoration',
  'Triggers': 'trigger',
  'Sunglasses': 'trigger',
  'Ball Switch': 'trigger',
  'Mystic Shrine': 'shrine',
  'Actors': 'decoration',
  'Uncategorized': '',
};



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
