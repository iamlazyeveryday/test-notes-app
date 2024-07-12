import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public readonly title = 'Приложение для заметок';
  public readonly notes = 'Заметки';
  public readonly reminders = 'Напоминания';
  public readonly tags = 'Тэги';


}
