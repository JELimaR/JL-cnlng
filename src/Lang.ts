
import fs from 'fs';
import path from 'path';

import { defaultConfig } from './config/ConfigConstants';
import LangConfig, { IConfig } from './config/LangConfig';
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
    isSchemaCodeExtended,
} from './config/LangSchemaCode';
import globalSets, { PhonemeType, str2phoneme } from './config/Phonemes';

import CollectionsUtilsFunctions from './config/CollectionsUtilsFunctions';

import { CorthKey, CorthsList, VorthKey, VorthsList } from './config/Orths';

const CUF = CollectionsUtilsFunctions.getInstance();

export interface ILang {
    id: number;
    level: number;
    name: string;
    config: IConfig;
    words: IWordLangSets<string>;
    morphs: IMorphemeLangSets<string>;
    specials: ISpecialMorphemes<string>;
}

export default class Lang implements ILang {

    private static _currentId: number = 0;
	private static _folderPath: string = path.join(__dirname, `/langData`);

    private _level: number;
    private _id: number;
    private _name: string = '';

    private _words: IWordLangSets<string> = {
        Defaults: [],
        PersonNeutralNames: [],
        BoyNames: [],
        GirlNames: [],
        Jobs: [],
        Civilizatitons: [],
        Regions: [],
        FamilyNames: [],
        FamilyNeutralNames: [],
        Towns: [],
        Organizations: [],
    };
    private _morphs: IMorphemeLangSets<string> = {
        defaults: [],
        landOf: [],
        demonym: [],
        jobs: [],
        sonOf: [],
        daughterOf: [],
        bnames: [],
        gnames: [],
    }

    private _specials: ISpecialMorphemes<string>;
    private _config: LangConfig;

    constructor(config: IConfig = defaultConfig, level: number = 0) {

        this._id = Lang._currentId++;
        
        this._config = new LangConfig(config);
        this._level = level;

        this._specials = this.setSpecial();
    }

    private setSpecial(): ISpecialMorphemes<string> {
        let struct: string[] = this._config.specialStructures;
        if (struct.length < 2)
            struct[1] = struct[0];
        let
            male: string = this.make(struct[0]),
            female: string = this.make(struct[0]),
            plural: string = this.make(struct[1]);

        while (male === female) {
            female = this.make(struct[0]);
        }
        while (male === plural || female === plural) {
            plural = this.make(struct[1]);
        }
        return {
            genre: {
                'm': male,
                'f': female
            },
            plural
        }
    }

	static set folderPath(fp: string) {Lang._folderPath = fp}

    get id(): number { return this._id; }
    get level(): number { return this._level; }
    get name(): string { return this._name; }
    set name(value: string) { this._name = value; }
	get ILang(): ILang { 
		return {
			id: this._id,
			level: this._level,
			name: this._name,
			config: this._config.IConfig,
			words: this.words,
			morphs: this.morphs,
			specials: this.specials
		}; 
	}
    get config(): IConfig { return this._config.IConfig; }
	set config(newConfig: IConfig) { this._config = new LangConfig( newConfig ) }
	get specials(): ISpecialMorphemes<string> {
		return JSON.parse(JSON.stringify(this._specials));
	}
    set specials(ss: ISpecialMorphemes<string>) { 
		this._specials = JSON.parse(JSON.stringify(ss));
	}
    get morphs(): IMorphemeLangSets<string> {
		return JSON.parse(JSON.stringify(this._morphs));
	}
    set morphs(ms: IMorphemeLangSets<string>) {
		this._morphs = JSON.parse(JSON.stringify(ms));
	}
	get words(): IWordLangSets<string> {
		return JSON.parse( JSON.stringify( this._words ) )
	}
    set words(ws: IWordLangSets<string>) {
		this._words = JSON.parse(JSON.stringify(ws));
	}
	set editableFields(l: ILang) {
		this.name = l.name;
		this.config = l.config;
		this.specials = l.specials;
		this.morphs = l.morphs;
		this.words = l.words;
	}

    copy(): Lang { // TODO: crear copia de los conjuntos 
        let out: Lang = new Lang(this._config.IConfig, this._level );
		Lang._currentId--;

		out._id = this._id;
		out._name = this._name;

        out._words = this.words;
		out._morphs = this.morphs;
		out._specials = this.specials;
        
        return out;
    }

	saveSync(): void {
		let filePath: string = path.join(Lang._folderPath, `/${this._id}.langjson`); // path no es necesario realmetne
		fs.mkdirSync( Lang._folderPath, { recursive: true} );
		fs.writeFileSync(filePath, JSON.stringify( this.ILang ));
	}

