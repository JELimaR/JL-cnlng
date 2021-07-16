import Morph  from "./Morph";
import {SimpleWord} from "./Word";
import IConfig, { schemaCodes, schemasCodeMap } from './config/Interfaces';
import { defaultConfig } from './config/ConfigConstants';
import globalSets from "./config/PhonemeSetConstants";

class Lang {

    private static _currentId: number = 0;
    private _level: number;
    private _id: number;
    private _name: string = '';
    private _words: SimpleWord[] = [];
    private _morphs: Morph[] = [];

    private _config: IConfig;

    constructor(config: IConfig = defaultConfig, level: number = 0) {
        this._id = Lang._currentId++;
        this._config = config;
        this._level = level;
    }

    get id(): number { return this._id; }
    get name(): string { return this._name; }
    set name(value: string) { this._name = value;}
    get config(): IConfig { return this._config; }
    get words(): any { return this._words; }
    get morphs(): any { return this._morphs; }

    derivate(): Lang { return this} // TODO: derivationRules

    getSpelledWord(code: schemaCodes): string { 
        if (code.toUpperCase() === code) {
            return schemasCodeMap[code]
        } else return '';
    }
}

export default Lang;