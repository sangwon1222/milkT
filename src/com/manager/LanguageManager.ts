export class LanguageManager{
    //-----------------------------------
    // singleton
    private static _handle: LanguageManager;
    static get Handle(): LanguageManager { 
        if( LanguageManager._handle === undefined ){
            LanguageManager._handle = new LanguageManager();
        }
        return LanguageManager._handle 
    }
    //-----------------------------------

    private mLang: string;
    private mLangFlag: boolean;

    constructor() 
    {
        LanguageManager._handle =this;
        this.langFlag = true;
    }

    get LANG(): string { return this.mLang; }
    get langFlag(): boolean { return this.mLangFlag; }
    set langFlag( bool: boolean )
    { 
        //console.log("langFlag = " + bool)

        this.mLangFlag = bool; 
        if( this.mLangFlag ) {
            this.mLang = "kr";
        } else {
            this.mLang = "en";
        }
    }
}