import { Component, HostListener, inject } from '@angular/core';
import { Reminder } from 'src/app/interfaces/reminder.interface';
import { RemindersService } from 'src/services/reminders.service';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.scss']
})
export class RemindersListComponent {
  public readonly newReminder = 'Новое напоминание';
  public readonly editButton = 'Редактировать';
  public readonly deleteButton = 'Удалить';
  public readonly tripleDot = '...';

  protected reminders: Reminder[] = [];
  public selectedReminder: Reminder = { reminderId: 0, title: '', tags: [], showOptionsMenu: false, dueDate: new Date().toISOString() };
  public showForm = false;

  private readonly reminderService = inject(RemindersService);

  ngOnInit(): void {
      this.loadReminders();
  }

  public loadReminders(): void {
    this.reminderService.getNotes().subscribe(reminders => {
      this.reminders = reminders;
    });
  }

  public onEdit(note: Reminder): void {
    this.selectedReminder = { ...note };
    this.showForm = true;
  }

  public onDelete(noteId: number): void {
    this.reminderService.deleteNote(noteId);
  }

  public openForm(): void {
    this.selectedReminder = { reminderId: 0, title: '', tags: [], showOptionsMenu: false, dueDate: new Date().toISOString() };
    this.showForm = true;
  }

  public closeForm(): void {
    this.showForm = false;
  }

  public saveReminder(note: Reminder): void {
    if (note.reminderId) {
      this.reminderService.updateNote(note);
    } else {
      note.reminderId = Date.now();
      this.reminderService.createNote(note);
    }
    this.showForm = false;
    this.loadReminders();
  }

  public closeAllMenus(): void {
    this.reminders.forEach(note => note.showOptionsMenu = false);
  }

  public toggleOptions(note: Reminder, event: Event): void {
    event.stopPropagation();
    this.reminders.forEach(n => {
      if (n !== note) {
        n.showOptionsMenu = false;
      }
    });

    note.showOptionsMenu = !note.showOptionsMenu;
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event): void {
    const clickedInsideOptions = (event.target as HTMLElement).closest('.options-dropdown');
    if (!clickedInsideOptions) {
      this.closeAllMenus();
    }
  }
}
