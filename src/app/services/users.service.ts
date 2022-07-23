import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class UserService {
    constructor(private http: HttpClient) { }
    getUser() {
        return this.http.get('https://timehunter-cdaf8-default-rtdb.firebaseio.com/users.json').pipe(
            map((usersData: any) => {
                const usersArray = [];
                for (const key in usersData) {
                    if (usersData.hasOwnProperty(key)) {
                        usersArray.push({ ...usersData[key], id: key });
                    }
                }
                return usersArray;
            })
        )
    }
}