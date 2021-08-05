import { defaultConfig } from '../config/ConfigConstants';
import { IConfig } from '../config/LangConfig';
import { CorthsList, VorthsList } from '../config/Orths';
import { conssets, ssets, vowssets } from '../config/Phonemes';
import { ILang } from '../Lang';
import Langcontroller from '../LangController';
import { ChangeRule } from '../Transform/LangTransformRule';
let lc = Langcontroller.instance;

let per: string = '';
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
    'wordSchemas': {...defaultConfig.wordSchemas, 'PersonNeutralNames': ['m', 'mm']},
    'specialStructures': ['V', 'CV'],
    'morphStructures': ['CVC', 'SVC?'],
    'wordStructures': ['ZVC', 'ZVV?CCVC']
}

test( 'new instance', () => {
    let lcother = Langcontroller.instance
    expect( lcother === lc ).toBeTruthy();
    expect( lc.subFamArray.length ).toEqual(0);
    expect( lc.selectedTree ).toBeUndefined();
    expect( lc.getSelected() ).toBeUndefined();
    lc.reset();
})

test('addFam & get subFamArray without l selected', () => {
    lc.createFam();
    expect( lc.subFamArray.length ).toEqual(0);
    lc.addFam();
    expect( lc.subFamArray.length ).toEqual(1);
    for (let i = 0; i<10;i++) {
        lc.createFam();
        lc.addFam();
    }
    expect( lc.subFamArray.length ).toEqual(11);
    let l = lc.findLangById( 8 );
    expect( l?.id ).toEqual( 8 );
    
})

test('reset & resetSelection', () => {
    lc.reset();
    expect( () => lc.addFam() ).toThrow();
    lc.createFam();
    lc.addFam();
    let l = lc.findLangById( 0 );
    expect( l?.id ).toEqual( 0 );

    l = lc.selectLangById(0);
    expect( lc.getSelected() ).toEqual( l )

    lc.resetSelection();
    expect( lc.getSelected() ).toBeUndefined()

    l = lc.findLangById( 0 );
    expect( l?.id ).toEqual( 0 );

    lc.reset();
})

test('add child & selectFather & select child', () => {
    let sel: ILang | undefined;
    lc.createFam(); // 0
    lc.addFam();
    sel = lc.selectChildById(0);
    expect(sel).toBeDefined();

    sel = lc.derivateLangSelected( rules, configChange ); // 1
    expect(sel.id).toBe( 1 )
    expect( lc.getSelected()?.id ).toBe( 1 )

    expect( lc.subFamArray.length ).toEqual(0);
    lc.selectChildById(0)
    expect( lc.getSelected() ).toBeUndefined();
    lc.selectFather();

    expect( lc.getSelected()?.id ).toEqual( 0 );
    lc.selectChildById(2);
    expect( lc.getSelected()?.id ).toBeUndefined();
    lc.selectChildById(1);
    expect( lc.getSelected()?.id ).toEqual(1);
    
})

