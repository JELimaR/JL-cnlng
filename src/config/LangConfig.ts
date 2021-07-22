import { isSchemaCodeExtended, IWordLangSets, WordKey } from './LangSchemaCode';
import { IPhonemesSets, PhonemeType, PhonemeTypeExtended } from './Phonemes';
import { IOrths } from './Orths';

import CollectionsUtilsFunctions from './CollectionsUtilsFunctions';
const CUF: CollectionsUtilsFunctions = CollectionsUtilsFunctions.getInstance();

export interface IConfig {
    phonemes: IPhonemesSets;
    orth: IOrths;
    wordSchemas: IWordLangSets<string>;
    morphStructures: string[];
    wordStructures: string[];
    exponent: number
}

export default class LangConfig /*implements IConfig*/ {
    private _phonemes: IPhonemesSets;
    private _orth: IOrths;
    private _wordSchemas: IWordLangSets<string> = {
        'Defaults': new Set<string>(),
        'PersonNeutralNames': new Set<string>(),
        'BoyNames': new Set<string>(),
        'GirlNames': new Set<string>(),
        'Jobs': new Set<string>(),
        'Civilizatitons': new Set<string>(),
        'Regions': new Set<string>(),
        'FamilyNames': new Set<string>(),
        'FamilyNeutralNames': new Set<string>(),
        'Towns': new Set<string>(),
        'Organizations': new Set<string>(),
    };
    private _morphStructures: string[];
    private _wordStructures: string[];
    private _exponent: number;
    
    constructor(config: IConfig) {
        /**
         * Verify size of list of phonemes
         */
        if (config.phonemes.cons.length < 5 || config.phonemes.vows.length < 3) {
            throw new Error('Phonemes size invalid. Consonants must be more than 5 and vowles more than 3')
        }
        this._phonemes = config.phonemes;
        this._orth = config.orth;
        
        /**
         * Verify word schemas list
         */
        for (let k in config.wordSchemas) {
            config.wordSchemas[k as WordKey].forEach((v) => {
                for (let l of v) {
                    if ( !isSchemaCodeExtended(l) ) {
                        throw new Error(`Invalid schema code provided: ${l}`)
                    }
                }
                this._wordSchemas[k as WordKey].add( v )
            })
        }
        this._morphStructures = config.morphStructures;
        this._wordStructures = config.wordStructures;
        this._exponent = config.exponent;
    }

    get phonemes(): IPhonemesSets {return this._phonemes}
    get orth(): IOrths {return this._orth}
    get wordSchemas(): IWordLangSets<string> {return this._wordSchemas}
    get morphStructures(): string[] {return this._morphStructures}
    get wordStructures(): string[] {return this._wordStructures}
    get exponent(): number {return this._exponent}

    get IConfig(): IConfig {

        let wordSchemasOut: IWordLangSets<string> = {
            'Defaults': new Set<string>(),
            'PersonNeutralNames': new Set<string>(),
            'BoyNames': new Set<string>(),
            'GirlNames': new Set<string>(),
            'Jobs': new Set<string>(),
            'Civilizatitons': new Set<string>(),
            'Regions': new Set<string>(),
            'FamilyNames': new Set<string>(),
            'FamilyNeutralNames': new Set<string>(),
            'Towns': new Set<string>(),
            'Organizations': new Set<string>(),
        };
        for (let k in this.wordSchemas) {
            this.wordSchemas[k as WordKey].forEach((v) => {
                wordSchemasOut[k as WordKey].add( v )
            })
        }

        return {
            phonemes: this.phonemes,
            orth: this.orth,
            wordSchemas: wordSchemasOut,
            morphStructures: this.morphStructures,
            wordStructures: this.wordStructures,
            exponent: this._exponent
        }
    }

    copy(): LangConfig {
        return new LangConfig( this.IConfig )
    }

    getLetter( phonemeType: PhonemeType): string {
        let out: string = '';
        switch (phonemeType) {
            case 'D':
                if ( this.phonemes.ds )
                    out = CUF.choose( this.phonemes.ds, 2 );
                break;
            case 'L':
                if ( this.phonemes.ls )
                    out = CUF.choose( this.phonemes.ls, 2 );
                break;
            case 'S':
                if ( this.phonemes.ss )
                    out = CUF.choose( this.phonemes.ss, 2 );
                break;
            case 'F':
                if ( this.phonemes.fs )
                    out = CUF.choose( this.phonemes.fs, 2 );
                break;
            case 'C':
                out = CUF.choose( this.phonemes.cons, 2 );
                break;
            case 'V':
                out = CUF.choose( this.phonemes.vows, 2 );
                break;
            default:
                break;
        }

        if (out === '') {
            out = CUF.choose( this.phonemes.cons, 2 );
        }
        return out;
    }

    getPhonemeType(pht: PhonemeTypeExtended): PhonemeType {
        switch (pht) {
            case 'X':
                return CUF.choose(['C', 'L']);
            case 'Y':
                return CUF.choose(['C', 'L', 'S']);
            case 'Z':
                return CUF.choose(['C', 'S']);
            case 'G':
                return CUF.choose(['C', 'D']);
            case 'H':
                return CUF.choose(['C', 'D', 'F']);
            case 'V': case 'C': case 'S': case 'L': case 'D': case 'F':
                return pht;
            default:
                throw new Error(`phoneme type invalid: ${pht}`);
        }
    }
}