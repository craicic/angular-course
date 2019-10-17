import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, RouterModule} from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  private welcomeMessage: string;
  private id: number;
  private editMode = false;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
      }
    );
    //
    // if (this.route.snapshot.routeConfig.path === 'new') {
    //   this.welcomeMessage = 'WIP !!! Soon you\'ll be able to add a new recipe';
    // } else {
    //   this.welcomeMessage = 'WIP !!! Soon you\'ll be able to edit an exiting recipe';
    // }
  }
}
