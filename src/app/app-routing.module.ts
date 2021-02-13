import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestionsComponent } from './questions/questions.component';
import { TestDataComponent } from './test-data/test-data.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'questions', component: QuestionsComponent},
  {path: 'mockdata', component: TestDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
