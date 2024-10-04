import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-contactos',
  standalone: true,
  imports: [],
  templateUrl: './lista-contactos.component.html',
  styleUrl: './lista-contactos.component.css'
})
export class ListaContactosComponent {

  contacts = [
    { id: 1, name: 'Rodrigo Soto', email: 'r@mail.com', phone: '123-456-7890' },
    { id: 2, name: 'Mariana Soto', email: 'm@mail.com', phone: '098-765-4321' },
    { id: 3, name: 'Alejando M', email: 'a@mail.com', phone: '567-890-1234' }
  ];

  deleteContact(contact: any) {
    const confirmDelete = confirm(`¿Seguro que deseas eliminar a ${contact.name}?`);
    if (confirmDelete) {
      this.contacts = this.contacts.filter(c => c.id !== contact.id);
    }
  }


  searchTerm = '';

  // Buscar contacto
  searchContacts() {
    return this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.phone.includes(this.searchTerm)
    );
  }

}
