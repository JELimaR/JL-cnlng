
//import './tests/LangController.test';

import Langcontroller from './src/LangController'
import { ILang } from './src/Lang';
import { IConfig } from './src/config/LangConfig';
import { ChangeRule } from './src/Transform/LangTransformRule';
import { defaultConfig } from './src/config/ConfigConstants';
import * as Phonemes from './src/config/Phonemes';
import * as Orths from './src/config/Orths';

export default Langcontroller

export {
	ILang,
	IConfig,
	ChangeRule,
	defaultConfig,
	Phonemes,
	Orths
}