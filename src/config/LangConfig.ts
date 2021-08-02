import { isSchemaCodeExtended, IWordLangSets, WordKey } from './LangSchemaCode';
import { IPhonemesSets, PhonemeType, PhonemeTypeExtended } from './Phonemes';
import { IOrths } from './Orths';

import {CollectionsUtilsFunctions} from 'jl-utlts';
const CUF: CollectionsUtilsFunctions = CollectionsUtilsFunctions.getInstance();

export interface IConfig {
    phonemes: IPhonemesSets;
    orth: IOrths;
    wordSchemas: IWordLangSets<string>;
    specialStructures: string[];
    morphStructures: string[];
    wordStructures: string[];
    exponent: number
}

export default class LangConfig implements IConfig {
    private _phonemes: IPhonemesSets;
    private _orth: IOrths;
    private _wordSchemas: IWordLangSets<string> = {
        'Defaults': [],
        'PersonNeutralNames': [],
        'BoyNames': [],
        'GirlNames': [],
        'Jobs': [],
        'Civilizatitons': [],
        'Regions': [],
        'FamilyNames': [],
        'FamilyNeutralNames': [],
        'Towns': [],
        'Organizations': [],
    };
    private _specialStructures: string[];
    private _morphStructures: string[];
    private _wordStructures: string[];
    private _exponent: number;
    
    constructor(config: IConfig) {
		config = JSON.parse(JSON.stringify(config));
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
                this._wordSchemas[k as WordKey].push( v )
            })
        }
        this._specialStructures = config.specialStructures;
        this._morphStructures = config.morphStructures;
        this._wordStructures = config.wordStructures;
        this._exponent = config.exponent;
    }

    get phonemes(): IPhonemesSets {return this._phonemes}
    get orth(): IOrths {return this._orth}
    get wordSchemas(): IWordLangSets<string> {return this._wordSchemas}
    get specialStructures(): string[] {return this._specialStructures}
    get morphStructures(): string[] {return this._morphStructures}
    get wordStructures(): string[] {return this._wordStructures}
    get exponent(): number {return this._exponent}

    get IConfig(): IConfig {

        let wordSchemasOut: IWordLangSets<string> = {
            'Defaults': [],
            'PersonNeutralNames': [],
            'BoyNames': [],
            'GirlNames': [],
            'Jobs': [],
            'Civilizatitons': [],
            'Regions': [],
            'FamilyNames': [],
            'FamilyNeutralNames': [],
            'Towns': [],
            'Organizations': [],
        };
        for (let k in this.wordSchemas) {
            wordSchemasOut[k as WordKey] = [...this.wordSchemas[k as WordKey]];
        }

        return {
            phonemes: this.phonemes,
            orth: this.orth,
            wordSchemas: wordSchemasOut,
            specialStructures: this.specialStructures,
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