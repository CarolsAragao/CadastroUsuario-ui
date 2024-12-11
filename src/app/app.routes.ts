import { Routes } from '@angular/router';
import { TableComponent } from './features/table/table.component';
import { FormularioComponent } from './features/formulario/formulario.component';

export const routes: Routes = [
    {path: '', component: TableComponent},
    {path: 'Cadastro', component: FormularioComponent}
];
