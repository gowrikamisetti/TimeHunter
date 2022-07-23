import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class DeptService {
    constructor(private http: HttpClient) { }
    getDept() {
        return this.http.get('https://timehunter-cdaf8-default-rtdb.firebaseio.com/dept.json').pipe(
            map((resData: any) => {
                const deptArray = [];
                for (const key in resData) {
                    if (resData.hasOwnProperty(key)) {
                        deptArray.push({ ...resData[key], id: key });
                    }
                }
                return deptArray;
            })
        )
    }
}