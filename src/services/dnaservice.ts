import { MESSAGES } from './../config/constants';

/**
 * Permite la validación de una cadena de ADN y si esta
 * tiene mutaciones
 */
class DnaService {
    
    //* Expresión regular que busca una secuencia de cuatro letras
    //* iguales sobre una cadena de texto.
    private validaMutacion = /A{4}|C{4}|G{4}|T{4}/gi;

    constructor() {}

    /**
     * 
     * @param dna Array de tipo string
     * @returns mensaje de tipo MESSAGES.
     * Método estático. si el valor es OK indica que la cadena pasó la validación 
     * y no tiene errores. De lo contrario regresa un mensaje de error.
     */
    static validateMatrix(dna: string[]) {

        //* Validar que el parámetro de entrada sea un Array.
        if (!Array.isArray(dna)) {
            return MESSAGES.FORMATO_ENTRADA_INVALIDO;
        }

        //* Validar que el array no esté vacío
        if (dna.length === 0) {
            return MESSAGES.FORMATO_ENTRADA_INVALIDO;
        }
        
        const dnaStr = dna.join('');

        //* verificar que la matriz sea cuadrada N x N.
        if (dna.length !== (dnaStr.length / dna.length)) {
            return MESSAGES.MATRIZ_CUADRADA;
        }
        
        //* Verificar que las cadenas no contengan caracteres inválidos.
        if (!dnaStr.match(/^[ACGT]+$/)) {
            return MESSAGES.CARACTERES_INVALIDOS;
        }
        return MESSAGES.OK;
    }

    /**
     * 
     * @param dna Array de tipo string
     * @returns true si se detectaron mutaciones. De lo contrario regresa false.
     */
    hasMutation(dna: string[]) {
        //* lleva el conteo de las secuencias encontradas
        //* El conteo NO debe ser superior a 1.
        let secuenciasRepetidas = 0;

        //* Verificar en los horizontales de la matriz
        secuenciasRepetidas +=  this.hasHorizontalSequence(dna);
        if (secuenciasRepetidas > 1) {
            return true;
        }

        //* Verificar en los verticales de la matriz
        secuenciasRepetidas += this.hasVerticalSequence(dna);
        if (secuenciasRepetidas > 1) {
            return true;
        }

        //* Verificar en las diagonales de la matriz
        secuenciasRepetidas += this.hasDiagonalSequence(dna, false);
        if (secuenciasRepetidas > 1) {
            return true;
        }

        //* Verificar en las diagonales de la matriz de abajo hacia arriba
        secuenciasRepetidas += this.hasDiagonalSequence(dna, true);
        if (secuenciasRepetidas > 1) {
            return true;
        }

        //* No hay secuencias repetidas
        return false;
    }

    /**
     * 
     * @param dna Array de string
     * @returns true si se encontró una secuencia, de lo contrario
     * regresa false.
     */
    private hasHorizontalSequence(dna: string[]): number {
        let count = 0;
        for (let i = 0; i < dna.length; i++) {
            if (dna[i].match(this.validaMutacion)) {
                ++count;
            }
        }
        return count;
    }

    /**
     * 
     * @param dna Array de string
     * @returns true si se encontró una secuencia, de lo contrario
     * regresa false.
     */
    private hasVerticalSequence(dna: string[]): number {
        let count = 0;
        for (let i = 0; i < dna.length; i++) {
            let cadena = '';
            for (let j = 0; j < dna.length; j++) {
                cadena += dna[j][i]; 
            }
            if (cadena.match(this.validaMutacion)) {
                ++count;
            }
        }
        return count;
    }

    /**
     * 
     * @param dna Array de string
     * @param bottomToTop el tipo de diagonales a obtener.
     * @returns true si se encontró una secuencia, de lo contrario
     * regresa false.
     */
    private hasDiagonalSequence(dna: string[], bottomToTop: boolean = false): number {
        let count = 0;
        for (let i = 0; i <= 2 * (dna.length - 1); ++i) {
            let cadena = '';
            for (let j = dna.length - 1; j >= 0; --j) {
                const x = i - (bottomToTop ? dna.length - j : j);
                if (x >= 0 && x < dna.length) {
                    cadena += dna[j][x];
                }
            }
            if(cadena.length > 3 && cadena.match(this.validaMutacion)) {
                ++count;
            }
        }
        return count;
    }
}

export default DnaService;