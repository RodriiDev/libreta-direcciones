import { Component } from '@angular/core';
import { ContactoService } from '../services/contacto.service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-lista-contactos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lista-contactos.component.html',
  styleUrl: './lista-contactos.component.css'
})
export class ListaContactosComponent {

  contactos: any[] = [];

  // Control para el campo de busqueda
  searchControl = new FormControl('');


  constructor(private contactoService: ContactoService, private router: Router) { }

  ngOnInit(): void {

    this.loadContacts('');

    // Escuchar cambios en el campo de búsqueda
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Retraso de 300ms para evitar demasiadas solicitudes
        distinctUntilChanged() // Solo emite el valor si ha cambiado
      )
      .subscribe((searchTerm: string | null) => {
        if (searchTerm !== null) {
          // Si hay más de 3 letras, realizar la búsqueda
          if (searchTerm.length >= 3 || searchTerm.length === 0) {
            this.loadContacts(searchTerm);
          }
        }
      });
  }

  loadContacts(searchTerm: string = ''): void{
    this.contactoService.getContacts(searchTerm).subscribe((response) => {
      this.contactos = response.data;
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
