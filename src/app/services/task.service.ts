import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<any[]>([]);
  tasks = this.tasksSubject.asObservable();
  
  addTask(task: any) { 
    const tasks = this.tasksSubject.getValue();
    task.id = tasks.length + 1;
    task.completed = false;
    tasks.push(task);
    this.tasksSubject.next(tasks);
  }

  markTaskAsCompleted(taskId: number) { 
    const tasks = this.tasksSubject.getValue();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = true;
      this.tasksSubject.next(tasks);
    }
  }

  getFilteredTask(status: 'all' | 'Completed' | 'Pending'): Observable<any[]> { 
    return this.tasks.pipe(
      map(tasks => {
        if (status === 'all') {
          return tasks;
        } else if (status === 'Completed') {
          return tasks.filter(task => task.completed);
        } else {
          return tasks.filter(task => !task.completed)
        }
      })
    );
  }
}