	static loadSync(id: number): Lang {
		let filePath: string = path.join(Lang._folderPath, `/${id}.langjson`);

		if (fs.existsSync(filePath)) {		
		const lr = JSON.parse( fs.readFileSync( filePath, {encoding:'utf8', flag:'r'} ) );

		let out = new Lang(lr.config, lr.level)
		
		out._id = lr.id;
		out._name = lr.name;
		for (let k in lr.words) {
            out._words[k as WordKey] = [...lr.words[k as WordKey]]
        }
        for (let k in lr.morphs) {
            out._morphs[k as MorphKey] = [...lr.morphs[k as MorphKey]]
        }
		out._specials = JSON.parse(JSON.stringify(lr.specials));
		return out;} else { throw new Error(``) }
	}

    private make(struct: string): string { // se puede cambiar tipo
        let out: string = '';
		
        for (let s = 0; s < struct.length; s++) {
            let phoneme: PhonemeType;

            /**
             * Se crea en caso que:
             * s sea distinto de '?' y
             * si el siguiente es '?' entonces random < 0.65
             * equivalencia logica: p→q eq ﹁p∨q
             */
            let create: boolean = struct[s] !== '?' && (struct[s + 1] !== '?' || Math.random() < 0.65);

            if (create) {
                try {
                    const phonemeType = str2phoneme(struct[s]);
                    phoneme = this._config.getPhonemeType(phonemeType);
                    const letter = this._config.getLetter(phoneme);
                    out += letter;
                } catch (error) {
                    console.error(error);
                }
            }
        }

        return out;
    }

    newMorph(sc: MorphSchemaCode): { morph: string, ok: boolean } {

        let ok: boolean = false;
        const key: MorphKey = morphSchemasCodeMap(sc);

        const struct: string = CUF.choose<string>(this._config.morphStructures);
        let morph = this.make(struct);

        ok = this._morphs[key].find((v) => v === morph) === undefined;
        if (ok)
            this._morphs[key].push(morph);

        return { morph, ok };
    }

    newWord(sc: WordSchemaCode): { word: string, ok: boolean } {

        let ok: boolean = false;
        const key: WordKey = wordSchemasCodeMap(sc);

        const schema: string = CUF.choose(this._config.wordSchemas[key], 2);

        let word = this.addWord(schema);

        ok = this._words[key].find((v) => v === word) === undefined; // verificar si no es un morphema?
        if (ok)
            this._words[key].push(word);

        return { word: this.getSpelledWord(word), ok };
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
                    const struct: string = CUF.choose<string>(this._config.wordStructures, this._config.exponent);
                    out = this.make(struct);
                    break;
                }
                case 'm': {
                    const struct: string = CUF.choose<string>(this._config.morphStructures);
                    out = this.make(struct);
                    break;
                }
                case 'D': case 'P': case 'B': case 'G': case 'J':
                case 'C': case 'R': case 'F': case 'N': case 'T': case 'O': {
                    let key: WordKey = wordSchemasCodeMap(s);
                    if (this._words[key].length === 0) {
                        s = 'M';
                    } else {
                        out = CUF.choose(this._words[key]);
                    }
                    break;
                }
                case 'd': case 'l': case 'y': case 'j': case 's': case 'o': case 'b': {
                    let key: MorphKey = morphSchemasCodeMap(s);
                    if (this._morphs[key].length === 0) {
                        s = 'm';
                    } else {
                        out = CUF.choose(this._morphs[key])
                    }
                    break;
                }
                case 'p': out = this._specials.plural; break;
                case '1': out = this._specials.genre.m; break;
                case '2': out = this._specials.genre.f; break;
                default:
                    out = s as string;
            }
            ok = out !== '';
        }

        return out;
    }

    getPersonNameGenred(genre: 'm' | 'f', w: string): string {
        if (this._words['PersonNeutralNames'].find( e => e === w) === undefined) {
            throw new Error(`${w} is not a PersonNeutralName`)
        }
        return this.genreder(genre, w);
    }

    getFamilynNameGenred(genre: 'm' | 'f', w: string): string {
        if (this._words['FamilyNeutralNames'].find( e => e === w) === undefined) {
            throw new Error(`${w} is not a FamilyNeutralName`)
        }
        return this.genreder(genre, w);
    }

    genreder(genre: 'm' | 'f', w: string): string {
        let out: string;
        out = (genre === 'f')
            ? w + this._specials.genre.f // usar join
            : w + this._specials.genre.m;
        return out;
    }

    getSpelledWord(word: string): string {

        let out: string = '';

        for (let l of word) {
            if (globalSets.consonants.find( e => e === l )) {
                out +=
                    this._config.orth.corth[l as CorthKey]
                    || CorthsList.default[l as CorthKey]
                    || l;
            } else {
                out +=
                    this._config.orth.vorth[l as VorthKey]
                    || VorthsList.default[l as VorthKey]
                    || l;
            }
        }

        return out;
    }

}

