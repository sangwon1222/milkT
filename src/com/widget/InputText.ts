import { TextInput } from 'pixi-textinput-v5';
import { ObjectBase } from "../core/ObjectBase"
import { EventType } from "../core/EventType"
import { App } from '../core/App';
import { OptionValue } from '../core/OptionValue';
import * as TextStyle from '../design/TextStyle';
import Config from '../../Utill/Config';


export class InputText extends ObjectBase{

    private mTextInput: TextInput;
    private mHtmlInput: HTMLInputElement;

    private mComp: boolean;

    constructor( options?: TextStyle.TextInputOptions ){

        super();

        this.mComp = false;
        
        if(options) {
            this.mTextInput = new TextInput( options )
        } else {
            this.mTextInput = new TextInput( TextStyle.defaultInputTextStyle());
        } 

        this.mHtmlInput = ((this.mTextInput.htmlInput as any) as HTMLInputElement);


        this.mHtmlInput.addEventListener('focusout', ()=> {
            this.mTextInput.x = 2;
            this.mTextInput.y = -6;
        })

        this.mHtmlInput.addEventListener('focusin', ()=> {
            this.mTextInput.x = 0;
            this.mTextInput.y = 0;
        })

       

        this.mHtmlInput.addEventListener('keydown', (evt: KeyboardEvent )=>{
            // 한영 분기 처리
            // if(evt.isComposing) {
            //     if( OptionValue.Handle.langIsKr ){alert("한글로 바꿔주세요.")}
            // }
        })

        this.mHtmlInput.addEventListener('keyup', (evt: KeyboardEvent )=>{

            const keyCode = evt.keyCode;
            this.dispatchEvent(EventType.InputTextKeyUp, keyCode);

        });

        this.mHtmlInput.addEventListener('input', (evt: InputEvent )=>{

            this.dispatchEvent(EventType.InputTextInput, evt);
            
        });
        

        this.mHtmlInput.addEventListener('compositionstart', (evt: CompositionEvent )=>{

            // this.dispatchEvent(EventType.InputTextInput, evt);
            // this.mComp = true;
        });

        this.mHtmlInput.addEventListener('compositionend', (evt: CompositionEvent )=>{
            
            // this.dispatchEvent(EventType.InputTextInput, evt);
            // this.mComp = false;
        });

        this.mHtmlInput.addEventListener('compositionupdate', (evt: CompositionEvent )=>{
            
            // if(this.mComp) this.dispatchEvent(EventType.InputTextCompUpdate, evt);
            
        });

     
        this.addChild(this.mTextInput);
    }

    get htmlInput(): HTMLInputElement { return this.mHtmlInput; }

    get htmlInputValue(): string { return this.mHtmlInput.value }
    set htmlInputValue(v: string) { 
        // this.mHtmlInput.defaultValue="";
        this.mHtmlInput.value = v;
    }

    set maxLength(n: number){this.mHtmlInput.maxLength = n;}
    get maxLength(): number { return this.mHtmlInput.maxLength; }

    set text( txt: string) { this.mTextInput.text = txt as any;}
    get text(): string { return ((this.mTextInput.text as any) as string); }


    set placeHolder( txt: string ) {
        // 텍스트가 비어져 있을때 보여주는 글자.
        this.mTextInput._placeholder = txt;
    }

    get comp(): boolean { return this.mComp; }


    setDisable( bool: boolean ) {
        this.mTextInput._disabled = bool;
    }

    inFocus() {
        this.mTextInput.focus();
    }

    outFocus() {
        this.mTextInput.blur();
    }

    /*
    checkNoEng(e) {
        // false 이면 영어
        if(e.type == 'text') {
            const value = e.value;

            if(Config.KorEngMode){
                if(/[a-zA-Z]/.test(value)) {
                    alert( '영문은 사용하실 수 없습니다.한글로 변환해 주세요.' );
                    e.value = e.value.replace(/[a-zA-Z]/g,'');
                    this.htmlInput.innerText="";
                    return false;
                }else{
                    return true;    
                }
            }else{
                if(/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value)) {
                    alert('한글 사용안됨');
                    e.value = e.value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g,''); 
                    // g가 핵심: 빠르게 타이핑할때 여러 한글문자가 입력되어 버린다.
                    this.htmlInput.innerText="";
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
    */

}
