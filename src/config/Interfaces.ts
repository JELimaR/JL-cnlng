
export default interface IConfig  {
    phonemes: IPhonemesSets;
    orth: IOrths;
    wordSchemas: IWordSchemas;
    morphStructures: Set<string>;
}

/* Arreglos con length minimo*/
export interface IArray1<T> extends Array<T> { 0: T; }
export interface IArray2<T> extends Array<T> { 0: T; 1: T; }
export interface IArray5<T> extends Array<T> {
    0: T; 1: T; 2: T; 3: T; 4: T; 5: T;
}


export interface IWordSchemas {
    'Defaults': IArray1<string>,
    'PersonNeutralNames'?: IArray1<string>,
    'BoyNames': IArray1<string>,
    'GirlNames': IArray1<string>,
    'Jobs': IArray1<string>,
    'Civilizatitons': IArray1<string>,
    'Regions': IArray1<string>,
    'FamilyNames': IArray1<string>,
    'FamilyNeutralNames'?: IArray1<string>,
    'Towns': IArray1<string>,
    'Organizations': IArray1<string>,
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