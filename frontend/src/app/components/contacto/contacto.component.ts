import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  newContact = {
    name: '',
    notes: '',
    birthday: '',
    website: '',
    company: '',
    phones: [''], 
    emails: [''],
    addresses: ['']
  };

  // Añadir un nuevo campo de teléfono
  addPhone() {
    this.newContact.phones.push('');
  }

  // Eliminar un campo de teléfono
  removePhone(index: number) {
    this.newContact.phones.splice(index, 1);
  }

  // Añadir un nuevo campo de email
  addEmail() {
    this.newContact.emails.push('');
  }

  // Eliminar un campo de email
  removeEmail(index: number) {
    this.newContact.emails.splice(index, 1);
  }

  // Añadir un nuevo campo de dirección
  addAddress() {
    this.newContact.addresses.push('');
  }

  // Eliminar un campo de dirección
  removeAddress(index: number) {
    this.newContact.addresses.splice(index, 1);
  }

  // Al enviar el formulario
  onSubmit() {
    if (this.newContact.name) {
      // Aquí podrías hacer el envío a una API o añadirlo a una lista local
      console.log('Nuevo contacto añadido:', this.newContact);
      alert('Contacto añadido exitosamente');
    }
  }

}
