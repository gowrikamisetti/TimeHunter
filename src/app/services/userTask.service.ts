import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class taskService {
    loading = true;


    constructor(private http: HttpClient) { }
    dept: any;
    getTask() {
        let name: any;
        name = localStorage.getItem('gowri');
        return this.http.get(`https://timehunter-cdaf8-default-rtdb.firebaseio.com/users/${name}/task.json`).pipe(
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