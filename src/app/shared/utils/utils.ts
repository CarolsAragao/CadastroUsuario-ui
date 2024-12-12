export class Utils {
static validarDataNascimento(data: Date){
    const dataComparar = new Date(data);
    const hoje = new Date();

    if (dataComparar.getTime() > hoje.getTime()) return false;
    return true;
  }

  static validarEmail(email: string){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);    
  }
}