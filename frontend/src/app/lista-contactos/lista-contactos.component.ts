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

  // Redirigir a la página de edición de contactos
  editContact(id: number): void {
    this.router.navigate(['/contacto/edit', id]);
  }
  viewContact(id: number): void {
    this.router.navigate(['/contacto/view', id]); // Redirigir a la ruta de ver
  }

  //Confirmar y eliminar el contacto
  confirmDelete(contactId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
      this.borrarContacto(contactId);
    }
  }

  // Método para eliminar el contacto
  borrarContacto(contactId: number): void {
    this.contactoService.deleteContact(contactId).subscribe(
      (response) => {
        console.log('Contacto eliminado con éxito:', response);
        this.searchControl.setValue('');
        this.loadContacts();
      },
      (error) => {
        console.error('Error al eliminar el contacto:', error);
      }
    );
  }

  

}
