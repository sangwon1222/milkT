export class OptionValue {

    //-----------------------------------
    // singleton
    private static _handle: OptionValue;
    static get Handle(): OptionValue { 
        if( OptionValue._handle === undefined ){
            OptionValue._handle = new OptionValue();
        }
        return OptionValue._handle 
    }
    //-----------------------------------

    private mLansIsKr: boolean; // 한글 여부 설정
    private mKeyboardLink: boolean; // 블루투스 키보드 연결 여부 설정
    private nBgm: boolean; // 배경음 설정
    private nEfSound: boolean; //효과음 설정


    constructor() {

        this.mLansIsKr = true; 
        this.mKeyboardLink = true; // 체크할 방법 찾아야 함.
        this.nBgm = true;
        this.nEfSound = true;

    }

    // 언어 상태
    set langIsKr( b: boolean ) {
        this.mLansIsKr = b;
    }
    get langIsKr(): boolean { return this.mLansIsKr; }


    // 키보드 상태
    set keyboardLink( b: boolean ) {
        this.mKeyboardLink = b;
    }
    get keyboardLink(): boolean { return this.mKeyboardLink; }


    // 배경음 상태
    set bgm( b: boolean ) {
        this.nBgm = b;
    }
    get bgm(): boolean { return this.nBgm; }


    // 효과음 상태
    set efSound( b: boolean ) {
        this.nEfSound = b;
    }
    get efSound(): boolean { return this.nEfSound; }
}