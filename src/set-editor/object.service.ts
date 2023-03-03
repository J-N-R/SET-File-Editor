import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { DisplayInfo, SetLabel, SetObject } from '../shared/interfaces';
import { CATEGORIZED_OBJECTS } from '../shared/object-categories';
import { SA2_LEVELS } from '../shared/sa2-levels';
import { SA2Object } from '../shared/objects';
import { SA2_LABELS } from '../shared/object-labels';
import { CUSTOM_KEYS } from '../shared/content';

/** Handles SET object storage, manipulation, and creation. */
@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  private objectList: SetObject[] = [];
  private nextID = 0;

  private readonly objectSubject = new ReplaySubject<SetObject[]>();
  readonly objectsEmitter: Observable<SetObject[]> = this.objectSubject;

  addBlankObject(levelObjectGroups: Map<string, Set<SA2Object>>,
        stage: number) {
    const object = {
      id: this.nextID,
      type: DEFAULT_ITEM,
      displayInfo: this.getDisplayInfo(levelObjectGroups, stage, DEFAULT_ITEM),
    }
    this.nextID++;
    this.objectList.push(object);
    this.objectSubject.next(this.objectList);
  }

  deleteObject(id: number) {
    this.objectList = this.objectList.filter((object) => object.id !== id);
    this.objectSubject.next(this.objectList);
  }

  setObjectList(levelObjectGroups: Map<string, Set<SA2Object>>,
        stage: number, objectList: SetObject[]) {
    if (this.nextID <= objectList.length) {
      this.nextID = objectList.length + 1;
    }
    for (const object of objectList) {
      if (object.displayInfo) {
        continue;
      }
      object.displayInfo = this.getDisplayInfo(levelObjectGroups, stage, object.type);
    }
    this.objectList = objectList;
    this.objectSubject.next(this.objectList);
  }

  clearObjectList() {
    this.objectList.length = 0;
    this.nextID = 0;
    this.objectSubject.next(this.objectList);
  }

  // Retrieves an object's levels already categorized.
  getLevelObjects(stage: number): Map<string, Set<SA2Object>> {
    const levelObjects = SA2_LEVELS.get(stage);
    if (!levelObjects) {
      console.error('Stage: "' + stage + '" not found.');
      return new Map([
        [
          'Unknown Stage Detected',
          new Set<SA2Object>([SA2Object.DMYOBJ]),
        ]
      ]);
    }

    // Go through every object in a level, and find the category it belongs to.
    // This generates our own subset of categories for the UI to display.
    const filteredObjectGroups = new Map<string, Set<SA2Object>>();
    for (const object of levelObjects) {
      let found = false;
      for (const [groupName, objectGroup] of CATEGORIZED_OBJECTS) {
        if (objectGroup.has(object)) {
          found = true;
          if (!filteredObjectGroups.has(groupName)) {
            filteredObjectGroups.set(groupName, new Set<SA2Object>([object]));
          }
          else {
            filteredObjectGroups.get(groupName)!.add(object);
          }
          break;
        }
      }
      if (!found) {
        if (!filteredObjectGroups.has('Uncategorized')) {
          filteredObjectGroups.set('Uncategorized', new Set<SA2Object>([object]));
        }
        else {
          filteredObjectGroups.get('Uncategorized')!.add(object);
        }
      }
    }
    
    return filteredObjectGroups;
  }

  getDisplayInfo(levelObjectGroups: Map<string, Set<SA2Object>>, stage: number, objectType: SA2Object): DisplayInfo {
     const setLabel = this.getSetLabel(stage, objectType);
     return {
      isExpanded: false,
      internalName: INTERNAL_NAMES.get(objectType) ?? 'UNKNOWN',
      categoryClass: this.getCategory(levelObjectGroups, objectType),
      customVariableCount: this.getCustomVariableCount(setLabel ?? {}),
      ...(setLabel !== undefined && {setLabel}),
    };
  }

  private getCategory(levelObjectGroups: Map<string, Set<SA2Object>>, objectType: SA2Object): string {
    for (const [groupName, objectGroup] of levelObjectGroups) {
      if (objectGroup.has(objectType)) {
        return CATEGORY_CLASSLIST[groupName];
      }
    }
    return '';
  }

  private getSetLabel(stage: number, objectType: SA2Object): SetLabel|undefined {
    if(!SA2_LABELS.has(objectType)) {
      return undefined;
    }

    const stageLabels = SA2_LABELS.get(objectType)!;
    const setLabel: SetLabel = {...stageLabels.get(-1), ...stageLabels.get(stage)};
    return Object.keys(setLabel).length > 0 ? setLabel : undefined;
  }

  private getCustomVariableCount(setLabel: SetLabel): number {
    return CUSTOM_KEYS.reduce((accumulator, objectKey) =>
        accumulator + (setLabel[objectKey] != undefined ? 1 : 0),
        0
    );
  }
}

const INTERNAL_NAMES = new Map<SA2Object, string>(Object.entries(SA2Object).map(
  ([internalName, objectName]) => [objectName, internalName]
));
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
const DEFAULT_ITEM = SA2Object.RING;
