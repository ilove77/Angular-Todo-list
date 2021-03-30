import { Component, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service';
 
import {Todo} from './todo.model';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
  }

  addTodo(inputRef: any): void { 
    this.todoListService.add( inputRef.value);
    inputRef.value = '';  
  } 
  getList() {
     return this.todoListService.getList();
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

}
