import { Routes } from '@angular/router';
import { GuideViewerComponent } from './components/guide-viewer/guide-viewer.component';

export const routes: Routes = [
  { path: '', component: GuideViewerComponent },           // página principal con welcome
  { path: 'guia/:path', component: GuideViewerComponent } // rutas de ciudades/lugares
];
