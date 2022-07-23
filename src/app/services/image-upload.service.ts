import { Injectable } from "@angular/core";
import { ref, Storage } from '@angular/fire/storage'
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { from, Observable, switchMap } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class ImageUploadService {
    constructor(private storage: Storage) { }
    uploadImage(image: File, path: string): Observable<String> {
        const storageRef = ref(this.storage, path);
        const uploadTask = from(uploadBytes(storageRef, image));
        return uploadTask.pipe(
            switchMap((result) => getDownloadURL(result.ref))
        );
    }
}