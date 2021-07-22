
export type SchemaCodeExtended = MorphSchemaCode | WordSchemaCode | SpecialMorphemeCode | 'M' | 'm' | ' ' | '-';

export const isSchemaCodeExtended = (s: string): boolean => {
    return (
           s === 'D'
        || s === 'P'
        || s === 'B'
        || s === 'G'
        || s === 'J'
        || s === 'C'
        || s === 'R'
        || s === 'F'
        || s === 'N'
        || s === 'T'
        || s === 'O'
        || s === 'd'
        || s === 'l'
        || s === 'y'
        || s === 'j'
        || s === 's'
        || s === 'o'
        || s === 'b'
        || s === 'g'
        || s === 'M'
        || s === 'm'
        || s === ' '
        || s === '-'
        || s === 'p'
        || s === '1'
        || s === '2'
    );
}

export interface IWordLangSets<T> {
    'Defaults': Set<T>;
    'PersonNeutralNames': Set<T>;
    'BoyNames': Set<T>;
    'GirlNames': Set<T>;
    'Jobs': Set<T>;
    'Civilizatitons': Set<T>;
    'Regions': Set<T>;
    'FamilyNames': Set<T>;
    'FamilyNeutralNames': Set<T>;
    'Towns': Set<T>;
    'Organizations': Set<T>;
}

export interface IMorphemeLangSets<T> {
    'defaults': Set<T>;
    'landOf': Set<T>;
    'demonym': Set<T>;
    'jobs': Set<T>;
    'sonOf': Set<T>;
    'daughterOf': Set<T>;
    'bnames': Set<T>;
    'gnames': Set<T>;
}

export interface ISpecialMorphemes<T> {
    genre: {
        'm': T;
        'f': T;
    }
    plural: T;
}

export type WordKey = keyof IWordLangSets<string>

export type MorphKey = keyof IMorphemeLangSets<string>

export type WordSchemaCode = 
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

export type MorphSchemaCode = 
    // wordsSchemasCode-morphemes
    | 'd'
    | 'l' // tierra de, pueblo de,
    | 'y' // gentilicio
    | 'j' // oficio
    | 's'
    | 'o'
    | 'b'
    | 'g'

export type SpecialMorphemeCode = 
    | 'p'
    | '1'
    | '2'

export const wordSchemasCodeMap = (code: WordSchemaCode): WordKey => {
    // wordsSchemasCode-words
    switch (code) {
        case 'D': return 'Defaults'
        case 'P': return 'PersonNeutralNames'
        case 'B': return 'BoyNames'
        case 'G': return 'GirlNames'
        case 'J': return 'Jobs'
        case 'C': return 'Civilizatitons'
        case 'R': return 'Regions'
        case 'F': return 'FamilyNames'
        case 'N': return 'FamilyNeutralNames'
        case 'T': return 'Towns'
        case 'O': return 'Organizations'
    }
}
export const morphSchemasCodeMap = (code: MorphSchemaCode): MorphKey => {
    // wordsSchemasCode-morphemes
    switch (code) {
        case 'd': return 'defaults'
        case 'l': return 'landOf'
        case 'y': return 'demonym'
        case 'j': return 'jobs'
        case 's': return 'sonOf'
        case 'o': return 'daughterOf'
        case 'b': return 'bnames'
        case 'g': return 'gnames'
    }
}