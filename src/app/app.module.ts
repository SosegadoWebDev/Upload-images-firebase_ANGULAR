
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routes
import { APP_ROUTES } from './app.routes';

// Components
import { AppComponent } from './app.component';
import { PhotosComponent } from './components/photos/photos.component';
import { LoadingComponent } from './components/loading/loading.component';

// Angular fire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Services
import { LoadImagesService } from './services/load-images.service';

import { environment } from 'src/environments/environment';

// Directives
import { DropFilesDirective } from './directives/drop-files.directive';

@NgModule({
    declarations: [
        AppComponent,
        PhotosComponent,
        LoadingComponent,
        DropFilesDirective
    ],
    imports: [
        BrowserModule,
        APP_ROUTES,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule
    ],
    providers: [
        LoadImagesService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
