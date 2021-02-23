import { Veiculo } from './veiculo.model';

export class Multa {
    multaId: number;
    numeroInfracao: string;
    tipoInfracao: string;
    descricaoInfracao: string;
    orgaoAutuador: string;
    valor: number;
    pontuacao: number;
    dataEmissao: string;
    dataVencimento: string;
    motoristaId: number;
    veiculoId: number;
}