
import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class AuthService {


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
        }, err => {
            alert(err.message)
        })

    }

    //forgot password
    forgotPassword(email: any) {
        return this.fireAuth.sendPasswordResetEmail(email)
    }

    //verfication email
    sendEmailVerification(user: any) {
        user.sendEmailVerification().then((res: any) => {
            this.router.navigate(['/verify-email'])
        }, (err: any) => {
            alert("not able to send mail")
        })

    }
    isAdmin() {

    }
    //change password

    //update Profile
    // updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    //     const user = this.fireAuth.currentUser;
    //     return of(user).pipe(
    //         concatMap(user => {
    //             if (!user) throw new Error('Not Authenticated');

    //             return this.updateProfile(user, profileData);
    //         })
    //     )
    // }

    //deleteUser

}