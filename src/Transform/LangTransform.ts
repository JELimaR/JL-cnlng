
import Lang from "../Lang";
import { IConfig }from '../config/LangConfig';
import { IMorphemeLangSets, ISpecialMorphemes, IWordLangSets, MorphKey, WordKey } from "../config/LangSchemaCode";
import { ChangeRule } from "./LangTransformRule";


export default class LangTransform {
    private static _instance: LangTransform;

    private constructor() { /* this is intentionally */ }
    
    static get instance(): LangTransform {
        if ( !LangTransform._instance )
            LangTransform._instance = new LangTransform();
        return LangTransform._instance;
    }

    influence(l: Lang, other: Lang): Lang {
        let out: Lang = l.copy();
        for (let k in other.words) {
            // recorrer mejor este set y langlisar palabras?
			// 
            other.words[k as WordKey].forEach((v) => {
                out.words[k as WordKey].push(v)
            })
        }
        return out;
    }

    derivate( l: Lang, rules: ChangeRule[], config: IConfig): Lang {
        let out: Lang = new Lang(config, l.level+1);

        let lists = {
            specials: l.specials,
            morphs: l.morphs,
            words: l.words,
        }        

        // MODIFICAR LOS SETS
        for ( let r in rules ) {
            lists = this.applyRuleInLists( rules[r], lists )
        }

        out.specials = lists.specials;
        out.morphs = lists.morphs;
        out.words = lists.words;
        
        return out;
    }

    private applyRuleInLists( rule: ChangeRule, l: ILists ): ILists {
        
        for (let k in l.words) {
            let arr = l.words[k as WordKey];
            for (let i=0; i<arr.length; i++) {
                l.words[k as WordKey][i] = rule.apply(arr[i]);
            }
        }
        for (let k in l.morphs) {
            let arr = l.morphs[k as MorphKey];
            for (let i=0; i<arr.length; i++) {
                l.morphs[k as MorphKey][i] = rule.apply(arr[i]);
            }
        }
        l.specials = {
            'plural': rule.apply(l.specials.plural ),
            genre: {
                'f': rule.apply(l.specials.genre.f ),
                'm': rule.apply(l.specials.genre.m ),
            }
        }
        return l;
    }

}

interface ILists {
    specials: ISpecialMorphemes<string>;
    morphs: IMorphemeLangSets<string>;
    words: IWordLangSets<string>;
}

export type TransformType = 'Derivate' | 'influence'

export type DerivateOpc = 'ins' | 'del' | 'rep'

