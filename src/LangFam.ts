import Lang from './Lang';

export class LangFam {
	lang: Lang;
	childrens: Map<number, LangFam> = new Map<number, LangFam>();

	constructor(lang: Lang) {
		this.lang = lang;
	}

	addChildren(l: Lang): void {
		const child: LangFam = new LangFam(l)
		this.childrens.set(l.id, child);
	}

	getChildren(): any {
		return Array.from( this.childrens );
	}

}