import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient('Tomatos', 5),
    new Ingredient('Apple', 10)
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onIngredientAdded(ingredientToAdd: Ingredient) {
    this.ingredients.push(ingredientToAdd);
  }
}
