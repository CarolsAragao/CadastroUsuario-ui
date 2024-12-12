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
import { ToastService } from '../../shared/toast/toast.service';
import { Utils } from '../../shared/utils/utils';
import { CalendarModule } from 'primeng/calendar';
import { Dialog } from 'primeng/dialog';

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
            CommonModule,
            CalendarModule,
            Dialog
        ],
  providers: [MessageService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
    usuarios: Usuario[] = [];
    escolaridades: Escolaridade[] = [];
    idUsuarioExclusao = '';
    usuarioClonado: { [s: string]: Usuario } = {};
    dropEscolaridade!: SelectItem[];
    visible = false;

    constructor(
                private messageService: MessageService, 
                private usuarioService: UsuarioService,
                private router: Router,
                private toast: ToastService
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

    validaUsuario(usuario: Usuario) {
        if (!Utils.validarDataNascimento(usuario.dataNascimento)){
            this.toast.showError('Erro!', 'Data de Nascimento inválida!');
            return false;
        }

        if(!Utils.validarEmail(usuario.email)){
            this.toast.showError('Erro!', 'Email inválido!');
            return false;
        }
        
        return true;
    }

    async onRowEditSave(usuario: Usuario) {
        if (usuario.id) {
            if (!this.validaUsuario(usuario)) {
                this.usuarios = await this.usuarioService.Get();
                return;
            } 
                
            await this.usuarioService.update(usuario);
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
    
    // async onRowDelete(usuario: Usuario){        
    //     const res = await this.usuarioService.delete(usuario);        
    //     if(res){
    //         this.toast.showSuccess('Sucesso!', 'Usuário excluído com sucesso!');
    //         this.usuarios = await this.usuarioService.Get();
    //     } else {
    //         this.toast.showError('Erro', 'Não foi possível deletar o usuário.');
    //     }
    // }
    abreFormulario(){
        this.router.navigate(["/Cadastro"])
    }

    showDialog(usuario: Usuario) {
        this.idUsuarioExclusao = usuario.id;
        this.visible = true;
    }

    async ExcluirUsuario() {
        const res = await this.usuarioService.delete(this.idUsuarioExclusao);        
        if(res){
            this.toast.showSuccess('Sucesso!', 'Usuário excluído com sucesso!');
            this.usuarios = await this.usuarioService.Get();
        } else {
            this.toast.showError('Erro', 'Não foi possível deletar o usuário.');
        }
        this.visible = false;
    }
    
    CancelarExclusao() {
        this.idUsuarioExclusao = '';
        this.visible = false;
    }    
}
