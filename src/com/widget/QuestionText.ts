import RichText from 'pixi-multistyle-text';
import { ObjectBase } from "../core/ObjectBase"
import { EventType } from "../core/EventType"
import * as TextStyle from '../design/TextStyle';
import { InputText } from '../widget/InputText';
import { InputText2 } from '../widget/InputText2';
import * as Typing from '../../Utill/Typing'
import { Timer } from '../../Utill/Timer';
import { App } from '../core/App';

import gsap from "gsap";

export class QuestionText extends ObjectBase{

    private mRichText: RichText;
    private mAnswerAry: Array<string>;
    private mAnswerText: string;

    // private mCurrentTxt: string;

    private mLinkInputText: InputText | InputText2;

    private mWrongCnt: number; // 음절로서 오타수.
    private mAnswerCompCnt: number; // 타수로서 정타수.(조합)



    constructor( style?: any) {

        super();

        if( style ) {
            this.mRichText = new RichText("", style);

        } else {
            this.mRichText = new RichText("",TextStyle.defaultQuestionTextStyle());
        }

        this.addChild(this.mRichText);

    }

    get answerText(): string { return this.mAnswerText; }
    set answerText( txt: string ) {
        
        this.mAnswerText = txt;
        this.mAnswerAry = [];
        this.mAnswerAry =  txt.split('');
        this.mRichText.text = this.mAnswerText;

        this.mAnswerCompCnt = 0;
        this.mWrongCnt = 0;

    }
   
    set inputText( txt: string) {

 
        this.checkTypingCnt();
        this.checkText();
    }

    getWrongAnswerCnt(): number {
        return this.mWrongCnt;
    }


    // 타수 
    getTypingValue(): number {

        Timer.Handle.stop();
    
        let typingValue = 0;

        if( this.mAnswerCompCnt >= 0) {

            typingValue = Math.floor( this.mAnswerCompCnt * 60 / Timer.Handle.getTimeTaken());    
        }

        return typingValue;
    }


    getAccuracy(): number {

        const total = this.answerText.length;
        const per = Math.floor((total - this.mWrongCnt) / total * 100);
        return per;
    }

    setLinkInputText( ipTxt: InputText | InputText2 ) {

        this.mLinkInputText = ipTxt;
    }


    // 현재 타이핑 상태에서의 타수 확인(조합형 때문에 추가된 함수...)
    checkTypingCnt() {
        const txtArr = this.mLinkInputText.text.split('');
        const inputLen = txtArr.length;
        // const answerLen = this.mAnswerAry.length;
        
        this.mAnswerCompCnt = 0;

        if(inputLen > 0 ) {
            for( let i= 0; i < inputLen - 1; i++ ) {
                if( this.mAnswerAry[i] == txtArr[i] ) {
                    //포커스 시점 이전 타이핑의 타수 개산.
                    this.mAnswerCompCnt += Typing.getTypingCount( this.mAnswerAry[i] );
                }
            }
        }

        let idx = this.mLinkInputText.text.length-1;
        if( idx < 0) idx = 0;
        // 현재 인풋창에서 쳐야 하는 정답 문자.
        const currentAnswerTxt = this.mAnswerText.substr(idx, 1);
        // 현재 인풋창에서 타이핑되는 문자(포커싱)
        const currentInputTxt = this.mLinkInputText.text.substr(idx, 1);

        // 각 조합 정보를 가져와서 비교...
        const answerCompInfo = Typing.getComposition(currentAnswerTxt);
        const inputCompInfo = Typing.getComposition(currentInputTxt);

        // console.log(`f : ${inputCompInfo.f} == ${inputCompInfo.f}`);
        // console.log(`s : ${inputCompInfo.s} == ${inputCompInfo.s}`);
        // console.log(`t : ${inputCompInfo.t} == ${inputCompInfo.t}`);

       if(answerCompInfo.f == inputCompInfo.f && answerCompInfo.f != "") this.mAnswerCompCnt += Typing.getTypingCount( answerCompInfo.f );
       if(answerCompInfo.s == inputCompInfo.s && answerCompInfo.s != "") this.mAnswerCompCnt += Typing.getTypingCount( answerCompInfo.s );
       if(answerCompInfo.t == inputCompInfo.t && answerCompInfo.t != "") this.mAnswerCompCnt += Typing.getTypingCount( answerCompInfo.t );

    }


    private checkText() {

        const txtArr = this.mLinkInputText.text.split('');
        const inputLen = txtArr.length;
        const answerLen = this.mAnswerAry.length;

        let compStr = "";
        this.mWrongCnt = 0;

        if(inputLen > 0 ) {
            for( let i= 0; i < answerLen; i++ ) {
                if(i < inputLen) {
    
                    if(this.mAnswerAry[i] == txtArr[i]) {
    
                        compStr += `<current>${ this.mAnswerAry[i] }</current>`;
             
                    } else {
    
                        compStr += `<wrong>${ this.mAnswerAry[i] }</wrong>`;
                        this.mWrongCnt++;
                    }
                } 
            }
        }
        
        compStr += this.mAnswerText.substr(inputLen, answerLen)
        this.mRichText.text = compStr;
    }
}

