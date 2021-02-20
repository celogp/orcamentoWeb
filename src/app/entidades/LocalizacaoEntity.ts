export class LocalizacaoEntity{
    id: number=0;
    cep: string=""; //maximo de 8
    logradouro?: string; //maximo de 100
    complemento?: string; //maximo de 100
    localidade?: string; //maximo de 100
    ufId: number=0; //maximo de 2
    bairro?: string; //maximo de 100
    longitude?:number;
    latitude?:number;
}