import DnaService from '../src/services/dnaservice';
import { MESSAGES } from '../src/config/constants';

describe('Verificación de mutaciones de ADN', () => {
    it('Debe retornar true, es decir se detectó mutación', () => {
        const dnaService = new DnaService();
        const result = dnaService.hasMutation([
            'ATGCGA',
            'CAGTGC',
            'TTATGT',
            'AGAAGG',
            'CCCCTA',
            'TCACTG'
        ]);
        expect(result).toBe(true);
    });

    it('Debe retornar true, es decir se detectó mutación oblicua', () => {
        const dnaService = new DnaService();
        const result = dnaService.hasMutation([
            'ATGCGA',
            'CAGTCC',
            'TTATGT',
            'AGTAGG',
            'CTCCTA',
            'TCACTG'
        ]);
        expect(result).toBe(true);
    });

    it('Debe retornar true, es decir se detectó mutación oblicua', () => {
        const dnaService = new DnaService();
        const result = dnaService.hasMutation([
            'ATGCGA',
            'CAGGCC',
            'TTATGT',
            'AGAAGG',
            'CTCCTA',
            'TCACTG'
        ]);
        expect(result).toBe(true);
    });

    it('Debe retornar true, es decir se detectó mutación vertical', () => {
        const dnaService = new DnaService();
        const result = dnaService.hasMutation([
            'ATGCGA',
            'CAGCGC',
            'TTCTGT',
            'ATAAGG',
            'CTCCTA',
            'TTACTG'
        ]);
        expect(result).toBe(true);
    });

    it('Debe retornar true, es decir se detectó mutación vertical', () => {
        const dnaService = new DnaService();
        const result = dnaService.hasMutation([
            'ATGCGA',
            'CTGCGC',
            'TTCTCA',
            'ATAAGA',
            'CGCCTA',
            'TTACTA'
        ]);
        expect(result).toBe(true);
    });

    it('Debe retornar true, es decir se detectó mutación horizontal', () => {
        const dnaService = new DnaService();
        const result = dnaService.hasMutation([
            'ATTTTA',
            'CTGCGC',
            'TTCTCC',
            'ATAAGA',
            'CGCCTA',
            'TTACTA'
        ]);
        expect(result).toBe(true);
    });

    it('Debe retornar true, es decir se detectó mutación horizontal', () => {
        const dnaService = new DnaService();
        const result = dnaService.hasMutation([
            'ATTTTA',
            'CTGCGC',
            'TTCTCC',
            'ATAAGA',
            'CAAAAA',
            'TTACTA'
        ]);
        expect(result).toBe(true);
    });

    it('Debe retornar false, es decir no se detectó mutación', () => {
        const dnaService = new DnaService();
        const result = dnaService.hasMutation([
            'ATGCGA',
            'CAGTGC',
            'TTATTT',
            'AGACGG',
            'GCGTCA',
            'TCACTG'
        ]);
        expect(result).toBe(false);
    });

    it('Debe retornar mensaje de error: Debe proporcionar una entrada de datos', () => {
        const result = DnaService.validateMatrix([]);
        expect(result).toBe(MESSAGES.FORMATO_ENTRADA_INVALIDO);
    });

    it('Debe retornar mensaje de error: La longitud de cada base debe ser igual al total de bases', () => {
        const result = DnaService.validateMatrix([
            'ATGCGA',
            'CAGTGC',
            'TTATTT',
            'AGACGG',
            'GCGTCA',
            'TCACTG',
            'TCACTG'
        ]);
        expect(result).toBe(MESSAGES.MATRIZ_CUADRADA);
    });

    it('Debe retornar mensaje de error: Solo se permiten los valores A, C, G, T en cada cadena', () => {
        const result = DnaService.validateMatrix([
            'ATGCGA',
            'CAGTGC',
            'TTATTT',
            'AGARGG',
            'GCGTCA',
            'TCACTG',
        ]);
        expect(result).toBe(MESSAGES.CARACTERES_INVALIDOS);
    });
});