
import Langcontroller from './LangController';
import { ILang } from './Lang';
import { IConfig } from './config/LangConfig';
import { ChangeRule } from './Transform/LangTransformRule';
import { defaultConfig } from './config/ConfigConstants';
import * as Phonemes from './config/Phonemes';
import * as Orths from './config/Orths';
import * as LangSchemaCode from './config/LangSchemaCode'

export default Langcontroller

export {
	ILang,
	IConfig,
	ChangeRule,
	defaultConfig,
	Phonemes,
	Orths,
	LangSchemaCode
}
