import { Injectable } from '@angular/core';
 // Class
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private list: Todo[] = [];
  
  constructor() { }

  getList()  {
    return this.list;
  }
 
  add(title: string): void { 
      this.list.push(new Todo(title)); 
  }
  remove(index: number): void {
    this.list.splice(index, 1);
  }

  getWithCompleted(completed:boolean):Todo[]{
    return this.list.filter(todo => todo.done === completed);
  }

  removeCompleted(): void {
    this.list = this.getWithCompleted(false);
  }
}
