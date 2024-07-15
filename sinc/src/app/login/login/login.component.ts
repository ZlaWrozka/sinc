import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true,
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        CommonModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
    ]
})
export class LoginComponent {
    usernameControl = new FormControl('', Validators.required);
    passwordControl = new FormControl('', Validators.required);

    logIn(): void {
        if (this.usernameControl.invalid || this.passwordControl.invalid) {
            this.usernameControl.markAllAsTouched();
            this.passwordControl.markAllAsTouched();
            return;
        }

        const username = this.usernameControl.value;
        const password = this.passwordControl.value;

        // Call service method 
    }
}
