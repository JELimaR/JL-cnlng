import { IPhonemesSets, IArray2, IArray5 } from './Interfaces';

/* consontant sets */
const consMinimal: IArray5<string> = ['p','t','k','m','n','l','s'];
const consEnglishIsh: IArray5<string> = ['p','t','k','b','v','d','g','m','n','l','r','s','ʃ','z','ʒ','ʧ'];
const consPiraha: IArray5<string> = ['p','t','k','m','n','h'];
const consHawaiianIsh: IArray5<string> = ['h','k','l','m','n','p','w'];
const consGreenlandicIsh: IArray5<string> = ['p','t','k','q','s','g','r','m','n','ŋ','l','j'];
const consArabicIsh: IArray5<string> = ['t','k','s','ʃ','d','b','q','ɣ','x','m','n','l','r','w','j'];
const consArabicLite: IArray5<string> = ['t','k','d','g','m','n','s','ʃ'];
const consEnglishLite: IArray5<string> = ['p','t','k','b','d','g','m','n','v','s','z','ʒ','ʧ','h','j','w'];

export const conssets = {
    'Minimal': consMinimal,
    'EnglishIsh': consEnglishIsh,
    'Piraha': consPiraha,
    'HawaiianIsh': consHawaiianIsh,
    'GreenlandicIsh': consGreenlandicIsh,
    'ArabicIsh': consArabicIsh,
    'ArabicLite': consArabicLite,
    'EnglishLite': consEnglishLite
}

/* start sets */
const ssJustS: string[] = ['sb', 'sv', 'sk', 'sɣ', 'sl', 'sm', 'sn', 'sp', 'st'];
const ssSandSH: string[] = ['sk', 'sɣ', 'sl', 'sm', 'sn', 'sp', 'st', 'ʃk', 'ʃl', 'ʃm', 'ʃn', 'ʃt'];
const ssTripleSpecial: string[] = ['str', 'ʃtr'];
const ssAfrican: string[] = ['mb', 'nɣ', 'nk','nz'];

export const ssets = {
    'none': [],
    'Just S': ssJustS,
    'S SH': ssSandSH,
    'Triple': ssTripleSpecial,
    'African': ssAfrican
}

/* liquids sets - begin of morphemes */
const lsComplete: string[] = ['br', 'kr', 'dr', 'fr', 'ɣr', 'xr', 'pr', 'tr', 'ʃr', 'bl', 'kl', 'fl', 'ɣl', 'pl', 'ʃl'];
const lsJustR: string[] = ['br', 'kr', 'dr', 'fr', 'ɣr', 'xr', 'pr', 'tr'];
const lsJustL: string[] = ['bl', 'kl', 'fl', 'ɣl', 'pl', 'ʃl'];
const lsJustW: string[] = ['kw', 'dw', 'ɣw', 'xw', 'tw', 'ʃw'];
const lsJustJ: string[] = ['kj', 'dj', 'tj', 'bj'];
const lsSpecial1: string[] = ['br', 'kr', 'dr', 'fr', 'ɣr', 'pr', 'tr', 'bl', 'fl', 'ɣl', 'pl'];

export const lsets = {
    'none': [],
    'complete': lsComplete,
    'just r': lsJustR,
    'just l': lsJustL,
    'just w': lsJustW,
    'just j': lsJustJ,
    'special-1': lsSpecial1,
}

/* liquids sets - end of morphemes */
const dsAllL: string[] = ['lk', 'ld', 'lf', 'lɣ', 'lʧ', 'lm', 'lp', 'lt'];
const dsAllR: string[] = ['rk', 'rd', 'rf', 'rɣ', 'rm', 'rp', 'rt'];
const dsAllS: string[] = ['sk', 'sp', 'st'];

export const dsets = {
    'none': [],
    'all l': dsAllL,
    'all r': dsAllR,
    'all s': dsAllS,
}

/* final sets */
const fsMN: string[] = ['m', 'n'];
const fsSK: string[] = ['s', 'k'];
const fsMNNG: string[] = ['m', 'n', 'ŋ'];
const fsSSHZ: string[] = ['s','ʃ','z','ʒ'] ;

export const fsets = {
    'none': [],
    's k': fsSK,
    'm n ŋ': fsMNNG,
    's ʃ z ʒ': fsSSHZ,
    'm n': fsMN,
}

const vowStandard5: IArray2<string> = ['a','e','i','o','u'];
const vow3VowelAIU: IArray2<string> = ['a','i','u'];
const vowExtraAEI: IArray2<string> = ['a','e','i','o','u','A','E','I'];
const vowExtraU: IArray2<string> = ['a','e','i','o','u', 'U'];
const vow5VowelAIUAI: IArray2<string> = ['a','i','u','A','I'];
const vow3VowelEOU: IArray2<string> = ['e','o','u'];
const vowExtraAOU: IArray2<string> = ['a','e','i','o','u','A','O','U'];

export const vowssets = {
    'Standard 5': vowStandard5,
    '3 Vowel a i u': vow3VowelAIU,
    'Extra A E I': vowExtraAEI,
    'Extra U': vowExtraU,
    '5 Vowel a i u A I': vow5VowelAIUAI,
    '3 Vowel e o u': vow3VowelEOU,
    'Extra A O U': vowExtraAOU,
};

export const defaultPhonemeSets: IPhonemesSets = {
    cons: conssets['Minimal'],
    vows: vowssets['Standard 5'],
};

const globalSets = {
    consonants: 'bcdfghjklmnpqrstvwxyzʃʒʧʤŋɣ',
    vowals: 'aeiouAEIOU'
} 

export default globalSets;
