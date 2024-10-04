import { Routes } from '@angular/router';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ListaContactosComponent } from './lista-contactos/lista-contactos.component';

export const routes: Routes = [
    { path: 'nuevo-contacto', component: ContactoComponent },
    { path: 'lista-contactos', component: ListaContactosComponent },
    { path: '', redirectTo: 'lista-contactos', pathMatch:'full'}
];
