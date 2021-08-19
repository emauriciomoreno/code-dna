//* Es utilizada para almacenar una cadena de ADN y el resultado de la verificación
export interface IVerificacionAdn {
    _id?: string;
    dna: string[];
    dnastr: string;
    mutacion: boolean;
}
