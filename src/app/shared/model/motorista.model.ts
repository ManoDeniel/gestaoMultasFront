import { Endereco } from './endereco.model';
import { Multa } from './multa.model';
import { Telefone } from './telefone.model';
import { Veiculo } from './veiculo.model';

export class Motorista {
    motoristaId: number;
    cpf: string;
    nome: string;
    sobrenome: string;
    numeroCNH: string;
    endereco: Endereco;
    telefone: Telefone;
    veiculos?: Veiculo[];
    multas?: Multa[];
}
