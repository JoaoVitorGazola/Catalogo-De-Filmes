import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public salvarItem(chave: string, item: any) {
    localStorage.setItem(chave, JSON.stringify(item));
  }

  public getItem(chave: string): any {
    return JSON.parse(localStorage.getItem(chave));
  }

  public removeItem(chave: string) {
    localStorage.removeItem(chave);
  }
}
