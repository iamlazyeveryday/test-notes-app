export interface Note {
  title: string;
  content: string;
  tags: string[];
  noteId: number;
  showOptionsMenu: boolean;
  dueDate?: Date;
}
