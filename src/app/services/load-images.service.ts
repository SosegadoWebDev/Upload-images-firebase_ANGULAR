import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';

// Angular firestore
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

// Models
import { FileItem } from '../models/file-item';

@Injectable({
    providedIn: 'root'
})

export class LoadImagesService {

    private FOLDER = 'photos';

    constructor(
        private db: AngularFirestore,
        private storage: AngularFireStorage
    ) { }

    public savePhoto(photo: { name: string, url: string }) {
        this.db.collection(`/${this.FOLDER}`).add(photo);
    }

    public loadPhotos(photos: Array<FileItem>) {
        console.log(photos);

        for (const item of photos) {
            const randomId = Math.random().toString(36).substring(2);
            const storagePath = `${this.FOLDER}/test_${randomId}`;
            const storageRef = this.storage.ref(storagePath);
            item.status = true;

            if (item.progress >= 100) {
                continue;
            }

            const uploadTask = this.storage.upload(storagePath, item.file);
            uploadTask.percentageChanges().subscribe(progress => {
                item.progress = progress;
            });

            uploadTask.snapshotChanges().pipe(finalize(() => {
                storageRef.getDownloadURL().subscribe(resp => {
                    item.url = resp;
                    this.savePhoto({ name: item.name, url: item.url });
                });
            })).subscribe(() => item.status = false);
        }
    }
}
