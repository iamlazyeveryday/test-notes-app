import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reminder } from 'src/app/interfaces/reminder.interface';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent {
  @Input()
  reminder: Reminder = { reminderId: 0, title: '', tags: [], showOptionsMenu: false, dueDate: new Date().toISOString() };
  @Output()
  saveNote = new EventEmitter<Reminder>();
  @Output()
  closeForm = new EventEmitter<void>();

  public readonly reminderTitle = 'Событие';
  public readonly reminderDate = 'Дата';
  public readonly reminderSaveBtn = 'Сохранить';
  public readonly reminderCancelBtn = 'Отмена';

  public onNoteSave(): void {
    this.saveNote.emit(this.reminder);
  }

  public onNoteClose(): void {
    this.closeForm.emit();
  }
}
