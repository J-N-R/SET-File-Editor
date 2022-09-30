import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  fileName = '';
  isSA2 = true;
  isHardMode = false;
}
