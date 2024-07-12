import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsRouting } from './tags-routing.module';
import { TagsComponent } from './tags/tags.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagsListComponent } from './tags-list/tags-list.component';



@NgModule({
  declarations: [
    TagsComponent,
    TagsListComponent
  ],
  imports: [
    CommonModule,
    TagsRouting,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TagsModule { }
