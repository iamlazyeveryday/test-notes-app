import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemindersListComponent } from './reminders-list/reminders-list.component';

const routes: Routes = [
    {
        path: '',
        component: RemindersListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RemindersRouting { }
