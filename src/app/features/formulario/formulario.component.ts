import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Usuario } from '../../core/models/usuarios/usuario';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { UsuarioService } from '../../core/services/usuarios.service';
import { ToastService } from '../../shared/toast/toast.service';

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

  userForm!: FormGroup;
  escolaridadeOptions = [
    { label: 'Ensino Fundamental', value: 1 },
    { label: 'Ensino Médio', value: 2 },
    { label: 'Ensino Superior', value: 3 },
    { label: 'Pós-graduação', value: 4 }
  ];

  constructor(
              private fb: FormBuilder, 
              private usuarioService: UsuarioService,
              private toast: ToastService
            ){}

  ngOnInit() {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', Validators.required],
      escolaridade: ['', Validators.required]
    });
  }

  validarDataNascimento(data: Date){
    const dataComparar = new Date(data);
    const hoje = new Date();

    if (dataComparar.getTime() > hoje.getTime()) return false;
    return true;
  }

  onSubmit() {   
    if (this.userForm.valid) {
      if (!this.validarDataNascimento(this.userForm.value.dataNascimento)){
        return this.toast.showError('Error!', 'Data de Nascimento inválida.')
      }    
      this.usuario.nome = this.userForm.value.nome;
      this.usuario.sobrenome = this.userForm.value.sobrenome;
      this.usuario.email = this.userForm.value.email;
      this.usuario.dataNascimento = this.userForm.value.dataNascimento;
      this.usuario.escolaridadeId = this.userForm.value.escolaridade.value;

    } else {
      this.toast.showError('Error!', 'Formulário Inválido.')
    }
  }
}
