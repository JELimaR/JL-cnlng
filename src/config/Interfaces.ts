
export default interface IConfig  {
    phonemes: IPhonemesSets;
    orth: IOrths;
    wordSchemas: IWordLangSets<string>;
    morphStructures: string[];
}

/* Arreglos con length minimo*/
export interface IArray1<T> extends Array<T> { 0: T; }
export interface IArray2<T> extends Array<T> { 0: T; 1: T; }
export interface IArray5<T> extends Array<T> {
    0: T; 1: T; 2: T; 3: T; 4: T; 5: T;
}

export interface IWordLangSets<T> {
    'Defaults': Set<T>,
    'PersonNeutralNames': Set<T>,
    'BoyNames': Set<T>,
    'GirlNames': Set<T>,
    'Jobs': Set<T>,
    'Civilizatitons': Set<T>,
    'Regions': Set<T>,
    'FamilyNames': Set<T>,
    'FamilyNeutralNames'?: Set<T>,
    'Towns': Set<T>,
    'Organizations'?: Set<T>,
}

export interface IMorphemeLangSets<T> {
    'defaults': Set<T>,
    'landOf': Set<T>,
    'demonym': Set<T>,
    'jobs': Set<T>,
    'sonOf': Set<T>,
    'daughterOf': Set<T>,
    'bnames': Set<T>,
    'gnames': Set<T>,
}

export type schemaCodes = 
    // wordsSchemasCode-words
    | 'D'
    | 'P'
    | 'B'
    | 'G'
    | 'J'
    | 'C'
    | 'R'
    | 'F'
    | 'N'
    | 'T'
    | 'O'
    
    // wordsSchemasCode-morphemes
    | 'd'
    | 'l'
    | 'y'
    | 'j'
    | 's'
    | 'o'
    | 'b'
    | 'g'

export const schemasCodeMap = {
    // wordsSchemasCode-words
    D: 'Defaults',
    P: 'PersonNeutralNames',
    B: 'BoyNames',
    G: 'GirlNames',
    J: 'Jobs',
    C: 'Civilizatitons',
    R: 'Regions',
    F: 'FamilyNames',
    N: 'FamilyNeutralNames',
    T: 'Towns',
    O: 'Organizations',
    
    // wordsSchemasCode-morphemes
    d: 'defaults',
    l: 'landOf', // tierra de, pueblo de,
    y: 'demonym', // gentilicio
    j: 'jobs', // oficio
    s: 'sonOf',
    o: 'daughterOf',
    b: 'bnames',
    g: 'gnames',
}

export interface IOrths {
    corth: ICorth;
    vorth: IVorth;
}

export interface ICorth {
    'ʃ'?: string;
    'ʒ'?: string;
    'ʧ'?: string;
    'ʤ'?: string;
    'ŋ'?: string;
    'j'?: string;
    'x'?: string;
    'ɣ'?: string;
}

export interface IVorth  {
    'A'?: string;
    'E'?: string;
    'I'?: string;
    'O'?: string;
    'U'?: string;
}

export interface IPhonemesSets {
    cons: IArray5<string>;
    vows: IArray2<string>;
    ls?: string[];
    ds?: string[];
    ss?: string[];
    fs?: string[];
}