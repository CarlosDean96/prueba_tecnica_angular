import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-task-creation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.css']
})
export class TaskCreationComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder,private taskService: TaskService) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      limitdate: ['', Validators.required],
      people: this.fb.array([], Validators.required) 
    });
  }

  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }
  
  addPerson() {
    const personForm = this.fb.group({
      namePerson: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.createSkill()], Validators.required)
    });
    this.people.push(personForm);
  }

  createSkill() {
    return this.fb.control('', Validators.required);
  }

  addSkill(personIndex: number) {
    const skillsArray = this.getSkillsArray(personIndex);
    skillsArray.push(this.createSkill());
  }

  getSkillsArray(personIndex: number): FormArray {
    return (this.people.at(personIndex).get('skills') as FormArray);
  }

  deletePerson(personIndex: number) {
    this.people.removeAt(personIndex);
  }

  deleteSkill(personIndex: number, skillIndex: number) {
    const skillsArray = this.getSkillsArray(personIndex);
    skillsArray.removeAt(skillIndex);
  }

  submitTask() {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value);
      while (this.people.length !== 0) {
        this.people.removeAt(0);
      }
      this.taskForm.reset();
    }
  }
}
