import { Component, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service';
 
import {Todo} from './todo.model';

//enum
import {TodoStatusType} from './todo-status-type.enum';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  //enum
  todoStatusType = TodoStatusType;
  private status = TodoStatusType.All;

  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
  }

  addTodo(inputRef: any): void { 
    this.todoListService.add( inputRef.value);
    inputRef.value = '';  
  } 
  getList() {
    let list: Todo[] = [];

    switch(this.status){
      case TodoStatusType.Active:
        list = this.getRemainingList();
        break;
      case TodoStatusType.Completed:
        list = this.getCompletedList();
        break;
      default:
        list = this.todoListService.getList();
        break; 
    }
     return list
  }
  remove(index: number): void {
    this.todoListService.remove(index);
  }


  //修改
  edit(todo: Todo): void {
    todo.editable = true;
  }

  update(todo: Todo, newTitle: string): void {
    if (!todo.editing) {
      return;
    }
    const title = newTitle.trim();
    if (title) {
      todo.setTitle(title);
      todo.editable = false;
    } else {
      const index = this.getList().indexOf(todo);
      if (index !== -1) {
        this.remove(index);
      }
    }
  }

  cancelEditing(todo: Todo): void {
    todo.editable = false;
  }

  getRemainingList():Todo[]{
    return this.todoListService.getWithCompleted(false);
  }

  //enum
  getCompletedList():Todo[]{
    return this.todoListService.getWithCompleted(true);
  }
  setStatus(status:number):void{
    this.status = status;
  }
  checkStatus(status:number):boolean{
    return this.status === status;
  }
  //移除
  removeCompleted(): void {
    this.todoListService.removeCompleted();
  }
  //全選
  getAllList(): Todo[] {
    return this.todoListService.getList();
  }
   
  allCompleted(): boolean {
    return this.getAllList().length === this.getCompletedList().length;
  }
   
  setAllTo(completed: boolean): void {
  
    this.getAllList().forEach((todo) => {
      todo.setCompleted(completed);
    });
  
  }
}
