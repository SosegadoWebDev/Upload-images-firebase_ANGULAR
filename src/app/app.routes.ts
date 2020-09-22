import { LoadingComponent } from './components/loading/loading.component';
import { PhotosComponent } from './components/photos/photos.component';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
    { path: 'photos', component: PhotosComponent },
    { path: 'loading', component: LoadingComponent },
    { path: 'photos', component: PhotosComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'photos' },
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);
