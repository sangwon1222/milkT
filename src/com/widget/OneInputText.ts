import { TextInput } from 'pixi-textinput-v5';
import { ObjectBase } from "../core/ObjectBase"
import { EventType } from "../core/EventType"
import * as TextStyle from '../design/TextStyle';
import * as Typing from '../../Utill/Typing'
import Config from '@/Utill/Config';

export class OneInputText extends ObjectBase{

    private mTextInput: TextInput;
    private mHtmlInput: HTMLInputElement;

    constructor( options?: TextStyle.TextInputOptions ){

        super();

        if(options) {
            this.mTextInput = new TextInput( options )
        } else {
            this.mTextInput = new TextInput( TextStyle.defaultInputTextStyle());
        } 

        this.mHtmlInput = ((this.mTextInput.htmlInput as any) as HTMLInputElement);
        // this.mHtmlInput.maxLength = 1;

        this.mHtmlInput.addEventListener('keyup', (evt: KeyboardEvent )=>{

            const pointChar = this.mHtmlInput.value.substr(this.mHtmlInput.value.length-1, this.mHtmlInput.value.length);
            const comp = Typing.getComposition(pointChar);

            let char: string;

            //종성이 마지막 타이핑한 글자이므로 끝에서부터 확인.
            if(comp.t != "") {
                char = comp.t;
            } else if(comp.s != "") {
                char = comp.s;
            } else if(comp.f != "") {
                char = comp.f;
            }

            // console.log(char);

            char = this.returnLastCompositionChar(char);
            if( char != undefined ) this.dispatchEvent(EventType.InputTextKeyUp, char );

            this.mHtmlInput.value = '';
        });

        this.mHtmlInput.addEventListener('input', (evt: InputEvent )=>{
            this.dispatchEvent(EventType.InputTextInput, evt);
        });
        
        this.addChild(this.mTextInput);
    }

    get htmlInput(): HTMLInputElement { return this.mHtmlInput; }

    checkNoEng(e) {

        /*
        if(e.type == 'text') {
            const value = e.value;
            if(Config.KorEngMode){
                if(/[a-zA-Z]/.test(value)) {
                    alert("한글버전 입니다. 영문로 변환해주세요.")
                    e.value = e.value.replace(/[a-zA-Z]/g,'');
                    return false;
                }else{
                    return true;    
                }
            }else{
                if(/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value)) {
                    alert("영문버전 입니다. 한글로 변환해주세요.")
                    e.value = e.value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g,''); // g가 핵심: 빠르게 타이핑할때 여러 한글문자가 입력되어 버린다.
                    return false;
                }else{
                    return true;
                }
            }
        }
        */
    }

    inFocus() {
        this.mTextInput.focus();
    }

    outFocus() {
        this.mTextInput.blur();
    }

    private returnLastCompositionChar( comp: string ): string {

        let char: string = comp;

        if( comp == 'ㄳ' || comp == 'ㄽ') char = 'ㅅ';
        if( comp == 'ㅀ' || comp == 'ㄶ') char = 'ㅎ';
        if( comp == 'ㄵ' ) char = 'ㅈ';
        if( comp == 'ㄺ' ) char = 'ㄱ';
        if( comp == 'ㄻ' ) char = 'ㅁ';
        if( comp == 'ㄼ' ) char = 'ㅂ';
        if( comp == 'ㄾ' ) char = 'ㅌ';
        if( comp == 'ㄿ' ) char = 'ㅍ';
        if( comp == 'ㅄ' ) char = 'ㅅ';

        if( comp == 'ㅘ' ) char = 'ㅏ';
        if( comp == 'ㅙ' ) char = 'ㅐ';
        if( comp == 'ㅚ' ) char = 'ㅣ';
        if( comp == 'ㅝ' ) char = 'ㅓ';
        if( comp == 'ㅞ' ) char = 'ㅔ';
        if( comp == 'ㅢ' ) char = 'ㅣ';
        if( comp == 'ㅟ' ) char = 'ㅣ';



        return char;

    }
}

