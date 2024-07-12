import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from 'src/app/interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private readonly storageKey = 'notes';
  private notes: Note[] = this.loadNotesFromStorage();
  private notesSubject$ = new BehaviorSubject<Note[]>(this.notes);

  private loadNotesFromStorage(): Note[] {
    const storedNotes = localStorage.getItem(this.storageKey);
    return storedNotes ? JSON.parse(storedNotes) : [];
  }

  private saveNotesToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.notes));
  }

  public getNotes(): Observable<Note[]> {
    return this.notesSubject$.asObservable();
  }

  public createNote(note: Note): void {
    note.noteId = Date.now();
    this.notes.push(note);
    this.notesSubject$.next(this.notes);
    this.saveNotesToStorage();
  }

  public updateNote(updatedNote: Note): void {
    const index = this.notes.findIndex(note => note.noteId === updatedNote.noteId);
    if (index !== -1) {
      this.notes[index] = updatedNote;
      this.notesSubject$.next(this.notes);
      this.saveNotesToStorage();
    }
  }

  public deleteNote(noteId: number): void {
    this.notes = this.notes.filter(note => note.noteId !== noteId);
    this.notesSubject$.next(this.notes);
    this.saveNotesToStorage();
  }
}
