
import { IWordLangSets } from './LangSchemaCode';
import { IConfig } from './LangConfig';
import OrthConstants from './Orths';
import { defaultPhonemeSets } from './Phonemes';

const schemaMake = new Set<string>(['M']);

export const wordSchemasBasic: IWordLangSets<string> = {
    'Defaults': schemaMake,
    'PersonNeutralNames': schemaMake,
    'BoyNames': schemaMake,
    'GirlNames': schemaMake,
    'Jobs': schemaMake,
    'Civilizatitons': schemaMake,
    'Regions': schemaMake,
    'FamilyNames': schemaMake,
    'FamilyNeutralNames': schemaMake,
    'Towns': schemaMake,
    'Organizations': schemaMake,
}

export const defaultConfig: IConfig = {
    phonemes: defaultPhonemeSets,
    orth: OrthConstants.Orths.default,
    wordSchemas: wordSchemasBasic,
    morphStructures: ['CVC'],
    wordStructures: ['CVC', 'CVCVC', 'CVCVCVC'],
    exponent: 2,
}

// opciones generales - puede ser otra opcion
const INI = ['', 'C', 'S', 'X', 'Y'];
const FIN = ['', 'C', 'F', 'G', 'H'];

const MID1 = ['V', 'VV', 'VV?'];
const MID2 = ['XV', 'XVV?'];
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