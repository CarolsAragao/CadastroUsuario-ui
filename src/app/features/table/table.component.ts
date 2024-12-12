import { Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Escolaridade, Usuario } from '../../core/models/usuarios/usuario';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../core/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
            TableModule, 
            ToastModule, 
            CommonModule, 
            TagModule, 
            SelectModule, 
            ButtonModule, 
            InputTextModule,
            FormsModule,
            ReactiveFormsModule,
            ButtonModule,
            CommonModule
        ],
  providers: [MessageService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
    usuarios: Usuario[] = [];
    escolaridades: Escolaridade[] = [];
    usuarioClonado: { [s: string]: Usuario } = {};
    dropEscolaridade!: SelectItem[];

    constructor(
                private messageService: MessageService, 
                private usuarioService: UsuarioService,
                private router: Router
            ) {}

    async ngOnInit() {      
        this.usuarios = await this.usuarioService.Get();

        this.escolaridades = await this.usuarioService.GetEscolaridade();
        this.dropEscolaridade = this.escolaridades.map(escolaridade => ({
            label: escolaridade.descricao,
            value: escolaridade.id
          }));
    }

    onRowEditInit(usuario: Usuario) {
        this.usuarioClonado[usuario.id as string] = { ...usuario };
    }

    async onRowEditSave(usuario: Usuario) {
        if (usuario.id) {
            await this.usuarioService.update(usuario);
            usuario.escolaridade = new Escolaridade();
            delete this.usuarioClonado[usuario.id as string];
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
            this.usuarios = await this.usuarioService.Get();
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
        }
    }

    onRowEditCancel(usuario: Usuario, index: number) {
        this.usuarios[index] = this.usuarioClonado[usuario.id as string];
        delete this.usuarioClonado[usuario.id as string];
    }     

    abreFormulario(){
        this.router.navigate(["/Cadastro"])
    }
    
}
