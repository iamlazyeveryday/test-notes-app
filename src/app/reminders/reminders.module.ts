import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemindersListComponent } from './reminders-list/reminders-list.component';
import { ReminderFormComponent } from './reminder-form/reminder-form.component';
import { RemindersRouting } from './reminders-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RemindersListComponent,
    ReminderFormComponent
  ],
  imports: [
    CommonModule,
    RemindersRouting,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RemindersModule { }
