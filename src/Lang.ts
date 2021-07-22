
import { defaultConfig } from './config/ConfigConstants';
import LangConfig, {IConfig} from './config/LangConfig';
import { 
    IMorphemeLangSets,
    IWordLangSets,
    MorphKey,
    MorphSchemaCode,
    morphSchemasCodeMap,
    SchemaCodeExtended,
    WordKey,
    WordSchemaCode,
    wordSchemasCodeMap,
    ISpecialMorphemes, 
    isSchemaCodeExtended} from './config/LangSchemaCode';
import { PhonemeType, str2phoneme } from './config/Phonemes';

import CollectionsUtilsFunctions from './config/CollectionsUtilsFunctions';
const CUF = CollectionsUtilsFunctions.getInstance();

export interface ILang {
    id: number;
    level: number;
    name: string;
    config: IConfig;
    words: IWordLangSets<string>;
    morphs: IMorphemeLangSets<string>;
    special: ISpecialMorphemes<string>;
}

export default class Lang implements ILang {

    private static _currentId: number = 0;

    private _level: number;
    private _id: number;
    private _name: string = '';

    private _words: IWordLangSets<string> = {
        Defaults: new Set<string>(),
        PersonNeutralNames: new Set<string>(),
        BoyNames: new Set<string>(),
        GirlNames: new Set<string>(),
        Jobs: new Set<string>(),
        Civilizatitons: new Set<string>(),
        Regions: new Set<string>(),
        FamilyNames: new Set<string>(),
        FamilyNeutralNames: new Set<string>(),
        Towns: new Set<string>(),
        Organizations: new Set<string>(),
    };
    private _morphs: IMorphemeLangSets<string> = {
        defaults: new Set<string>(),
        landOf: new Set<string>(),
        demonym: new Set<string>(),
        jobs: new Set<string>(),
        sonOf: new Set<string>(),
        daughterOf: new Set<string>(),
        bnames: new Set<string>(),
        gnames: new Set<string>(),
    }

    private _special: ISpecialMorphemes<string>;
    private _config: LangConfig;

    constructor(config: IConfig = defaultConfig, level: number = 0, structSpecial: string = 'C?VC') {
        this._id = Lang._currentId++;
        this._config = new LangConfig(config);
        this._level = level;

        this._special = this.setSpecial(structSpecial);
    }

    private setSpecial(structSpecial: string): ISpecialMorphemes<string> {
        let
            male: string = this.make(structSpecial),
            female: string = this.make(structSpecial),
            plural: string = this.make(structSpecial);
        
        while ( male === female ) {
            female = this.make(structSpecial);
        }
        while ( male === plural || female === plural ) {
            plural = this.make(structSpecial);
        }
        return {
            genre: {
                'm': male,
                'f': female
            },
            plural
        }
    }

    get id(): number { return this._id; }
    get level(): number { return this._level; }
    get name(): string { return this._name; }
    set name(value: string) { this._name = value; }
    get config(): IConfig { return this._config.IConfig; }
    get words(): IWordLangSets<string> { return this._words; }
    get morphs(): IMorphemeLangSets<string> { return this._morphs; }
    get special(): ISpecialMorphemes<string> { return this._special }

    copy(): Lang { // TODO: crear copia de los conjuntos 
        let out: Lang = new Lang(this._config.IConfig, this._level+1);
        
        for (let k in this.words) {
            this.words[k as WordKey].forEach((w) => {
                out._words[k as WordKey].add( w );
            })
        }
        for (let k in this.morphs) {
            this.morphs[k as MorphKey].forEach( (m) => {
                out._morphs[k as MorphKey].add( m );
            });
        }

        out._special = JSON.parse( JSON.stringify( this._special ));
        return out;
    } 

    private make(struct: string): string { // se puede cambiar tipo
        let out: string = '';
        
        for (let s=0; s < struct.length; s++) {
            let phoneme: PhonemeType;

            /**
             * Se crea en caso que:
             * s sea distinto de '?' y
             * si el siguiente es '?' entonces random < 0.65
             * equivalencia logica: p→q eq ﹁p∨q
             */
            let create: boolean = struct[s] !== '?' && (struct[s+1] !== '?' || Math.random() < 0.65);

            if ( create ) {
                try {
                    const phonemeType = str2phoneme( struct[s] );
                    phoneme = this._config.getPhonemeType( phonemeType );
                    const letter = this._config.getLetter( phoneme );
                    out += letter;
                } catch (error) {
                    console.error( error);
                }
            }
        }

        return out;
    }

    newMorph(sc: MorphSchemaCode): boolean { 
        
        let out: boolean = false;
        const key: MorphKey = morphSchemasCodeMap(sc);

        const struct: string = CUF.choose<string>( this._config.morphStructures );
        let morph = this.make( struct );
                
        out = this._morphs[key].has(morph);            
        this._morphs[key].add(morph);
        
        return out; 
    }

    newWord(sc: WordSchemaCode): boolean { 
        
        let out: boolean = false;
        const key: WordKey = wordSchemasCodeMap(sc);

        const schema: string = CUF.choose( this._config.wordSchemas[key], 2 );
                        
        let word = this.addWord(schema);
        
        out = this._words[key].has(word); // verificar si no es un morphema         
        this._words[key].add(word);
        
        return out; 
    }

    private addWord(schema: string): string { 
        let out: string = '';
        for (let s of schema) {
            if (isSchemaCodeExtended(s))
                out += this.getWord(s as SchemaCodeExtended); // aqui se debe usar el join
        }
        return out;
    }

    private getWord(s: SchemaCodeExtended): string {
        let out: string = '';
        let ok: boolean = false;

        while (!ok) {
            switch (s) {
                case 'M': {
                    const struct: string = CUF.choose<string>( this._config.wordStructures, this._config.exponent );
                    out = this.make( struct );
                    break;
                }
                case 'm': {
                    const struct: string = CUF.choose<string>( this._config.morphStructures );
                    out = this.make( struct );
                    break;
                }
                case 'D': case 'P': case 'B': case 'G': case 'J':
                case 'C': case 'R': case 'F': case 'N': case 'T': case 'O': {
                    let key: WordKey = wordSchemasCodeMap( s );
                    if (this._words[key].size === 0) {
                        s = 'M';
                    } else {
                        out = CUF.choose( this._words[key] );
                    }
                    break;
                }
                case 'd': case 'l': case 'y': case 'j': case 's': case 'o': case 'b': {
                    let key: MorphKey = morphSchemasCodeMap( s );
                    if (this._morphs[key].size === 0) {
                        s = 'm';
                    } else {
                        out = CUF.choose( this._morphs[key] )
                    }
                    break;
                }
                case 'p': out = this._special.plural; break;
                case '1': out = this._special.genre.m; break;
                case '2': out = this._special.genre.f; break;
                default:
                    out = s as string;
            }
            ok = out !== '';
        }

        return out;
    }

    derivate(): Lang {
        let out: Lang = this.copy();
        return out;
    } // TODO: derivationRules
    
    influence(other: Lang): Lang {
        let out: Lang = this.copy();
        for (let k in other.words) {
            // recorrer mejor este set y langlisar palabras?
            other.words[k as WordKey].forEach((v) => {
                out.words[k as WordKey].add( v )
            })
        }
        return out;
    }

    private getSpelledWord(code: WordSchemaCode): string { 
        if (code.toUpperCase() === code) {
            return wordSchemasCodeMap(code)
        } else return '';
    }
}

