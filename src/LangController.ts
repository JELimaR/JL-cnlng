import Lang from './Lang';
import Tree from './TreeUtil';


export default class Langcontroller {
	
	private static _total: number = 0;
	private static _instance: Langcontroller;

	private _langFams: Map<number,Tree<Lang>> = new Map<number,Tree<Lang>>();

	private constructor() { /* this is intentionally */ }

	static get instance(): Langcontroller {
		if ( !Langcontroller._instance ) {
			Langcontroller._instance = new Langcontroller()
		}
		return Langcontroller._instance;
	}

	

}