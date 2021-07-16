import Lang from './src/Lang';
import IConfig from './src/config/Interfaces';
import { defaultConfig } from './src/config/ConfigConstants';
import { conssets, defaultPhonemeSets, vowssets } from './src/config/PhonemeSetConstants';

const config: IConfig = {
    phonemes: {
        ...defaultPhonemeSets,
        cons: conssets['ArabicLite'],
        vows: vowssets['3 Vowel e o u']
    },
    orth: defaultConfig.orth, 
    wordSchemas: defaultConfig.wordSchemas,
    morphStructures: new Set<string>(['CVC', 'C?VC'])
}

const l1 =  new Lang();
l1.name = 'Lang 1';

const l2 = new Lang( config );
l2.name = 'Lang 2';

console.log('-------------------------------------\n' + l1.name + ':');
console.log(l1.config);
console.log('-------------------------------------\n' + l2.name + ':');
console.log(l2.config);

