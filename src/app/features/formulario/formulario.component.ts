import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Escolaridade, Usuario } from '../../core/models/usuarios/usuario';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { UsuarioService } from '../../core/services/usuarios.service';
import { ToastService } from '../../shared/toast/toast.service';
import { Router } from '@angular/router';
import { Utils } from '../../shared/utils/utils';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
            InputTextModule,
            FormsModule,
            ReactiveFormsModule,
            ButtonModule,
            CommonModule,
            DropdownModule,
            CalendarModule
          ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit{
  usuario = new Usuario();
  escolaridades: Escolaridade[] = [];
  userForm!: FormGroup;

  constructor(
              private fb: FormBuilder, 
              private usuarioService: UsuarioService,
              private toast: ToastService,
              private router: Router
            ){}

  async ngOnInit() {
    this.escolaridades = await this.usuarioService.GetEscolaridade(); 

    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', Validators.required],
      escolaridade: ['', Validators.required]
    });
  }
  async onSubmit() {   
    console.log('FORM', this.userForm.value);
    if (this.userForm.valid) {
      if (!Utils.validarDataNascimento(this.userForm.value.dataNascimento)){
        return this.toast.showError('Error!', 'Data de Nascimento inválida.')
      }    

      this.usuario.nome = this.userForm.value.nome;
      this.usuario.sobrenome = this.userForm.value.sobrenome;
      this.usuario.email = this.userForm.value.email;
      this.usuario.dataNascimento = this.userForm.value.dataNascimento;
      this.usuario.escolaridadeId = this.userForm.value.escolaridade.id;      
      
      const res = await this.usuarioService.create(this.usuario);
      if(res) {
         this.toast.showSuccess('Sucesso!', 'Usuário criado com sucesso!')
        this.router.navigate(['']);
      } else {
        return this.toast.showError('Error!', 'Erro ao criar usuário.')
      }
    } else {
      this.toast.showError('Error!', 'Formulário Inválido.')
      this.router.navigate(['']);
    }
  }

  voltar() {
    this.router.navigate(['']);
  }
}
