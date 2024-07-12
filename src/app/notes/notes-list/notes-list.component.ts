import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Note } from 'src/app/interfaces/note.interface';
import { NotesService } from 'src/services/notes.service';


@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  public readonly newNote = 'Новая заметка';
  public readonly editButton = 'Редактировать';
  public readonly deleteButton = 'Удалить';
  public readonly tripleDot = '...';

  protected notes: Note[] = [];
  public selectedNote: Note = { noteId: 0, title: '', content: '', tags: [], showOptionsMenu: false };
  public showForm = false;

  private readonly noteService = inject(NotesService);

  ngOnInit(): void {
      this.loadNotes();
  }

  public loadNotes(): void {
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  public onEdit(note: Note): void {
    this.selectedNote = { ...note };
    this.showForm = true;
  }

  public onDelete(noteId: number): void {
    this.noteService.deleteNote(noteId);
  }

  public openForm(): void {
    this.selectedNote = { noteId: 0, title: '', content: '', tags: [], showOptionsMenu: false };
    this.showForm = true;
  }

  public closeForm(): void {
    this.showForm = false;
  }

  public saveNote(note: Note): void {
    if (note.noteId) {
      this.noteService.updateNote(note);
    } else {
      note.noteId = Date.now();
      this.noteService.createNote(note);
    }
    this.showForm = false;
    this.loadNotes();
  }

  public closeAllMenus(): void {
    this.notes.forEach(note => note.showOptionsMenu = false);
  }

  public toggleOptions(note: Note, event: Event): void {
    event.stopPropagation();
    this.notes.forEach(n => {
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
