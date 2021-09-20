export interface IPhonemesSets {
    cons: string[];
    vows: string[];
    ls?: string[];
    ds?: string[];
    ss?: string[];
    fs?: string[];
}

export type PhonemeType = 
    | 'V'
    | 'C'
    | 'S'
    | 'L'
    | 'D'
    | 'F'

export type PhonemeTypeExtended = 
    | PhonemeType
    | 'G'
    | 'H'
    | 'X'
    | 'Y'
    | 'Z'
    | '?'
    | '*'

export const str2phoneme = (s: string): PhonemeTypeExtended => {
    if (s === 'V' || s === 'C' || s === 'S' || s === 'L' || s === 'D' || s === 'F' ||
        s === 'G' || s === 'H' || s === 'X' || s === 'Y' || s === 'Z' || s === '?')
        return s;
    else return '*'
}

/* consontant sets */
const consMinimal: string[] = ['p','t','k','m','n','l','s'];
const consEnglishIsh: string[] = ['p','t','k','b','v','d','g','m','n','l','r','s','ʃ','z','ʒ','ʧ'];
const consPiraha: string[] = ['p','t','k','m','n','h'];
const consHawaiianIsh: string[] = ['h','k','l','m','n','p','w'];
const consGreenlandicIsh: string[] = ['p','t','k','q','s','g','r','m','n','ŋ','l','j'];
const consArabicIsh: string[] = ['t','k','s','ʃ','d','b','q','ɣ','x','m','n','l','r','w','j'];
const consArabicLite: string[] = ['t','k','d','g','m','n','s','ʃ'];
const consEnglishLite: string[] = ['p','t','k','b','d','g','m','n','v','s','z','ʒ','ʧ','h','j','w'];

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
const lsComplete: string[] = ['br', 'kr', 'dr', 'fr', 'gr', 'xr', 'pr', 'tr', 'ʃr', 'bl', 'kl', 'fl', 'gl', 'pl', 'ʃl'];
const lsJustR: string[] = ['br', 'kr', 'dr', 'fr', 'gr', 'xr', 'pr', 'tr'];
const lsJustL: string[] = ['bl', 'kl', 'fl', 'gl', 'pl', 'ʃl'];
const lsJustW: string[] = ['kw', 'dw', 'gw', 'xw', 'tw', 'ʃw'];
const lsJustJ: string[] = ['kj', 'dj', 'tj', 'bj'];
const lsSpecial1: string[] = ['br', 'kr', 'dr', 'fr', 'gr', 'pr', 'tr', 'bl', 'fl', 'gl', 'pl'];

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

const vowStandard5: string[] = ['a','e','i','o','u'];
const vow3VowelAIU: string[] = ['a','i','u'];
const vowExtraAEI: string[] = ['a','e','i','o','u','A','E','I'];
const vowExtraU: string[] = ['a','e','i','o','u', 'U'];
const vow5VowelAIUAI: string[] = ['a','i','u','A','I'];
const vow3VowelEOU: string[] = ['e','o','u'];
const vowExtraAOU: string[] = ['a','e','i','o','u','A','O','U'];

export const vowssets = {
    'Standard 5': vowStandard5,
    '3 Vowel a i u': vow3VowelAIU,
    'Extra A E I': vowExtraAEI,
    'Extra U': vowExtraU,
    '5 Vowel a i u A I': vow5VowelAIUAI,
    '3 Vowel e o u': vow3VowelEOU,
    'Extra A O U': vowExtraAOU,
};

//
//vows
type TypeVowssetsName = keyof typeof vowssets;
let vowssetsNameArray: TypeVowssetsName[] = [];
for (let i in vowssets) {
    vowssetsNameArray.push(i as TypeVowssetsName);
}
//cons
type TypeConssetsName = keyof typeof conssets;
let conssetsNameArray: TypeConssetsName[] = [];
for (let i in conssets) {
    conssetsNameArray.push(i as TypeConssetsName);
}
//ss
type TypeSsetsName = keyof typeof ssets;
let ssetsNameArray: TypeSsetsName[] = [];
for (let i in ssets) {
    ssetsNameArray.push(i as TypeSsetsName);
}
//ls
type TypeLsetsName = keyof typeof lsets;
let lsetsNameArray: TypeLsetsName[] = [];
for (let i in lsets) {
    lsetsNameArray.push(i as TypeLsetsName);
}
//ds
type TypeDsetsName = keyof typeof dsets;
let dsetsNameArray: TypeDsetsName[] = [];
for (let i in dsets) {
    dsetsNameArray.push(i as TypeDsetsName);
}
//fs
type TypeFsetsName = keyof typeof fsets;
let fsetsNameArray: TypeFsetsName[] = [];
for (let i in fsets) {
    fsetsNameArray.push(i as TypeFsetsName);
}

export {
	vowssetsNameArray,
	TypeVowssetsName,
	conssetsNameArray,
	TypeConssetsName,
	ssetsNameArray,
	TypeSsetsName,
	lsetsNameArray,
	TypeLsetsName,
	dsetsNameArray,
	TypeDsetsName,
	fsetsNameArray,
	TypeFsetsName
}

//
export const defaultPhonemeSets: IPhonemesSets = {
    cons: conssets['Minimal'],
    vows: vowssets['Standard 5'],
};

const globalSets = {
    consonants: ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z','ʃ','ʒ','ʧ','ʤ','ŋ','ɣ'],
    vowals: ['a','e','i','o','u','A','E','I','O','U'],
    oclusives: ['p','b','t','d','k','g','ɣ','v'],
    liquids: ['l','r','w','j','ʤ'],
    fricatives: ['f','z','s','x','ʒ','h'],
    africatives: ['ʃ','ʒ','ʧ'],
    nasals: ['m','n','ŋ']
} 

export default globalSets;
