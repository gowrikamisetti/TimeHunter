import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class ClientService {
    constructor(private http: HttpClient) { }
    dept: any;
    getClient() {
        return this.http.get('https://timehunter-cdaf8-default-rtdb.firebaseio.com/client.json').pipe(
            map((resData: any) => {
                const clientArray = [];
                for (const key in resData) {
                    if (resData.hasOwnProperty(key)) {
                        clientArray.push({ ...resData[key], id: key });
                    }
                }
                return clientArray;
            })
        )
    }
}