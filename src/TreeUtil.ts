
type I = number | string;

interface TreeNode /*extends Object*/ {
	id: I
}

export default class Tree<T extends TreeNode> {
	private _root: T;
	private _children : Map<I,Tree<T>> = new Map<I,Tree<T>>();

	constructor(t: T) {
		this._root = t;
	}

	get root() { return this._root }
	get children(): Array<T> {
		let out: T[] = [];
		this._children.forEach( (val: Tree<T>) => { 
			out.push( val._root ) 
		})
		return out;
	}
	
	addChildren(n: T): void {
		this._children.set( n.id, new Tree<T>( n ) )
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
}