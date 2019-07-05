import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';

export class RecipeService {

  recipeSelectedEmitter = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'this is simply a test',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
    new Recipe(
      'A second recipe',
      'this is a second test',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg')

  ];

  getRecipes() {
    // use slice to get a copy and not a reference
    return this.recipes.slice();
  }



}
