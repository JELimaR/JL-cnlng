import fs from 'fs';
import path from 'path';

import Lang, {ILang} from './Lang';
import Tree from './TreeUtil';
import {IConfig} from './config/LangConfig'
import LangTransform from './Transform/LangTransform';
import { ChangeRule } from './Transform/LangTransformRule'

interface IConfigController {
	folderPath?: string;
}

interface IMemoryLangController {
	createdFamLang: Lang | undefined;
	selectedFamLangTree: Tree<Lang> | undefined;
}

export default class Langcontroller {
	
	private static _total: number = 0;
	private static _instance: Langcontroller;
	private _folderPath: string = path.join(__dirname, `/langData`);

	private _memory: IMemoryLangController = {
		createdFamLang: undefined,
		selectedFamLangTree: undefined, 
	}

	private _langFams: Map<number,Tree<Lang>> = new Map<number,Tree<Lang>>();

	private constructor(i: IConfigController) {
		if (i.folderPath) {
			this.changeFolderPath( i.folderPath )
		}
	}

	private changeFolderPath(p: string) {
		if ( fs.existsSync( this._folderPath ) )
			fs.rmSync(this._folderPath, { recursive: true });
		this._folderPath = p;
		Lang.folderPath = this._folderPath;
		if ( !fs.existsSync( this._folderPath ) )
			fs.mkdirSync( this._folderPath, { recursive: true} );
		this.saveAll()
	}

	static getInstance(i: IConfigController): Langcontroller {
		if ( !Langcontroller._instance ) {
			Langcontroller._instance = new Langcontroller(i)
		}
		return Langcontroller._instance;
	}
	
	reset(): void {
		fs.rmSync(this._folderPath, { recursive: true });
		this._langFams = new Map<number,Tree<Lang>>();
	}

	loadAll(): void {
		if (true) {
			console.log('true')
		}
	}

	saveAll(): void {
		let tree: any[] = []; // borrar
		fs.mkdirSync( this._folderPath, { recursive: true} );
		this._langFams.forEach( (t: Tree<Lang>, k: number) => {
			t.forEach( (l: Lang, i) => {
				l.saveSync();
			} )
			let filePath: string = path.join(this._folderPath, `/fam_${k}.famjson`); // path no es necesario realmetne
			fs.writeFileSync(filePath, JSON.stringify( t.getTreeIds() ));
			tree.push( t.getTreeRoots() );
		} )		
		
		// console.log( tree )
	}

	// new Fam
	createFam( config?: IConfig ): Lang {
		this._memory.createdFamLang = (config) ? new Lang(config) : new Lang();
		return this._memory.createdFamLang.copy();
	}

	addFam( l?: Lang ) {
		if (!this._memory.createdFamLang)
			throw new Error(`no existe en memoria ninguna lang creada`)
		if (l) {
			this._memory.createdFamLang = l.copy();
		}
		this._langFams.set(
			Langcontroller._total++,
			new Tree<Lang>(this._memory.createdFamLang)
		);
		this._memory.createdFamLang = undefined;
	}

	// navigate in tree lang
	getSubFamList() {
		let out = new Map<number, Lang>();
		if (!this._memory.selectedFamLangTree) {
			this._langFams.forEach( (v: Tree<Lang>) => {
				out.set( v.root.id, v.root );
			})
		} else {
			this._memory.selectedFamLangTree.children.forEach( (v: Lang) => {
				out.set( v.id, v )
			} )
		}
		return out;
	}

	resetSelection(): void { this._memory.selectedFamLangTree = undefined }

	get selected(): Lang | undefined { 
		return this._memory.selectedFamLangTree?.root.copy();
	}

	selectFather(): Lang | undefined {
		if (this._memory.selectedFamLangTree !== undefined) {
			this._memory.selectedFamLangTree = this._memory.selectedFamLangTree.father;
		}
		return this.selected;
	}

	selectChildById( id: number ): Lang | undefined {
		if (this._memory.selectedFamLangTree === undefined) {
			/*if ( this._langFams.has(id) ){
				this._memory.selectedFamLangTree = this._langFams.get(id);
			} */
			this._memory.selectedFamLangTree = this._langFams.get(id);
		} else {
			this._memory.selectedFamLangTree = this._memory.selectedFamLangTree.subTrees.find( e => e.root.id === id );			
		}
		return this.selected
		/*if (this._memory.selectedFamLangTree === undefined) {
			throw new Error(`no se encontró lang con id: ${id}`)
		} else {
			return this._memory.selectedFamLangTree.root.copy();
		}*/
	}
	// edit and derivate
	editLangSelected(l: Lang): void {
		if (!!this._memory.selectedFamLangTree) {
			this._memory.selectedFamLangTree.root = l.copy();
			this.saveAll();
			this._memory.selectedFamLangTree = undefined;
		} else {
			throw new Error(`no se encontró lang selecte`)
		}
	}

	derivateLangSelected(rules: ChangeRule[], configChange: IConfig): Lang {
		if (!!this._memory.selectedFamLangTree) {
			let lt: Tree<Lang> = this._memory.selectedFamLangTree;
			let der: Lang = LangTransform.instance.derivate(
				lt.root,
				rules,
				configChange
			);
			lt.addChild(der)
			// this.selectChildById( der.id );
			return der;
		} else {
			throw new Error(`no se encontró lang selecte`)
		}
	}

}