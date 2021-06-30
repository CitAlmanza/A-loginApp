import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url= 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyD8nvltM4ZLX9Cx6UNRncXnHrUYsnmf3QU';

  // Crear un nuevo usuario (registrarse)
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // Iniciar sesión (Login)
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http : HttpClient) {

  }

  logout (){

  }
  login (usuario: UsuarioModel) {
    const authData = {
      // email: usuario.email,  password: usuario.password,
      ...usuario,
      returnSecureToken: true
    }
    return this.http.post(`${ this.url}signInWithPassword?key=${this.apikey}`,authData);

  }

  nuevoUsuario (usuario:UsuarioModel){
    const authData = {
      // email: usuario.email,  password: usuario.password,
      ...usuario,
      returnSecureToken: true
    }

    return this.http.post(`${ this.url}signUp?key=${this.apikey}`,authData);

  }
}
