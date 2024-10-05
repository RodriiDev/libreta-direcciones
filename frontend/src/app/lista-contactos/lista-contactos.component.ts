import { Component } from '@angular/core';
import { ContactoService } from '../services/contacto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-contactos',
  standalone: true,
  imports: [],
  templateUrl: './lista-contactos.component.html',
  styleUrl: './lista-contactos.component.css'
})
export class ListaContactosComponent {

  contactos: any[] = [];

  constructor(private contactoService: ContactoService, private router: Router) { }

  ngOnInit(): void {
    this.contactoService.getContacts().subscribe(data => {
      this.contactos = data;
    });
  }

  // Método para redirigir a la página de edición de contactos
  editContact(id: number): void {
    this.router.navigate(['/contacto/edit', id]); // Redirigir a la ruta de edición con el id del contacto
  }
  viewContact(id: number): void {
    this.router.navigate(['/contacto/view', id]); // Redirigir a la ruta de ver
  }

  deleteContact(id: number): void {
    this.contactoService.deleteContact(id).subscribe(() => {
      this.contactos = this.contactos.filter(contacto => contacto.id !== id);
    });
  }

  

}
