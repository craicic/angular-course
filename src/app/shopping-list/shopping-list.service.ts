import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';


export class ShoppingListService {

  ingredientChangedEmitter = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Tomatos', 5),
    new Ingredient('Apple', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChangedEmitter.emit(this.ingredients.slice());
  }


  addIngredientsArray(ingredients: Ingredient[]) {
    for (const ingredient of ingredients) {
      this.ingredients.push(ingredient);
    }
    // or => this.ingredients.push(...ingredients);
    this.ingredientChangedEmitter.emit(this.ingredients.slice());
  }
}
