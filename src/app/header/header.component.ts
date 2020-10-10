import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  isAuthenticated: boolean;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
  }

  ngOnInit() {
    this.isAuthenticated = false;
    this.userSubscription = this.authService.user.subscribe(user => {
      if (user !== null) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipe();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipe().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
