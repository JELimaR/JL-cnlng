import Tree from './TreeUtil'
import Lang from './Lang'

class Test {
	private static _currentId: number = 0
	id: number; elem: number;
	constructor(e: number) {
		this.elem=e;
		this.id=Test._currentId++;
	}
	suma(): void {
		this.elem+=1
	}
}


export default function() {
	
	const a1 = new Test(8);
	let t1 = new Tree<Test>( a1 )
	console.log( t1.children )
	t1.addChildren( new Test(16) )
	t1.addChildren( new Test(17) )
	console.log( t1.children )

	let gn: Test | undefined = t1.getById(2)
	console.log(gn)

	let gt: Tree<Test> | undefined = t1.getSubTreeById(0);
	
	if (gt === t1)
	console.log('iguales')

	gt = t1.getSubTreeById(1);
	
	if (gt)
	console.log(gt.children)



	let tl = new Tree<Lang>( new Lang() );
}