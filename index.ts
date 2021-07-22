import Lang from './src/Lang';
import { defaultConfig } from './src/config/ConfigConstants';
import { conssets, defaultPhonemeSets, vowssets } from './src/config/Phonemes';
import CollectionsUtilsFunctions from './src/config/CollectionsUtilsFunctions';
import { IConfig } from './src/config/LangConfig';

const CUF = CollectionsUtilsFunctions.getInstance();

let config: IConfig = {
    ...defaultConfig,
    phonemes: {
        ...defaultPhonemeSets,
        cons: conssets['ArabicLite'],
        vows: CUF.shuffled( vowssets['3 Vowel e o u'] )
    }, 
    wordSchemas: {...defaultConfig.wordSchemas, 'BoyNames': new Set(['D-D', 'D'])},
    morphStructures: ['CVC', 'C?VC'],
    wordStructures: ['CVV?F', 'CVVLVV?F']
}

const l1 =  new Lang( );
l1.name = 'Lang 1';

const l2 = new Lang( config );
l2.name = 'Lang 2';

for (let i = 0; i<1; i++) {
    l1.newWord('B')
    l2.newWord('B')
}

console.log('-------------------------------------\n' + l2.name + ':');

let l3: Lang;
l3 = l2.influence( l1 );

console.log( l2.words )
l3.name = 'Lang 3';
console.log('-------------------------------------\n' + l3.name + ':');
console.log( l3.words );


