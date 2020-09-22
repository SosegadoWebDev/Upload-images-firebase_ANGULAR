import { Component, OnInit } from '@angular/core';

// Services
import { LoadImagesService } from 'src/app/services/load-images.service';

// Models
import { FileItem } from 'src/app/models/file-item';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

    public files: Array<FileItem>;
    public isAboveElement: boolean;

    constructor(
        private photoService: LoadImagesService
    ) {
        this.files = [];
    }

    ngOnInit() {
    }

    public loadPhoto() {
        this.photoService.loadPhotos(this.files);
    }

    public onMouseAbove(evt) {
        this.isAboveElement = evt;
    }

    public clearFiles() {
        this.files = [];
    }
}
