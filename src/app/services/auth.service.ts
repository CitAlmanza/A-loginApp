import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url= 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyD8nvltM4ZLX9Cx6UNRncXnHrUYsnmf3QU';

  userToken: string;

  // Crear un nuevo usuario (registrarse)
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // Iniciar sesión (Login)
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http : HttpClient) {
    this.leerToken();
  }

  logout (){

  }
  login (usuario: UsuarioModel) {
    const authData = {
      // email: usuario.email,  password: usuario.password,
      ...usuario,
      returnSecureToken: true
    }
    return this.http.post(`${ this.url}signInWithPassword?key=${this.apikey}`,authData).pipe(
      map( res => {
        console.log('Entró al map de rxjs');
        this.guardarToken(res['idToken']);
        return res;
      })
    );

  }

  nuevoUsuario (usuario:UsuarioModel){
    const authData = {
      // email: usuario.email,  password: usuario.password,
      ...usuario,
      returnSecureToken: true
    }

    return this.http.post(`${ this.url}signUp?key=${this.apikey}`,authData)
    .pipe(
      map( res => {
        console.log('Entró al map de rxjs');
        this.guardarToken(res['idToken']);
        return res;
      })
    );

  }

  guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
    return this.userToken;
  }
}
