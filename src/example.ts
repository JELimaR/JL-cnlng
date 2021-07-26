import Lang, { ILang } from './Lang';
import { defaultConfig } from './config/ConfigConstants';
import { conssets, defaultPhonemeSets, ssets, vowssets } from './config/Phonemes';
import CollectionsUtilsFunctions from './config/CollectionsUtilsFunctions';
import { IConfig } from './config/LangConfig';
import LangTransform from './Transform/LangTransform';
import { ChangeRule } from './Transform/LangTransformRule'
import { CorthsList, VorthsList } from './config/Orths';

export default function() {
	const CUF = CollectionsUtilsFunctions.getInstance();

	let config: IConfig = {
		...defaultConfig,
		phonemes: {
			...defaultPhonemeSets,
			cons: conssets['ArabicLite'],
			vows: CUF.shuffled( vowssets['3 Vowel e o u'] )
		},
		wordSchemas: {...defaultConfig.wordSchemas, 'PersonNeutralNames': ['m', 'mm']},
		morphStructures: ['CVC', 'V?VC'],
		wordStructures: ['C?VV?F', 'CVVCLVF']
	}

	const l1 =  new Lang( config );
	l1.name = 'Lang 1';

	for (let i = 0; i<21; i++) {
		l1.newMorph('d');
		l1.newMorph('l');
		

		l1.newWord('D');
		l1.newWord('P');
	}

	console.log(l1.words['PersonNeutralNames'])

	let w: string = CUF.choose( l1.words['PersonNeutralNames'] );

	const wf = l1.getPersonNameGenred('f', w);
	const wm = l1.getPersonNameGenred('m', w);

	console.log( wf )
	console.log( wm )

	let l1json: ILang = JSON.parse(JSON.stringify(l1));

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
		'wordSchemas': {...l1.config.wordSchemas},
		'specialStructures': ['V', 'CV'],
		'morphStructures': ['CVC', 'SVC?'],
		'wordStructures': ['ZVC', 'ZVV?CCVC']
	}
	try {
		
		let der: Lang = LangTransform.instance.derivate( l1, rules, configChange );
		
		for (let i = 0; i<6; i++) {
			l1.newWord('D');
			der.newWord('D');
		}
		console.log( l1.words['Defaults'].map(wd => l1.getSpelledWord(wd))) ;
		console.log( der.words['Defaults'].map(wd => l1.getSpelledWord(wd)) );
		for (let i of rules) {
			console.log( i.condition.toString() )
		}
		der.specials = {...l1.specials}
	} catch (e) {
		console.error(e)
	}

	l1.saveSync()

}