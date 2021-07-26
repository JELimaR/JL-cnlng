import globalSets from "../config/Phonemes";

const C = globalSets.consonants;
const V = globalSets.vowals;
const isEmpty = (arr: string[]): boolean => {
    return arr.length === 0 || arr[0] === '' || arr[0] === '\\B'
};

const getSet = ( c: string ): string[] => {
    let out: string[];
    switch (c) {
        case 'C':
            out = [...C];
            break;
        case 'V':
            out = [...V];
            break;
        default:
            throw new Error(`${c} is not a set of phonemes`)
    }
    return out;
}


export interface ICondition {
    pre: string[];
    post: string[];
}


export class ChangeRule {
    value: string;
    new: string;
    condition: RegExp;

    constructor(v: string, n: string, condition: ICondition) {

        if ( v === n ) {
            throw new Error(`El value y el new no pueden ser iguales`);
        }
        if ( v === '' && ( isEmpty(condition.pre) || isEmpty(condition.post) ) ) {
            throw new Error(`Para realizar una insercion es necesario que las conditions no sean nulas.
                ${ (isEmpty(condition.post)) ? 'post ' : 'pre '}condition vacia o '\\B': ${condition.post}.
            `)
        }
        

        this.value = v;
        this.new = n;

        const pre = `(${this.translate( condition.pre )})`;
        const obj = this.translate( [v] );
        const post = `(${this.translate( condition.post )})`;

        this.condition = new RegExp( `${pre}${ obj }${post}` );
        
    }

    apply( s: string ): string {
        let out: string = s;
        let e = this.condition.exec( out );

        let count: number = 0;
        while (e) {
            count++;
            const aux = s;
            out = out.replace( this.condition, `${e[1]}${this.new}${e[2]}` );
            
            e = this.condition.exec( out );
            
            if ( count > 100 ) {
                throw new Error(`La regla de busqueda construida: ${this.condition}
                    no termina para la palabra: ${s} cuando se inserta: ${this.new}.
                    El valor actual de out es: ${out}.
                    Se inserta ${this.new} para exec: ${e?.toString()}
                `)
            }
        }
        return out;
    }

    private translate = ( c: string[]): string => {
        let out: string = '';
        for (let l of c) {
            
            let none: string = '', letter = l, elements = '';
            if ( l.includes('/') ) {
                const parts = l.split('/');
                letter = parts[0];
                none = parts[1];
            }
			if ( l.includes('%') ) {
				letter = '%';
				elements = l.slice(1,l.length-1);
			}
    
            switch (letter) {
                case '^':
                    out += `^`;
                    break;
                case '$':
                    out += `$`;
                    break;

                case 'C': case 'V': 
                    let s = getSet( letter )
                    for ( let n of none ) {
                        s = s.filter( (e) => e !== n )
                    }
                    s = s.filter( (e) => e !== this.new) // no debe buscarse el valor que se va a agregar
                    out += `[(${s.join('|')})]`
                    break;

				case '%':
					out += `[(${elements})]`
					break;
                default:
                    out += l;
                    break;
            }
        }
        return out;
    }
}


