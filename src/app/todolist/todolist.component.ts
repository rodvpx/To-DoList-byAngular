import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  taskArray = [{ taskName: 'Arroz', isCompleted: false, isEditable: false, status: 'Não iniciado' }];

  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
      isEditable: false,
      status: 'Não iniciado'
    });
    form.reset();
  }

  onDelete(index: number) {
    this.taskArray.splice(index, 1);
  }

  onCheck(index: number) {
    const task = this.taskArray[index];
    task.isCompleted = !task.isCompleted;
    task.status = task.isCompleted ? 'Concluída' : 'Não iniciado';
  }

  onEdit(index: number) {
    const task = this.taskArray[index];
    task.isEditable = true;
    task.status = 'Em andamento';
  }

  onSave(index: number, newtask: string) {
    const task = this.taskArray[index];
    task.taskName = newtask;
    task.isEditable = false;

    // Se a tarefa estava marcada como concluída e foi editada, redefinir o status
    if (task.isCompleted) {
      task.isCompleted = false;
      task.status = 'Em andamento';
    }
  }

  onStatusChange(index: number, newStatus: string) {
    const task = this.taskArray[index];
    task.status = newStatus;

    // Sincronizar o checkbox com base no status
    if (newStatus === 'Concluída') {
      task.isCompleted = true;
    } else {
      task.isCompleted = false;
    }
  }

  // Método para aplicar estilos com base no status
  getStatusClass(status: string): string {
    if (status === 'Não iniciado') {
      return 'status-not-started';
    } else if (status === 'Em andamento') {
      return 'status-in-progress';
    } else if (status === 'Concluída') {
      return 'status-completed';
    }
    return '';
  }
}
