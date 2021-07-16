
import { Prefix, Suffix } from './Morph';

/* SE DEBE CORREGIR TODAS LAS CLASES */

const join = (ini: string, fin: string) => ini + fin;

interface IWord {
    bornLevel: number;
    enRooted: boolean;
    parts: number;
    toString: () => string;
}

export class SimpleWord implements IWord {
    private _bornLevel: number;
    protected _root: string;

    constructor(r: string, langLevel: number) {
        this._root = r;
        this._bornLevel = langLevel;

    }

    get bornLevel(): number {return this._bornLevel}
    get enRooted(): boolean {return true}
    get parts(): number {return 1}

    toString(): string { return this._root; }

}


export class ComplexWord extends SimpleWord { // quitar el default
    private _enRooted: boolean;
    private _prefixes: string[] = [];
    private _suffixes: string[] = [];

    constructor(w: string, langLevel: number) {
        super(w, langLevel);
        this._enRooted = false;
    }

    get enRooted(): boolean {return this._enRooted}
    // get prefixes(): number {return this._prefixes.length}
    // get suffixes(): number {return this._suffixes.length}
    get parts(): number {return 1 + this._prefixes.length + this._suffixes.length}
    set prefixes(pref: string[]) {this._prefixes = pref}
    set suffixes(suf: string[]) {this._suffixes = suf}

    toString(): string { 
        let sal: string = '';
        for (let p in this._prefixes) {
            sal = join(sal, this._prefixes[p].toString());
        }
        sal = join(sal, this._root);
        for (let s in this._suffixes) {
            sal = join(sal, this._suffixes[s].toString());
        }

        return sal;
    }

    enRoot(): void {
        this._root = this.toString();
        this._prefixes = [];
        this._suffixes = [];
    }

}

