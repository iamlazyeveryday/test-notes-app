import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Tag } from 'src/app/interfaces/tag.interface';
import { TagsService } from 'src/services/tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  protected tags: Tag[] = [];
  public readonly addTagBtn = 'Добавить тег';
  public readonly deleteTagBtn = 'Удалить';

  private readonly tagService = inject(TagsService);

  public tagForm = new FormBuilder().group({
    name: new FormControl('', [Validators.required, this.noWhiteSpaceValidator]),
  });

  ngOnInit(): void {
      this.tagService.getTags().subscribe(tags => {
        this.tags = tags;
      });
  }

  private noWhiteSpaceValidator(control: FormControl): { [key: string]: boolean } | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  private joinTagWords(tagName: string): string {
    return tagName.split(' ').join('');
  }

  public addTag(): void {
    if (this.tagForm.valid) {
      let tagName = this.tagForm.value.name ?? '';
      tagName = this.joinTagWords(tagName);
      this.tagService.createTag(tagName);
      this.tagForm.reset();
    }
  }

  public deleteTag(tagId: number): void {
    this.tagService.deleteTag(tagId);
  }
}
