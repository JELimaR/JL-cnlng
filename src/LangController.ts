import fs from 'fs';
import path from 'path';

import Lang, {ILang} from './Lang';
import {Tree, ITreeIds} from 'jl-utlts';
import {IConfig} from './config/LangConfig'
import LangTransform from './Transform/LangTransform';
import { ChangeRule } from './Transform/LangTransformRule'
import {
    MorphSchemaCode,
    WordSchemaCode,
} from './config/LangSchemaCode';

interface IConfigController {
	folderPath?: string;
}

interface IMemoryLangController {
	createdLang: Lang | undefined;
	selectedTree: Tree<Lang> | undefined;
}

// TODO: crear clase selection?
export default class Langcontroller {
	
	private static _instance: Langcontroller;

	private _hasConfig: boolean = false;
	private _folderPath: string = path.join(__dirname, `/langData`);

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

	private changeFolderPath(p: string) {
		if (p !== this._folderPath) {
			if ( fs.existsSync( this._folderPath ) )
				fs.rmSync(this._folderPath, { recursive: true });
			this._folderPath = p;
			Lang.folderPath = this._folderPath;
			if ( !fs.existsSync( this._folderPath ) )
				fs.mkdirSync( this._folderPath, { recursive: true} );
			this.saveAll()
		}
	}

	static getInstance(): Langcontroller {
		if ( !Langcontroller._instance ) {
			Langcontroller._instance = new Langcontroller()
		}
		return Langcontroller._instance;
	}

	configurate(i: IConfigController) {
		this._hasConfig = true; 
		if (i.folderPath) {
			this.changeFolderPath( i.folderPath )
		}
	}
	
	reset(): void {
		fs.rmSync(this._folderPath, { recursive: true });
		this._langFams = new Map<number,Tree<Lang>>();
		this._total = 0;
	}

	loadAll(): void {
		if (fs.existsSync( this._folderPath )) {
			let i: number = 0;
			let filePath: string = path.join(this._folderPath, `/fam_${i}.famjson`);
			while ( fs.existsSync(filePath) ) {
				
				const f = JSON.parse( fs.readFileSync( filePath, {encoding:'utf8', flag:'r'} ) );

				//console.log( JSON.stringify(this.createLangFam( f ).getTreeIds() ));
				this._langFams.set(i, this.createLangFam( f ) )
								
				i++;
				filePath = path.join(this._folderPath, `/fam_${i}.famjson`);
			}
			this._total = i;
		}
	}

	private createLangFam(obj: ITreeIds<number>, father?: Tree<Lang>): Tree<Lang> {
		let out: Tree<Lang>, added: Tree<Lang>;
		const l = Lang.loadSync(obj.root);

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

	saveAll(): void {
		
		fs.mkdirSync( this._folderPath, { recursive: true} );
		this._langFams.forEach( (t: Tree<Lang>, k: number) => {
			t.forEach( (l: Lang, i) => {
				l.saveSync();
			} )
			let filePath: string = path.join(this._folderPath, `/fam_${k}.famjson`); 
			fs.writeFileSync(filePath, JSON.stringify( t.getTreeIds() ));
		} )
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
	get subFamList(): Map<number, ILang> {
		let out = new Map<number, ILang>();
		if (!this._mem.selectedTree) {
			this._langFams.forEach( (v: Tree<Lang>) => {
				out.set( v.root.id, v.root );
			})
		} else {
			this._mem.selectedTree.children.forEach( (v: Lang) => {
				out.set( v.id, v.ILang )
			} )
		}
		return out;
	}

	resetSelection(): void { this._mem.selectedTree = undefined }

	private get selected(): Lang | undefined { 
		return this._mem.selectedTree && this._mem.selectedTree.root;
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

	saveSelected(): void {
		if ( !!this.selected ) {
			this.selected.saveSync();
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
			
			let inf: Lang = LangTransform.instance.influence( lt.root, Lang.loadSync( l.id ) )
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