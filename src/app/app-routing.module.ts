import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesListComponent } from './notes/notes-list/notes-list.component';

const routes: Routes = [
  {
    path: 'notes',
    component: NotesListComponent,
  },
  {
    path: '', redirectTo: 'notes', pathMatch: 'full'
  },
  {
    path: 'reminders',
    loadChildren: () => import('./reminders/reminders.module').then((m) => m.RemindersModule)
  },
  {
    path: 'tags',
    loadChildren: () => import('./tags/tags.module').then((m) => m.TagsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
