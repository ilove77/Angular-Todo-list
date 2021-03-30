import { Injectable } from '@angular/core';
 

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private list: string[] = [];
  
  constructor() { }

  add(title: string): void { 
      this.list.push(title); 
  }

  getList(): string[] {
    return this.list;
  }

}
