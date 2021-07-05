import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
// Nuevo
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  usuario: UsuarioModel = new UsuarioModel();

  constructor(private auth: AuthService, private router: Router) { }


  onSubmit(form:NgForm){
    // Validación para cuandoel formulario no es correcto
    if(form.invalid){ return }

    // Mostrar loading cuando se crea la cuenta
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    // Se crea usuario
    this.auth.nuevoUsuario(this.usuario)
    .subscribe( resp => {
      Swal.close();
      this.router.navigateByUrl('/home');
      console.log(resp);

    }, err => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
     });

  }


}
