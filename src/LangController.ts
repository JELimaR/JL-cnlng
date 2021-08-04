
import Lang, {ILang} from './Lang';
import {Tree, ITreeRoots} from 'jl-utlts';
import {IConfig} from './config/LangConfig'
import LangTransform from './Transform/LangTransform';
import { ChangeRule } from './Transform/LangTransformRule'
import {
    MorphSchemaCode,
    WordSchemaCode,
} from './config/LangSchemaCode';

interface IMemoryLangController {
	createdLang: Lang | undefined;
	selectedTree: Tree<Lang> | undefined;
}


export interface ILoadController {
	_total: number;
	_langFams: ITreeRoots<ILang>[];
}

// TODO: crear clase selection?
// TODO: crear clase edit?
export default class Langcontroller {
	
	private static _instance: Langcontroller;

	private _mem: IMemoryLangController = {
		createdLang: undefined,
		selectedTree: undefined, 
	}

	private _langFams: Map<number,Tree<Lang>> = new Map<number,Tree<Lang>>();
	private _total: number = 0;

	get borrar(): Map<number, Tree<Lang>> {
		return this._langFams
	}

	private constructor() { // hacer esto en otra funcion

	}

	static get instance(): Langcontroller {
		if ( !Langcontroller._instance ) {
			Langcontroller._instance = new Langcontroller()
		}
		return Langcontroller._instance;
	}

	saveAll( ): ILoadController {
		let outLangFams: ITreeRoots<ILang>[] = [];

		this._langFams.forEach( (tl) => {
			let newT: Tree<ILang> = new Tree<ILang>( tl.root.ILang );
			tl.forEach( (l,i,t) => {
				if (t.father) {
					let f = newT.getSubTreeById(t.father.id);
					f!.addChild( t.root.ILang )
				}
			} )
			outLangFams.push( newT.getTreeRoots() );
			console.log( JSON.stringify( newT.getTreeIds() ))
		})

		return {
			'_total': this._total,
			'_langFams': outLangFams,
		}
	}

	loadAll( obj: ILoadController ) {
		this.reset()

		this._mem = {
			createdLang: undefined,
			selectedTree: undefined, 
		};

		this._total = obj._total;

		obj._langFams.forEach( (tr, i) => {
			const r: Tree<Lang> = this.createLangFam( tr )
			this._langFams.set( i, r )
		} )
	}

	private createLangFam(obj: ITreeRoots<ILang>, father?: Tree<Lang>): Tree<Lang> {
		let out: Tree<Lang>, added: Tree<Lang>;
		
		const l = Lang.load(obj.root);

		if (!father) {
			out = new Tree<Lang>( l );
			added = out;
		} else {
			out = father;
			added = out.addChild( l );
		}

		obj.children.forEach( (e) => {
			this.createLangFam( e, added )
		} )

		return out;
	}
	
	reset(): void {
		this._langFams.clear();
		this._total = 0;
	}

	// new Fam
	createFam( config?: IConfig ): ILang {
		this._mem.createdLang = (config) ? new Lang(config) : new Lang();
		return this._mem.createdLang.ILang;
	}

	addFam( l?: ILang ) {
		if (!this._mem.createdLang)
			throw new Error(`no existe en memoria ninguna lang creada`)
		if (l) {
			this._mem.createdLang.editableFields = l;
		}
		this._langFams.set(
			this._total++,
			new Tree<Lang>(this._mem.createdLang)
		);
		this._mem.createdLang = undefined;
	}

	// navigate in trees lang
	get selectedTree(): Tree<Lang> | undefined { // TODO: cambiar
		let out: Tree<Lang> | undefined = undefined;
		if ( this._mem.selectedTree !== undefined ) {
			out = this._mem.selectedTree
		}
		return out;
	}
	get subFamArray(): ILang[] {
		let out: ILang[] = [];
		if (!this._mem.selectedTree) {
			this._langFams.forEach( (v: Tree<Lang>) => {
				out.push( v.root.ILang );
			})
		} else {
			this._mem.selectedTree.children.forEach( (v: Lang) => {
				out.push( v.ILang )
			})
		}
		return out;
	}

