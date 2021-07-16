import IConfig, { IWordSchemas, IArray1 } from './Interfaces';
import OrthConstants from './OrthConstants';
import { defaultPhonemeSets } from './PhonemeSetConstants';

const schemaMake: IArray1<string> = ['M'];

export const wordSchemasBasic: IWordSchemas = {
    'Defaults': schemaMake,
    'BoyNames': schemaMake,
    'GirlNames': schemaMake,
    'Jobs': schemaMake,
    'Civilizatitons': schemaMake,
    'Regions': schemaMake,
    'FamilyNames': schemaMake,
    'Towns': schemaMake,
    'Organizations': schemaMake,
}

export const defaultConfig: IConfig = {
    phonemes: defaultPhonemeSets,
    orth: OrthConstants.Orths.default,
    wordSchemas: wordSchemasBasic,
    morphStructures: new Set<string>(['CVC']),
}

export const wordsSchemasCode = {
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

// opciones generales - puede ser otra opcion
const INI = ['', 'C', 'S', 'X', 'Y'];
const FIN = ['', 'C', 'F', 'G', 'H'];

const MID1 = ['V', 'VV', 'V?'];
const MID2 = ['XV'];
const MID3 = ['XVH?X?V'];

const commonStructs = [
    'CVC',
    'CVV?C',
    'CVVC?', 'CVC?', 'CV', 'VC', 'CVF', 'C?VC', 'CVF?',
    'XVC', 'XVF', 'ZVC', 'ZVF', 'ZVC?',
    'C?VF', 'C?VC?', 'C?VF?', 'L?VC', 'VC',
    'CVD', 'C?VG', 'C?VE'
]

const ressets = [
    {
        name: 'None',
        res: []
    },
    {
        name: 'Double sounds',
        res: [/(.)\1/]
    },
    {
        name: 'Doubles and hard clusters',
        res: [/[sʃf][sʃ]/, /(.)\1/, /[rl][rl]/]
    }
];