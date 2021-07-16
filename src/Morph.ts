export default abstract class Morph { // no es necesario dividir en pre y suf
    abstract toString(): string;
}

export class Suffix extends Morph {
    private _vends: string = '';
    private _cends: string = '';

    constructor(vends: string = '', cends: string = '') {
        super();
        this._vends = vends;
        this._cends = cends;
    }

    get vends(): string { return this._vends; }
    get cends(): string { return this._cends !== '' ? this._cends : this._vends; }

    toString(): string {return this._vends}
}

export class Prefix extends Morph {
    toString(): string {
        return '';
    }
}