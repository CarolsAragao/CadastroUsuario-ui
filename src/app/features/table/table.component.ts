import { Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Usuario } from '../../core/models/usuarios/usuario';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    clonedProducts: { [s: string]: Usuario } = {};
    statuses!: SelectItem[];
    constructor(private messageService: MessageService) {}

    ngOnInit() {
        // this.productService.getProductsMini().then((data) => {
        //     this.usuario = data;
        // });

        this.statuses = [
            { label: 'INFANTIL', value: 'INFANTIL' },
            { label: 'FUNDAMENTAL', value: 'FUNDAMENTAL' }
        ];

        let teste = new Usuario();
        teste.id = '1';
        teste.nome = 'Vitor';
        teste.sobrenome = 'Frankenstein';
        teste.email = 'Frank@gmail.com';
        teste.dataNascimento = new Date(2024,10,25);   
        teste.escolaridade = this.statuses[0].value;  

        this.usuarios.push(teste);

        console.log('NgOnInit', this.usuarios);

      
    }

    onRowEditInit(usuario: Usuario) {
        this.clonedProducts[usuario.id as string] = { ...usuario };
    }

    onRowEditSave(usuario: Usuario) {
        if (usuario.id) {
            console.log('onRowEditSave', usuario);            
            // delete this.clonedProducts[product.id as string];
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
        }
    }

    onRowEditCancel(usuario: Usuario, index: number) {
        this.usuarios[index] = this.clonedProducts[usuario.id as string];
        delete this.clonedProducts[usuario.id as string];
    }     
    
}
