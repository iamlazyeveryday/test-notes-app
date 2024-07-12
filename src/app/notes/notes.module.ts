import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteFormComponent } from './note-form/note-form.component';
import { NotesRouting } from './notes-routing.module';



@NgModule({
  declarations: [
    NotesListComponent,
    NoteFormComponent
  ],
  imports: [
    CommonModule,
    NotesRouting,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NotesModule { }
