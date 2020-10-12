import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes.component';
import {AuthGuard} from '../auth/auth.guard';
import {RecipePlaceholderComponent} from './recipe-placeholder/recipe-placeholder.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipesResolverService} from './recipes-resolver.service';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';

const routes: Routes = [
  {
    path: 'recipes', component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: RecipePlaceholderComponent},
      {path: 'new', component: RecipeEditComponent},
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {
}
