import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { from, map, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdminProfileService {
    name: any;
    constructor(private http: HttpClient) { }

    getProfile() {
        return this.http.get('https://timehunter-cdaf8-default-rtdb.firebaseio.com/admin_profile.json').pipe(
            map((resData: any) => {
                const profileArray = [];
                for (const key in resData) {
                    if (resData.hasOwnProperty(key)) {
                        profileArray.push({ ...resData[key], id: key });
                    }

                }
                return profileArray;
            })
        )

    }
    getuserProfile() {

        let name: any;
        name = localStorage.getItem('gowri');
        return this.http.get(`https://timehunter-cdaf8-default-rtdb.firebaseio.com/users/${name}.json`).pipe(
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

    uploading(mountain: File) {
        const storage = getStorage();
        const name: any = localStorage.getItem('gowri')
        console.log("name", name);

        const mountainsRef = ref(storage, name);
        const uploadTash = from(uploadBytes(mountainsRef, mountain));
        return uploadTash.pipe(
            switchMap((result) =>
                getDownloadURL(result.ref)
            )
        )
    }

}