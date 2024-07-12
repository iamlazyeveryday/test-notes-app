import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Note } from 'src/app/interfaces/note.interface';
import { TagsService } from 'src/services/tags.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {
  @Input()
  note: Note = { noteId: 0, title: '', content: '', tags: [], showOptionsMenu: false };
  @Output()
  saveNote = new EventEmitter<Note>();
  @Output()
  closeForm = new EventEmitter<void>();

  public readonly noteTitle = 'Заголовок';
  public readonly noteContent = 'Содержание';
  public readonly noteDate = 'Дата';
  public readonly noteSaveBtn = 'Сохранить';
  public readonly noteCancelBtn = 'Отмена';
  public readonly noteTags = 'Тэги';

  public availableTags: string[] = [];
  public noteForm: FormGroup;
  private readonly tagService = inject(TagsService);

  // public noteForm = new FormBuilder().group({
  //   title: new FormControl('', Validators.required),
  //   content: new FormControl('', Validators.required),
  //   dueDate: new FormControl(''),
  //   tags: new FormControl([]),
  // });

  constructor(private fb: FormBuilder) {
    this.noteForm = this.fb.group({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      dueDate: new FormControl(''),
      tags: new FormControl([]),
    });
  }

  ngOnInit(): void {
    if (this.note) {
      this.noteForm.patchValue(this.note);
    }

    this.loadAvailableTags();
  }

  private loadAvailableTags(): void {
    this.tagService.getTags()
      .pipe(
        tap(tags => this.setAvailableTags(tags))
      )
      .subscribe();
  }

  private setAvailableTags(tags: { name: string }[]): void {
    this.availableTags = tags.map(tag => tag.name);
  }

  public onTagsChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.value);
    this.noteForm.get('tags')?.setValue(selectedOptions);
  }

  public onNoteSave(): void {
    if (this.noteForm.valid) {
      const updatedNote = { ...this.note, ...this.noteForm.value };
      this.saveNote.emit(updatedNote);
    }
  }

  public onNoteClose(): void {
    this.closeForm.emit();
  }
}
