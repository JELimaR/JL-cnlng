
import path from 'path'

import {
    IMorphemeLangSets,
    IWordLangSets,
    MorphKey,
    MorphSchemaCode,
    morphSchemasCodeMap,
    SchemaCodeExtended,
    WordKey,
    WordSchemaCode,
    wordSchemasCodeMap,
    ISpecialMorphemes,
    isSchemaCodeExtended,
} from '../src/config/LangSchemaCode';

import r from '../src/example'
import Tree from '../src/TreeUtil'
import LangController from '../src/LangController'
import Lang, { ILang } from '../src/Lang';
import { defaultConfig } from '../src/config/ConfigConstants';
import { conssets, defaultPhonemeSets, ssets, vowssets } from '../src/config/Phonemes';
import CollectionsUtilsFunctions from '../src/config/CollectionsUtilsFunctions';
import { IConfig } from '../src/config/LangConfig';
import LangTransform from '../src/Transform/LangTransform';
import { ChangeRule } from '../src/Transform/LangTransformRule'
import { CorthsList, VorthsList } from '../src/config/Orths';

let config: IConfig = {
	...defaultConfig,
	phonemes: {
		...defaultPhonemeSets,
		cons: conssets['ArabicLite'],
	},
}

let lc: LangController = LangController.getInstance({
	folderPath: path.join(__dirname, '/../../data')
});

lc.reset()


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

lc.resetSelection();
lc.selectChildById(0)
console.log();
lc.selectChildById(3);

lc.selectFather();
lc.derivateLangSelected( rules, configChange )
lc.selectFather();
lc.derivateLangSelected( rules, configChange )
lc.derivateLangSelected( rules, configChange )
lc.resetSelection();
lc.selectChildById(2)
lc.derivateLangSelected( rules, configChange )
lc.derivateLangSelected( rules, configChange )
lc.saveAll()
//console.log( lc.getSubFamList() )
//lc.resetSelection();
let s = lc.selectedTree?.ancients;
// if (s) s.forEach( (e) => { console.log( e.id ) } )
lc.resetSelection();
lc.selectChildById(0)
lc.selectChildById(3)
s = lc.selectedTree?.brothers;
// if (s) s.forEach( (e) => { console.log( e.id ) } )

let prev = lc.borrar

lc.loadAll()

let post = lc.borrar

console.log('size')
console.log( prev.size === post.size )
console.log('parts')
for (let i=0; i<prev.size; i++) {
	console.log( i )
	console.log(prev.get(i)!.root.id === post.get(i)!.root.id)
	let out: {prev: number[], post: number[]} = {prev: [], post: []};

	prev.get(i)!.forEach( (l) => {
		out.prev.push( l.id )
	} );
	post.get(i)!.forEach( (l) => {
		out.post.push( l.id )
	} );
	for ( let j in out.prev ) {
		console.log('\t', j)
		console.log('\t',  out.prev[i] === out.post[i] )
	}
}



console.log('check')
lc.findLangById( 7 )

// Lang.loadSync( 81 )

// console.log( lc.selectedTree )

// lc.reset()