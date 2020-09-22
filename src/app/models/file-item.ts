export class FileItem {
    public file?: File;
    public name?: string;
    public url?: string;
    public status?: boolean;
    public progress?: number;

    constructor(file: File) {
        this.file = file;
        this.name = file.name;
        this.status = false;
        this.progress = 0;
    }
}
