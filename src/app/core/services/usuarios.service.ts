import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Escolaridade, Usuario } from '../models/usuarios/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  apiUrl = 'https://localhost:7050/api/';

  constructor(public http: HttpClient
   ){}

  async Get() { 
    return firstValueFrom(this.http.get<Usuario[]>(`${this.apiUrl}Usuario`))   
  }

  async GetEscolaridade() { 
    return firstValueFrom(this.http.get<Escolaridade[]>(`${this.apiUrl}Usuario/GetEscolaridade`))   
  }

  updateUsuario(usuario: Usuario) {
    return firstValueFrom(this.http.put<number>(`${this.apiUrl}Usuario`, usuario));
  }

}