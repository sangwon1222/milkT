import { TypeingApp } from '../../TypeingApp';
import * as Util from '../../../Utill/Config'
import { SceneBase } from '../../core/SceneBast';
import { DataManager} from '../../manager/DataManager';
import { ViewerRscManager } from '../../manager/ViewerRscManager';
import { SoundManager } from '../../manager/SoundManager';
import { LanguageManager } from '../../manager/LanguageManager';
import { ShortTextComboBox } from './component/ShortTextComboBox';
import { InputText } from '../../widget/InputText';
import { InputText2 } from '../../widget/InputText2';
import { QuestionText } from '../../widget/QuestionText';
import { EventType } from "../../core/EventType";
import { CustomEvent} from '../../core/CustomEvent';
import { Timer } from '../../../Utill/Timer';
import { EOPPopup } from '../../widget/popup/EOPPopup';
import { ResultPopup } from '../../widget/popup/ResultPopup';

const inputStyle2 = new PIXI.TextStyle({
    fill: "#191919",
    fontFamily: "NanumGothicBold",
    fontSize: 60
});

export interface TextInputOptions {
    position?: string;
    background?: string;
    border?: string;
    outline?: string;
    lineHeight?: string;
    multiline?: boolean;
    box?: any;
    input?: any;
}

export class TypingShortText extends SceneBase {

    private DATA: any;
    private mData: any;
    private mDep2: string;
    private mListIndex: number;

    private mScoreAry: Array< number >;
    private mCurrentTypingText: PIXI.Text;
    private mTopTypingText: PIXI.Text;
    private mWrongText: PIXI.Text;
    private mAccuracyText: PIXI.Text;
    private mProgressText: PIXI.Text;

    private mComoBox: ShortTextComboBox;
    private mQuestionText: QuestionText
    private mInputText: InputText2;
    private mCurrentNumber: number;
    private mMaxNumber: number;
    
    private mTimeInterval: number;
    private mElapsedTime: number;
    private mTypingSpeedAry: Array< number >;

    constructor() {

        super();
        this.name = "TypingShortText";
        this.visible = false;
    }

    async onInit(){

        // 헤더 상태 설정
        TypeingApp.Handle.getHeader().setTypingMode();
        
        // 앞단의 선택 페이지에서 선택한 카테고리의 데이타를 가져온다.
        this.DATA = DataManager.Handle.getMemoryData();
        this.mListIndex =  DataManager.Handle.getMemoryIndex();
    }

    async onStart(){
        this.draw();
        this.visible = true;
    }

    

