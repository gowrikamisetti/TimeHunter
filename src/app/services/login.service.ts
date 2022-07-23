import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(private fireAuth: AngularFireAuth, private router: Router) { }

    //Login
    login(email: any, password: any) {
        return this.fireAuth.signInWithEmailAndPassword(email, password)
    }

    //register
    register(email: any, password: any) {
        return this.fireAuth.createUserWithEmailAndPassword(email, password)
    }

    //Logout
    logout() {
        this.fireAuth.signOut().then(() => {
            localStorage.removeItem('token');
            this.router.navigate(['/login'])
        })

    }

    //forgot password
    forgotPassword(email: any) {
        return this.fireAuth.sendPasswordResetEmail(email)
    }

}