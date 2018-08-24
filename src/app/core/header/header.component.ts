import { Component } from "@angular/core";
import { Response } from '@angular/http';
import { Router } from "@angular/router";
import { DataStorageService } from "../../shared/data-storage.service";
import { AuthService } from "../../auth/auth.service";

@Component({
    'selector': 'app-header',
    'templateUrl': 'header.component.html'
})
export class HeaderComponent {
    constructor(private dataStorageService: DataStorageService,
        public authService: AuthService,
        private router: Router) {

    }
    onSave() {
        this.dataStorageService.storeRecipes().subscribe((response): void => {
            console.log(response);
        })
    }
    onFetch() {
        this.dataStorageService.getRecipes();
        this.router.navigate(["/recipes"]);
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(["/"]);
    }
}