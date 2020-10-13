import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class ShoppingListService {

  ingredientChangedEmitter = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

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

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredientsArray(ingredients: Ingredient[]) {
    for (const ingredient of ingredients) {
      this.ingredients.push(ingredient);
    }
    // or => this.ingredients.push(...ingredients);
    this.ingredientChangedEmitter.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChangedEmitter.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChangedEmitter.next(this.ingredients.slice());
  }
}