	resetSelection(): void { this._mem.selectedTree = undefined }

	private get selected(): Lang | undefined { 
		return this._mem.selectedTree && this._mem.selectedTree.root;
	}

	getSelected(): ILang | undefined {
		return this.selected?.ILang
	}

	selectFather(): ILang | undefined {
		let out: ILang | undefined = undefined
		if (this._mem.selectedTree !== undefined) {
			this._mem.selectedTree = this._mem.selectedTree.fatherTree;
			if (this.selected !== undefined)
				out = this.selected.ILang;
		}
		return out;
	}

	selectChildById( id: number ): ILang | undefined {
		let out: ILang | undefined = undefined
		if (this._mem.selectedTree === undefined) {
			this._mem.selectedTree = this._langFams.get(id);
		} else {
			this._mem.selectedTree = this._mem.selectedTree.childrenTrees.find( e => e.root.id === id );
		}
		if (this.selected) { out = this.selected.ILang }
		return out
	}

	// edit, save, influence and derivate
	editLangSelected(l: ILang): void {
		if (!!this.selected) {
			if ( this.isEditable() )
				throw new Error(`No se puede editar porque tiene sublangs`)

			this.selected.editableFields = l;
		} else {
			throw new Error(`no se encontró lang selecte`)
		}
	}

	isEditable(): boolean {
		return !!this._mem.selectedTree && this._mem.selectedTree.children.length === 0;
	}
	
	generateNewMorphSelected( sc: MorphSchemaCode ): {ok: boolean, morph: string} | undefined {
		if ( !!this.selected && this.isEditable()) {
			return this.selected.newMorph( sc );
		}
	}

	generateNewWordSelected( sc: WordSchemaCode ): {ok: boolean, word: string} | undefined {
		if ( !!this.selected && this.isEditable() ) {
			return this.selected.newWord( sc );
		}
	}

	getPersonNameGenredSelected(genre: 'm' | 'f', w: string): string | undefined {
		if ( !!this.selected && this.isEditable() ) {
			return this.selected.getPersonNameGenred( genre, w );
		}
    }

    getFamilyNameGenredSelected(genre: 'm' | 'f', w: string): string | undefined {
        if ( !!this.selected && this.isEditable() ) {
			return this.selected.getFamilyNameGenred( genre, w );
		}
    }

    genrederSelected(genre: 'm' | 'f', w: string): string | undefined {
        if ( !!this.selected && this.isEditable() ) {
			return this.selected.genreder( genre, w );
		}
    }

    getSpelledWordSelected(word: string): string | undefined {
		if ( !!this.selected && this.isEditable() ) {
			return this.selected.getSpelledWord( word );
		}
    }

	derivateLangSelected(rules: ChangeRule[], configChange: IConfig): ILang {
		if (!!this._mem.selectedTree) {
			let lt: Tree<Lang> = this._mem.selectedTree;
			let der: Lang = LangTransform.instance.derivate(
				lt.root,
				rules,
				configChange
			);
			lt.addChild(der)
			this.selectChildById( der.id );
			return der.ILang;
		} else {
			throw new Error(`no se encontró lang selected`)
		}
	}

	// influence
	influenceLangSelected(l: ILang): ILang {
		if (!!this._mem.selectedTree) {
			let lt: Tree<Lang> = this._mem.selectedTree;
			
			let inf: Lang = LangTransform.instance.influence( lt.root, l )
			lt.addChild(inf)
			this.selectChildById( inf.id );
			return inf.ILang;
		} else {
			throw new Error(`no se encontró lang selected`)
		}
	}

	// find
	findLangById( id: number ): Lang | undefined {
		let out: Lang | undefined = undefined;
		this._langFams.forEach( (tl: Tree<Lang>) => {
			if (!out)
				out = tl.getRootById(id)
		} )
		return out;
	}

}