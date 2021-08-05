import Langcontroller from '../LangController';
let lc = Langcontroller.instance;

let per: string = '';

test( 'new instance', () => {
    let lcother = Langcontroller.instance
    expect( lcother === lc ).toBeTruthy();
    expect( lc.subFamArray.length ).toEqual(0);
    expect( lc.selectedTree ).toBeUndefined();
    expect( lc.getSelected() ).toBeUndefined();
    lc.reset();
})

test('addFam & get subFamArray withoot selected', () => {
    lc.createFam();
    expect( lc.subFamArray.length ).toEqual(0);
    lc.addFam();
    expect( lc.subFamArray.length ).toEqual(1);
    for (let i = 0; i<10;i++) {
        lc.createFam();
        lc.addFam();
    }
    expect( lc.subFamArray.length ).toEqual(11);
})