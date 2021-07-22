
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

/* Consonants ortho rules */
const defaultConsOrth: ICorth = {
    'ʃ': 'sh',
    'ʒ': 'zh',
    'ʧ': 'ch',
    'ʤ': 'j',
    'ŋ': 'ng',
    'j': 'y',
    'x': 'kh',
    'ɣ': 'gh',
}

const slavicConsOrth: ICorth = {
    'ʃ': 'š',
    'ʒ': 'ž',
    'ʧ': 'č',
    'ʤ': 'ǧ',
    'j': 'j'
}

const germanConsOrth: ICorth = {
    'ʃ': 'sch',
    'ʒ': 'zh',
    'ʧ': 'tsch',
    'ʤ': 'dz',
    'j': 'j',
    'x': 'ch'
}

const frenchConsOrth: ICorth = {
    'ʃ': 'ch',
    'ʒ': 'j',
    'ʧ': 'tch',
    'ʤ': 'dj',
    'x': 'kh'
}

const chineseConsOrth: ICorth = {
    'ʃ': 'x',
    'ʧ': 'q',
    'ʤ': 'j', 
}

const CorthsList = {
    'default': defaultConsOrth,
    'slavic': slavicConsOrth,
    'german': germanConsOrth,
    'french': frenchConsOrth,
    'chinese': chineseConsOrth
}

/* Vowals ortho rules */
const defaultVowsOrth: IVorth = {
    'A': 'á',
    'E': 'é',
    'I': 'í',
    'O': 'ó',
    'U': 'ú',
}

const acutesVowsOrth: IVorth = defaultVowsOrth;

const umlsutsVowsOrth: IVorth = {
    'A': "ä",
    'E': "ë",
    'I': "ï",
    'O': "ö",
    'U': "ü"
}

const welshVowsOrth: IVorth = {
    'A': "â",
    'E': "ê",
    'I': "y",
    'O': "ô",
    'U': "w"
}

const diphthongsVowsOrth: IVorth = {
    'A': "au",
    'E': "ei",
    'I': "ie",
    'O': "ou",
    'U': "oo"
}

const doublesVowsOrth: IVorth = {
    'A': "aa",
    'E': "ee",
    'I': "ii",
    'O': "oo",
    'U': "uu"
}

const nodrdicsVowsOrth: IVorth = {
    'A': 'æ',
    'E': 'ê',
    'I': 'j',
    'O': 'ø',
    'U': 'ü'
}

const VorthsList = {
    'default': defaultVowsOrth,
    'acutes': acutesVowsOrth,
    'umlsuts': umlsutsVowsOrth,
    'welsh': welshVowsOrth,
    'diphthongs': diphthongsVowsOrth,
    'doubles': doublesVowsOrth,
    'nordics': nodrdicsVowsOrth,
}

/* Combination ortho rules */
const defaultOrths: IOrths = {
    corth: defaultConsOrth,
    vorth: defaultVowsOrth
}

const OrthsList = {
    'default': defaultOrths
}

export default {
    Orths: OrthsList,
    Corths: CorthsList,
    Vorths: VorthsList
}