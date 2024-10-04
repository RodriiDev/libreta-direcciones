import { Component } from '@angular/core';
import { ContactoService } from '../services/contacto.service';

@Component({
  selector: 'app-lista-contactos',
  standalone: true,
  imports: [],
  templateUrl: './lista-contactos.component.html',
  styleUrl: './lista-contactos.component.css'
})
export class ListaContactosComponent {

  /* contacts = [
    { id: 1, name: 'Rodrigo Soto', email: 'r@mail.com', phone: '123-456-7890' },
    { id: 2, name: 'Mariana Soto', email: 'm@mail.com', phone: '098-765-4321' },
    { id: 3, name: 'Alejando M', email: 'a@mail.com', phone: '567-890-1234' }
  ]; */

  contactos: any[] = [];

  constructor(private contactoService: ContactoService) { }

  ngOnInit(): void {
    this.contactoService.getContacts().subscribe(data => {
      this.contactos = data;
    });
  }

  deleteContact(id: number): void {
    this.contactoService.deleteContact(id).subscribe(() => {
      this.contactos = this.contactos.filter(contacto => contacto.id !== id);
    });
  }

  

}
