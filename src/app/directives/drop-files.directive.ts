import {
    Directive,
    EventEmitter,
    ElementRef,
    HostListener,
    Input,
    Output
} from '@angular/core';

// Models
import { FileItem } from '../models/file-item';

@Directive({
    selector: '[appDropFiles]'
})

export class DropFilesDirective {

    @Input() files: Array<FileItem> = [];
    @Output() isMouseAbove: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    @HostListener('dragover', ['$event'])
    public onDragEnter(evt) {
        this.isMouseAbove.emit(true);
        this.preventDefaultEvent(evt);
    }

    @HostListener('dragleave', ['$event'])
    public onDragLeave(evt) {
        this.isMouseAbove.emit(false);
    }

    @HostListener('drop', ['$event'])
    public onDrop(evt) {
        const dataTransfer = this.getTransferFile(evt);

        if (!dataTransfer) {
            return;
        }
        this.getFiles(dataTransfer.files);
        this.preventDefaultEvent(evt);
        this.isMouseAbove.emit(false);
    }

    // Adding this validation for differents navigation browsers
    private getTransferFile(event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    }

    private getFiles(fileList: FileList) {
        // tslint:disable-next-line: forin
        for (const property in Object.getOwnPropertyNames(fileList)) {
            const itemFile = fileList[property];

            if (this.fileValidToUpload(itemFile)) {
                const newFileItem = new FileItem(itemFile);
                this.files.push(newFileItem);
            }
        }
    }

    // Validations
    private fileValidToUpload(file: File): boolean {
        if (!this.isFileDuplicated(file.name) && this.isImageTypeValid(file.type)) {
            return true;
        } else {
            return false;
        }
    }

    private preventDefaultEvent(event): void {
        event.preventDefault();
        event.stopPropagation();
    }

    private isFileDuplicated(name: string): boolean {
        for (const file of this.files) {
            if (file.name === name) {
                console.log('Archivo duplicado: ' + file.name);
                return true;
            }
        }

        return false;
    }

    private isImageTypeValid(type: string): boolean {
        return (type === '' || type === undefined) ? false : type.startsWith('image');
    }
}
