import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tag } from 'src/app/interfaces/tag.interface';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private readonly storageKey = 'tags';
  private tags: Tag[] = this.loadTagsFromStorage();
  private tagsSubject$ = new BehaviorSubject<Tag[]>(this.tags);

  private loadTagsFromStorage(): Tag[] {
    const storedTags = localStorage.getItem(this.storageKey);
    return storedTags ? JSON.parse(storedTags) : [];
  }

  private saveTagsToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tags));
  }

  public getTags(): Observable<Tag[]> {
    return this.tagsSubject$.asObservable();
  }

  public createTag(name: string): void {
    const newTag: Tag = { tagId: Date.now(), name };
    this.tags.push(newTag);
    this.tagsSubject$.next(this.tags);
    this.saveTagsToStorage();
  }

  public deleteTag(tagId: number): void {
    this.tags = this.tags.filter(tag => tag.tagId !== tagId);
    this.tagsSubject$.next(this.tags);
    this.saveTagsToStorage();
  }
}