    private draw() {

        SoundManager.Handle.stopBgmSound();

        this.mData = Util.shuffleArray( this.DATA.list[this.mListIndex].exam);
        this.mDep2 = this.DATA.list[this.mListIndex].Dep2;


        // 배경 이미지
        const bg = new PIXI.Sprite( ViewerRscManager.Handle.getResource("shorttext", "bg_typing.png").texture );
        this.addChild( bg );

        // 문제문구 배경
        const questionBg = new PIXI.Sprite( ViewerRscManager.Handle.getResource("shorttext", "question_bg.png").texture );
        questionBg.position.set(135, 611);
        this.addChild( questionBg );

        // 입력창 배경

        const lang = LanguageManager.Handle.LANG;
        const inputBg = new PIXI.Sprite( ViewerRscManager.Handle.getResource("shorttext", `input_bg_${lang}.png`).texture );
        inputBg.anchor.set(0,1);

        inputBg.position.set(135, 1407);
        this.addChild( inputBg );

        const ch_enter =  new PIXI.Sprite( ViewerRscManager.Handle.getResource("shorttext", `ch_enter.png`).texture );
        ch_enter.anchor.set(0,1);
        ch_enter.position.set(225, 1289);
        this.addChild(ch_enter);

        // Score-------------------------------------------------------
        const style = new PIXI.TextStyle({
            align: "rihgt",
            fill: "#f84d4d",
            fontFamily: "TmoneyRoundWindExtraBold",
            fontWeight: "bold",
            fontSize: 44,
            lineHeight:28
        });

        this.mTypingSpeedAry = [];
        this.mScoreAry = [0,0,0,0];
     
        this.mCurrentTypingText = new PIXI.Text("000타", style);
        this.mTopTypingText = new PIXI.Text("000타", style);
        this.mWrongText = new PIXI.Text("000개", style);
        this.mAccuracyText = new PIXI.Text("0%", style);
        this.mProgressText = new PIXI.Text("1/10", style);
 
        this.mCurrentTypingText.position.set(410,275);
        this.mTopTypingText.position.set(910,275);
        this.mWrongText.position.set(1360,275);
        this.mAccuracyText.position.set(1805,275);
        this.mProgressText.position.set(2253,275);
 
         this.addChild(this.mCurrentTypingText);
         this.addChild(this.mTopTypingText);
         this.addChild(this.mWrongText);
         this.addChild(this.mAccuracyText);
         this.addChild(this.mProgressText);
         //............................

        this.mCurrentNumber = 0;
        this.mMaxNumber = 10; 

        // 입력창
        //-----------------------------------------------------------------------------------------------------------
        const inputStyle: TextInputOptions = {
            input: {
                fontFamily: 'NanumGothicBold',
                fontSize: '60px',
                // padding: '1px',
                width: '1180px',
                color: '#191919',
            },
            box: {
                default: {fill: 0xffffff },
                focused: {fill: 0xffffff },
                disabled: {fill: 0x000000 }
            }
        }
        // this.mInputText = new InputText( inputStyle );

        this.mInputText = new InputText2( 1800, 60, 0xffda18, inputStyle2 );

        this.mInputText.position.set(510,1195);
        this.mInputText.addCustomEventListener(EventType.InputTextKeyUp, (evt)=> this.onKeyUp(evt));
        this.mInputText.addCustomEventListener(EventType.InputTextInput, (evt)=> this.onInput(evt));
        this.addChild(this.mInputText);
        //-----------------------------------------------------------------------------------------------------------
        const questionStyle = {
            "default": {
                fontFamily: "NanumGothicBold",
                fontSize: "60px",
                fill: "#191919",
                align: "left"
            },
            "current": {
                fill: "#191919"
            },
            "wrong": {
                fill: "#f84d4d"
            }
        }
        this.mQuestionText = new QuestionText( questionStyle );
        this.mQuestionText.position.set(510,764);
        this.mQuestionText.answerText = this.mData [this.mCurrentNumber];
        this.mQuestionText.setLinkInputText(this.mInputText);
        this.addChild(this.mQuestionText);


        //-----------------------------------------------------------------------------------------------------------
        this.mComoBox = new ShortTextComboBox();
        this.mComoBox.selectedIndex = this.mListIndex;
        this.mComoBox.label = this.DATA.list[this.mListIndex].label;
        this.mComoBox.addCustomEventListener(EventType.ComboBoxChange, (evt: CustomEvent )=> {

            //comboIdx
            //console.log(evt.data);
            this.mComoBox.selectedIndex = evt.data;
            this.mComoBox.label = this.DATA.list[evt.data].label;
            this.mComoBox.data = this.DATA.list;
            this.mData = this.DATA.list[evt.data].exam;
            this.mDep2 = this.DATA.list[evt.data].Dep2;

            // console.log(this.mData);

            this.mTypingSpeedAry = [];
         
            this.mScoreAry = [0,0,0,0];
            this.mCurrentTypingText.text = "000타"
            this.mTopTypingText.text = "000타"
            this.mWrongText.text = "0개"
            this.mAccuracyText.text = "0%"
            this.mProgressText.text = `1/10`;

            this.mCurrentNumber = 0;
            this.mQuestionText.answerText = this.mData [this.mCurrentNumber];
            this.mInputText.text = "";
            this.mInputText.inFocus();
            Timer.Handle.start();
        });
        this.mComoBox.position.set(514,70);
        this.mComoBox.data = this.DATA.list;
        this.addChild(this.mComoBox);

        //-----------------------------------------------------------------------------------------------------------

        const title = new PIXI.Sprite( ViewerRscManager.Handle.getResource("shorttext", "drop_title.png").texture );
        title.position.set(80, 70);
        this.addChild(title);

        // 캐릭터 이미지
        const ch = new PIXI.Sprite( ViewerRscManager.Handle.getResource("shorttext", "ch.png").texture );
        ch.position.set(2300, 1197);
        this.addChild( ch );

        this.mInputText.inFocus();
        Timer.Handle.start();

        this.startTimer();
        
    }

