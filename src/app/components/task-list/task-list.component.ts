import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks = this.taskServices.getFilteredTask('all');
  filtersStatus: 'all' | 'Completed' | 'Pending' = 'all';

  constructor(private taskServices: TaskService) { }

  changedFilter(status: 'all' | 'Completed' | 'Pending') {
    this.filtersStatus = status;
    this.tasks = this.taskServices.getFilteredTask(status);
  }

  markComplete(taskId: number) {
    this.taskServices.markTaskAsCompleted(taskId);
  }
}
