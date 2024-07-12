import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Reminder } from 'src/app/interfaces/reminder.interface';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  private readonly storageKey = 'reminders';
  private reminders: Reminder[] = this.loadNotesFromStorage();
  private remindersSubject$ = new BehaviorSubject<Reminder[]>(this.reminders);

  private loadNotesFromStorage(): Reminder[] {
    const storedNotes = localStorage.getItem(this.storageKey);
    return storedNotes ? JSON.parse(storedNotes) : [];
  }

  private saveNotesToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.reminders));
  }

  public getNotes(): Observable<Reminder[]> {
    return this.remindersSubject$.asObservable();
  }

  public createNote(note: Reminder): void {
    note.reminderId = Date.now();
    this.reminders.push(note);
    this.remindersSubject$.next(this.reminders);
    this.saveNotesToStorage();
  }

  public updateNote(updatedNote: Reminder): void {
    const index = this.reminders.findIndex(note => note.reminderId === updatedNote.reminderId);
    if (index !== -1) {
      this.reminders[index] = updatedNote;
      this.remindersSubject$.next(this.reminders);
      this.saveNotesToStorage();
    }

  }

  public deleteNote(reminderId: number): void {
    this.reminders = this.reminders.filter(note => note.reminderId !== reminderId);
    this.remindersSubject$.next(this.reminders);
    this.saveNotesToStorage();
  }
}
