import path from 'path'

import r from './src/example'
import Tree from './src/TreeUtil'
import LangController from './src/LangController'

let lc: LangController = LangController.getInstance({
	folderPath: path.join(__dirname, '/../data')
});


lc.createFam();
lc.addFam();

lc.createFam();
lc.addFam();

lc.createFam();
lc.addFam();

console.log(lc)

lc.saveAll();



//lc.reset()