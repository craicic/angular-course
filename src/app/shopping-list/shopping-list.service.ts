import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';


export class ShoppingListService {

  ingredientChangedEmitter = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Tomatos', 5),
    new Ingredient('Apple', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChangedEmitter.next(this.ingredients.slice());
  }


  addIngredientsArray(ingredients: Ingredient[]) {
    for (const ingredient of ingredients) {
      this.ingredients.push(ingredient);
    }
    // or => this.ingredients.push(...ingredients);
    this.ingredientChangedEmitter.next(this.ingredients.slice());
  }
}
