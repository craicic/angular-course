import {NgModule} from '@angular/core';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {FormsModule} from '@angular/forms';
import {ShoppingListRoutingModule} from './shopping-list-routing.module';
import {SharedModule} from '../shared/shared.module';
import {LoggingService} from '../logging.service';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    // This is overkill cause we only need CommonModule, but it's to demonstrated
    SharedModule,
    FormsModule,
    ShoppingListRoutingModule
  ]
})
export class ShoppingListModule {
}
