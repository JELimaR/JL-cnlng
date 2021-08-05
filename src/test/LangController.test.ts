import Langcontroller from '../LangController';
let lc = Langcontroller.instance;

let per: string = '';

test( 'new instance', () => {
    let lcother = Langcontroller.instance
    expect( lcother === lc ).toBeTruthy()
})