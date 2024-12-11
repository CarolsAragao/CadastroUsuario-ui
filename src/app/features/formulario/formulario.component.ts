import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Usuario } from '../../core/models/usuarios/usuario';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabel } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
            InputTextModule,
            FormsModule,
            ReactiveFormsModule,
            ButtonModule,
            CommonModule,
            FloatLabel,
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
    { label: 'Ensino Fundamental', value: 'fundamental' },
    { label: 'Ensino Médio', value: 'medio' },
    { label: 'Ensino Superior', value: 'superior' },
    { label: 'Pós-graduação', value: 'pos' }
  ];

  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', Validators.required],
      escolaridade: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Dados do usuário:', this.userForm.value);
      // Aqui você pode chamar um serviço para salvar os dados
    } else {
      console.error('Formulário inválido');
    }
  }
}