    private onKeyUp(evt: CustomEvent) {
        const keyCode: number = evt.data;
        if (this.mInputText.text.length >= this.mQuestionText.answerText.length) {
            if (keyCode == 13) { //엔터키
                SoundManager.Handle.Effect_ENTER_DOWN();
                Timer.Handle.stop();
                this.check();
            }
        }
    }

    onInput( evt: CustomEvent ) {

        const questionText = this.mQuestionText;
        const inputText = this.mInputText;
        questionText.inputText = inputText.text;
    }

    private check() {

        const questionText = this.mQuestionText;

        this.drawScore(
            questionText.getTypingValue(),
            questionText.getWrongAnswerCnt(),
            questionText.getAccuracy() 
            );

        this.mInputText.outFocus();

        if( this.mQuestionText.answerText == this.mInputText.text) {
            console.log("정답");
        } else {
            console.log("오답");
        }

        this.mCurrentNumber++;
      
        if(this.mCurrentNumber < this.mMaxNumber) {

            this.mInputText.text = "";
            this.mQuestionText.answerText = this.mData[this.mCurrentNumber];
            this.mInputText.inFocus();
            Timer.Handle.start();
        } else {
            // alert(`게임 끝`);
            const eop = new EOPPopup();
            eop.addCustomEventListener( EventType.ReceiveData, ()=> {this.typingEnd();});
        }
    }

    private drawScore( currentCnt: number, wrongCnt: number, accuracyCnt: number ) {

        this.mTypingSpeedAry.push(currentCnt);

        this.mScoreAry[0] = currentCnt;
        if(currentCnt > this.mScoreAry[1]) this.mScoreAry[1] = currentCnt;
        this.mScoreAry[2] = this.mScoreAry[2] + wrongCnt;
        this.mScoreAry[3] = this.mScoreAry[3] + accuracyCnt;


        let phase = this.mCurrentNumber + 2;
        if(phase > 10 ) phase = 10;

  
        //------------------------------------------------------------
        this.mCurrentTypingText.text = `${Util.addZero(this.mScoreAry[0])}타`;
        this.mTopTypingText.text = `${Util.addZero(this.mScoreAry[1])}타`;
        this.mWrongText.text = `${Util.addZero(this.mScoreAry[2])}개`;
        this.mAccuracyText.text = `${Math.floor(this.mScoreAry[3] / (this.mCurrentNumber + 1))}%`;
        this.mProgressText.text = `${phase}/10`;
        //------------------------------------------------------------

        // this.mProgressText.pivot.set(100/2, 100/2);
    }

    private async typingEnd(){
        this.stopTimer()
        window.onkeypress=null;
        window.onkeydown=null;

        let typeAverage = 0;
        const len = this.mTypingSpeedAry.length;
        if(len > 0) {
            for(let i = 0; i < len; i++ ) {

                typeAverage += this.mTypingSpeedAry[i];
            }
            typeAverage = Math.floor( typeAverage / len);
        }

        const top = this.mScoreAry[1];
        const accuracy = Math.floor(this.mScoreAry[3] / this.mCurrentNumber);
        const resultPopup = new ResultPopup(
            "문장 연습 결과", 1, {
                "average": typeAverage,
                "wrong": this.mScoreAry[2],
                "accuracy": accuracy,
                "time": this.mElapsedTime,
            }
        );
        await DataManager.Handle.getCompleteQuery(this.mDep2, typeAverage, top, accuracy, 0);
    }

    private startTimer() {

        this.mElapsedTime = 0;
        this.mTimeInterval = setInterval(()=>{
            this.mElapsedTime++;           
        },1000)
    }

    private stopTimer() {
        console.log("clear timer");
        clearInterval(this.mTimeInterval);
    }
}


