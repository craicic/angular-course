import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty beef',
      'This is really tasty',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [new Ingredient('Tomato', 5),
        new Ingredient('Beef', 1),
        new Ingredient('Concombre', 1)]),

    new Recipe(
      'Spaghetti bolognaise',
      'Say it in French',
      'https://static.cuisineaz.com/240x192/i84653-spaghettis-bolognaise-rapides.jpg',
      [new Ingredient('Tomato', 5),
        new Ingredient('Spaghetti', 100),
        new Ingredient('Steak', 1)])
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes() {
    // use slice to get a copy and not a reference
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToSL(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredientsArray(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
