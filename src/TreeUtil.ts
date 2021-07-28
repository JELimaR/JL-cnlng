
type I = number | string;

interface TreeNode /*extends Object*/ {
	id: I
}

export default class Tree<T extends TreeNode> {
	private _root: T;
	private _father: Tree<T> | undefined = undefined;
	private _children : Map<I,Tree<T>> = new Map<I,Tree<T>>();

	constructor(t: T, father?: Tree<T>) {
		this._root = t;
		this._father = father;
	}

	get root() { return this._root }
	set root(t: T) { this._root = t }
	get children(): Array<T> {
		let out: T[] = [];
		this._children.forEach( (val: Tree<T>) => { 
			out.push( val._root ) 
		})
		return out;
	}
	get subTrees(): Array<Tree<T>> {
		let out: Tree<T>[] = [];
		this._children.forEach( (val: Tree<T>) => { 
			out.push( val ) 
		})
		return out;
	}
	get father(): Tree<T> | undefined { return this._father }

	// corregir tipos
	getTreeIds() {
		let a: any[] = [];
		this._children.forEach( (e: Tree<T>) => {
			a.push( e.getTreeIds() )
		} )
		return {
			root: this._root.id,
			children: a,
		}
	}
	// corregir tipos
	getTreeRoots() {
		let a: any[] = [];
		this._children.forEach( (e: Tree<T>) => {
			a.push( e.getTreeRoots() )
		} )
		return {
			root: this._root,
			children: a,
		}
	}
	
	addChild(n: T): void {
		this._children.set( n.id, new Tree<T>( n, this ) )
	}

	getSubTreeById(id: I): Tree<T> | undefined {
		let out: Tree<T> | undefined = undefined;
		if ( this._root.id === id ) {
			out = this
		} else {
			// TODO: usar un while			
			this._children.forEach( (v: Tree<T>) => {
				const t = v.getSubTreeById(id)
				if (!!t) out = t;
			} )
		}
		return out;
	}

	getById(id: I): T | undefined {
		const tree = this.getSubTreeById( id );
		return tree && tree._root;
	}

	forEach(callback: (t: T, i?: I) => void): void {
		callback( this._root, this._root.id );
		this._children.forEach( (v: Tree<T>) => {
			v.forEach( callback )
		} )
	}
}