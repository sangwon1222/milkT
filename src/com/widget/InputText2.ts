import { TextInput } from 'pixi-textinput-v5';
import { ObjectBase } from "../core/ObjectBase"
import { EventType } from "../core/EventType"
import * as TextStyle from '../design/TextStyle';
import gsap from 'gsap';


export class Caret extends PIXI.Container
{
    private mRect: PIXI.Graphics;

    constructor( color: number, h: number)
    {
        super();

        this.mRect = new PIXI.Graphics();
        this.mRect.beginFill( color );
        this.mRect.drawRect(0,0,6,h);
        this.mRect.endFill();

        this.addChild(this.mRect);
    }
}

export class InputBg extends PIXI.Container
{
    private mRect: PIXI.Graphics;

    constructor( w: number, h: number )
    {
        super();

        this.mRect = new PIXI.Graphics();
        this.mRect.beginFill( 0xff0000);
        this.mRect.drawRect(0,0,w,h);
        this.mRect.endFill();

        this.alpha = 0.5;

        this.addChild(this.mRect);
    }
}

export class InputText2 extends ObjectBase{

    private mTextInput: TextInput;
    private mHtmlInput: HTMLInputElement;

    private mTransparencyTxt: PIXI.Text;
    private mTextForCaret: PIXI.Text;

    private mCaret: Caret;
    private mInputBg: InputBg;

    private mTabDown: boolean;


    constructor( width: number, height: number, caretColor: number, style?: PIXI.TextStyle ){

        super();

        this.mTextInput = new TextInput( TextStyle.defaultInputTextStyle())
        this.mTextInput.position.set( -10000, 0);
        

        this.mHtmlInput = ((this.mTextInput.htmlInput as any) as HTMLInputElement);

        this.mTextForCaret = new PIXI.Text("", style || TextStyle.defaultRendererTextStyle() );
        this.mTextForCaret.position.set( 0, 100);


        this.mTransparencyTxt = new PIXI.Text("", style || TextStyle.defaultRendererTextStyle() );
        this.mTransparencyTxt.position.set( 0, 0);



       
        this.mHtmlInput.addEventListener('keydown', (evt: KeyboardEvent )=>{

            // 커서 막기 위한 코드
            this.mHtmlInput.selectionStart = this.mHtmlInput.value.length;

            this.setCaretPosition();

            const keyCode = evt.keyCode;
            //console.log( this.mHtmlInput.selectionStart);
            if(keyCode === 9) //Tab
            {
                evt.preventDefault();
                this.mTabDown = true;
                return;
            }

        });

        this.mHtmlInput.addEventListener('keyup', (evt: KeyboardEvent )=>{

            // 커서 막기 위한 코드
            this.mHtmlInput.selectionStart = this.mHtmlInput.value.length;

            this.setCaretPosition();
            const keyCode = evt.keyCode;
            this.dispatchEvent(EventType.InputTextKeyUp, keyCode);

        });

        this.mHtmlInput.addEventListener('focusout', ()=> {

            if(this.mTabDown == true)
            {
                this.mTabDown = false;
                this.inFocus();
                return;
            }
            //this.mTextInput.x = 2;
           // this.mTextInput.y = -6;
        })

        this.mHtmlInput.addEventListener('focusin', ()=> {
            //this.mTextInput.x = 0;
            //this.mTextInput.y = 0;
            this.mTabDown = false;
        })

        this.mHtmlInput.addEventListener('input', (evt: InputEvent )=>{

            this.mTransparencyTxt.text = this.mHtmlInput.value;
            this.setCaretPosition();
            this.dispatchEvent(EventType.InputTextInput, evt);
        });
             
        this.addChild(this.mTextInput);
        this.addChild( this.mTransparencyTxt);

        this.addChild( this.mTextForCaret);

        this.mCaret = new Caret( caretColor, height );
        this.addChild( this.mCaret );

        this.mInputBg = new InputBg( width, height + 20);
        this.mInputBg.interactive = true;
        this.mInputBg.on('pointerup', ()=> { 
            this.inFocus() ;
        });
       
        this.addChild( this.mInputBg );

        this.mTransparencyTxt.mask = this.mInputBg;
        this.mTextForCaret.visible = false;

        this.inFocus();


        gsap.to(this.mCaret,{alpha:0,duration:0.5}).repeat(-1).yoyo(true)
    }

    private setCaretPosition() {
        this.mTextForCaret.text = this.mHtmlInput.value.substr(0, this.mHtmlInput.selectionStart);

        if (this.mTextForCaret.width > this.mInputBg.width) {
            this.mTransparencyTxt.x = this.mInputBg.width - this.mTextForCaret.width;
            this.mTextForCaret.x = this.mTransparencyTxt.x;

            if (this.mTextForCaret.x + this.mTextForCaret.width < 0) {

                this.mTextForCaret.x += 60;

            } else {
                this.mCaret.x = this.mTextForCaret.x + this.mTextForCaret.width;
            }
        } else {
            this.mTransparencyTxt.x = 0;
            this.mTextForCaret.x = 0;

            this.mCaret.x = this.mTextForCaret.width;
            if (this.mHtmlInput.selectionStart == 0) this.mCaret.x = -6;
        }
    }

    clear()
    {
        gsap.killTweensOf(this.mCaret);
    }

    getDisplayWidth()
    {
        if(this.mTransparencyTxt.width > this.mInputBg.width)
        {
            return this.mInputBg.width;
        } else {
            return this.mTransparencyTxt.width;
        }
    }

    get htmlInput(): HTMLInputElement { return this.mHtmlInput; }

    get htmlInputValue(): string { return this.mHtmlInput.value }
    set htmlInputValue(v: string) { 
        // this.mHtmlInput.defaultValue="";
        this.mHtmlInput.value = v;

        
        
    }

    set maxLength(n: number){this.mHtmlInput.maxLength = n;}
    get maxLength(): number { return this.mHtmlInput.maxLength; }

    set text( txt: string) { 
        this.mTextInput.text = txt as any;
        this.mTransparencyTxt.text = this.mHtmlInput.value;
        this.mCaret.x = this.mTransparencyTxt.width;
        this.setCaretPosition();
    }
    get text(): string { return ((this.mTextInput.text as any) as string); }


    set placeHolder( txt: string ) {
        // 텍스트가 비어져 있을때 보여주는 글자.
        this.mTextInput._placeholder = txt;
        
    }


    setDisable( bool: boolean ) {
        this.mTextInput._disabled = bool;
    }

    inFocus() {
        //console.log("inFocus");
       this.mTextInput.focus();
    }

    outFocus() {
        this.mTextInput.blur();
    }
}
