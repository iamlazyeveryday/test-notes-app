import { Component, inject, OnInit } from '@angular/core';
import { Tag } from 'src/app/interfaces/tag.interface';
import { TagsService } from 'src/services/tags.service';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent {
  public tags: Tag[] = [];

  private readonly tagService = inject(TagsService);

}
