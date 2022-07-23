import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProjectsService {
    constructor(private http: HttpClient) { }

    getProjects() {
        return this.http.get('https://timehunter-cdaf8-default-rtdb.firebaseio.com/project.json').pipe(
            map((resData: any) => {
                const projectArray = [];
                for (const key in resData) {
                    if (resData.hasOwnProperty(key)) {
                        projectArray.push({ ...resData[key], id: key });
                    }
                }
                return projectArray;
            })
        )
    }
}
