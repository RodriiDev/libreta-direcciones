import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ContactoService } from '../../services/contacto.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,FormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  contacto = {
    nombre: '',
    notas: '',
    cumpleanos: '',
    pagina_web: '',
    empresa: '',
    telefonos: [
      { telefono: '' },
      { telefono: '' } 
    ],
    emails: [
      { email: '' },
      { email: '' } 
    ],
    direcciones: [
      { direccion: '' },
      { direccion: '' } 
    ]
  };

  isEditMode = false; // Para determinar si estamos en modo de edición o no
  contactoId: number | null = null; // Para almacenar el ID del contacto a editar
  isViewMode = false;  // Modo de vista

  constructor(
    private contactoService: ContactoService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificar si estamos en modo de edición leyendo el ID de la URL
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.contactoId = +id;
        // Verificar si estamos en modo vista o edición
        if (this.route.snapshot.url[1].path === 'view') {
          this.isViewMode = true;
        } else {
          this.isEditMode = true;
        }
        this.loadContact(this.contactoId); // Cargar los datos del contacto
      }
    });
  }

  //Cargar los datos del contacto si estamos en modo de edición
  loadContact(id: number): void {
    this.contactoService.getContact(id).subscribe((contacto) => {
      this.contacto = contacto; // Llenar el formulario con los datos del contacto
      console.log(this.contacto);

      if (!this.contacto.telefonos || this.contacto.telefonos.length === 0) {
        this.contacto.telefonos = [{ telefono: '' }, { telefono: '' }];
      }
      else if(this.contacto.telefonos.length === 1){
        this.contacto.telefonos.push({ telefono: '' });
      }

      if (!this.contacto.emails || this.contacto.emails.length === 0) {
        this.contacto.emails = [{ email: '' }, { email: '' }];
      }
      else if(this.contacto.emails.length === 1){
        this.contacto.emails.push({ email: '' });
      }

      if (!this.contacto.direcciones || this.contacto.direcciones.length === 0) {
        this.contacto.direcciones = [{ direccion: '' }, { direccion: '' }];
      }
      else if(this.contacto.direcciones.length === 1){
        this.contacto.direcciones.push({ direccion: '' });
      }
    });
  }

  //Maneja la creacion o edicion del contacto
  saveOrUpdateContact(): void {
    if (this.isEditMode && this.contactoId !== null) {
      // Si estamos en modo de edicion, actualizar el contacto
      this.contactoService.updateContact(this.contactoId, this.contacto).subscribe(
        (response) => {
          console.log('Contacto actualizado:', response);
          this.router.navigate(['/lista-contactos']);
        },
        (error) => {
          console.error('Error al actualizar el contacto:', error);
        }
      );
    } else {
      // Si no estamos en modo de edición, crear un nuevo contacto
      this.contactoService.createContact(this.contacto).subscribe(
        (response) => {
          console.log('Contacto creado:', response);
          this.router.navigate(['/lista-contactos']);
        },
        (error) => {
          console.error('Error al crear contacto:', error);
        }
      );
    }
  }

}
