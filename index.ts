import path from 'path'

import r from './src/example'
import Tree from './src/TreeUtil'
import LangController from './src/LangController'
import Lang, { ILang } from './src/Lang';
import { defaultConfig } from './src/config/ConfigConstants';
import { conssets, defaultPhonemeSets, ssets, vowssets } from './src/config/Phonemes';
import CollectionsUtilsFunctions from './src/config/CollectionsUtilsFunctions';
import { IConfig } from './src/config/LangConfig';
import LangTransform from './src/Transform/LangTransform';
import { ChangeRule } from './src/Transform/LangTransformRule'
import { CorthsList, VorthsList } from './src/config/Orths';

let config: IConfig = {
		...defaultConfig,
		phonemes: {
			...defaultPhonemeSets,
			cons: conssets['ArabicLite'],
		},
	}

let lc: LangController = LangController.getInstance({
	folderPath: path.join(__dirname, '/../data')
});


lc.createFam();
lc.addFam();

lc.createFam();
lc.addFam();

lc.createFam();
lc.addFam();

lc.saveAll();
lc.selectChildById(0)
//console.log(lc.selectChildById(0));

let rules: ChangeRule[] = [
		new ChangeRule('V', 'E', {pre: ['%tk%'], post: ['']}),
		new ChangeRule('C', 'X', {pre: ['.{2}','o'], post: ['$']}),
		new ChangeRule('oX', 'O', {pre: [''], post: ['']}),
	];
let configChange: IConfig = {
	'exponent': 2,
	'orth': { 'corth': CorthsList.slavic, 'vorth': VorthsList.nordics },
	'phonemes': {
		'cons': conssets['ArabicLite'],
		'vows': vowssets['Extra A E I'],
		'ss': ssets['S SH']
	},
	'wordSchemas': defaultConfig.wordSchemas,
	'specialStructures': ['V', 'CV'],
	'morphStructures': ['CVC', 'SVC?'],
	'wordStructures': ['ZVC', 'ZVV?CCVC']
}

lc.derivateLangSelected( rules, configChange )

//lc.resetSelection();
console.log(lc.selectChildById(0));
lc.selectChildById(3);
lc.selectFather();
lc.resetSelection();
lc.saveAll()
//console.log( lc.getSubFamList() )
lc.resetSelection();

console.log( lc.findLangById( 3 )?.id )

//lc.reset()