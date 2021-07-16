import Morph  from "./Morph";
import {SimpleWord} from "./Word";
import IConfig from './config/Interfaces';
import { defaultConfig, wordsSchemasCode } from './config/ConfigConstants';
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

    derivate(): Lang { return this} // TODO: derivationRules
}

export default Lang;