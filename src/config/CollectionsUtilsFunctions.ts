// TODO: mover
export default class CollectionsUtilsFunctions {

    private static _instance: CollectionsUtilsFunctions;

    private constructor() { /* this is intentionally */ } 

    static getInstance(): CollectionsUtilsFunctions {
        if (!CollectionsUtilsFunctions._instance) {
            CollectionsUtilsFunctions._instance = new CollectionsUtilsFunctions();
        }
        return CollectionsUtilsFunctions._instance;
    }
    
    choose<T>(inn: Array<T> | Set<T>, exponent: number = 1): T { 
        let arr = Array.from( inn )
        let l: number = arr.length;
        if (l > 0) {
            return arr[Math.floor( Math.pow(Math.random(), exponent) * l)];
        } else {
            throw new Error(`El arreglo tiene largo nulo`)
        }
    }
    
    shuffled<T>(list: Array<T>) {
		let param = 0;
        interface Sorter {
            data: T,
            value: number
        }

        let newlist = Array<Sorter>(), out: Array<T>;
        for (let i = 0; i < list.length; i++) {
			const value = Math.random()*(1-param)*list.length + param*(i+1);
            newlist.push({data: list[i], value: value});
        }
        newlist = newlist.sort( (a,b) => a.value - b.value );
        out = newlist.map( (e) => e.data );

        return out;
    }

    private randrange( hi: number, lo: number = 0): number {
        return Math.floor(Math.random() * (hi - lo)) + lo;
    }

}
