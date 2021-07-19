import { TypeingApp } from '../../TypeingApp';
import { SceneBase, SceneName } from '../../core/SceneBast';
import { DataManager} from '../../manager/DataManager';
import { LanguageManager } from '../../manager/LanguageManager';
import { ViewerRscManager } from '../../manager/ViewerRscManager';
import { SoundManager } from '../../manager/SoundManager';
import { EventType } from "../../core/EventType";
import { CustomEvent} from '../../core/CustomEvent';
import gsap from 'gsap';
import { Button } from '@/com/widget/Button';
import { DisplayInput } from "../../widget/DisplayInput";
import { InputText2 } from '../../widget/InputText2';
import { QuestionText } from '../../widget/QuestionText';
import * as Util from '../../../Utill/Config';
import { EOPPopup } from '../../widget/popup/EOPPopup';
import { ResultPopup } from '../../widget/popup/ResultPopup';
import { WordComboBox } from './component/WordComboBox';
import { TypingKeyLocation } from '../KeyLocation/TypingkeyLocation';

export class Activity extends PIXI.Sprite{
    // 테마바와 레코드바는 데이터설정때문에 Word에 넣어두었다.
    private mFocus: PIXI.Container;
    private mQuizFlag: boolean;
    private mInputFlag: boolean;
    private mQuizData: Array<string>;

    private mTime: number;
    
    private mInputSprite: PIXI.Sprite;
    private mDisplayInput: DisplayInput;
    private mInputText: InputText2;
    private mQuestionText: QuestionText;
    private mCurrentQuizIDX: number;
    
    private mQuizDisplay: PIXI.Sprite;
    private mMovingTextBox: PIXI.Container;
    private mQuizText: any;

    private mTotal: number;

    private mWrong= 0;
    get wrongCount(): number { return this.mWrong}
    set wrongCount(v: number) { 
        this.mWrong =v;
        this.mCorrect = Math.round( (1-(this.mWrong/this.mTotal))*100 ) ;
        if(this.mCorrect<0){this.mCorrect=0;}
        (this.parent.parent as TypingWord).drawScore();
    }

    private mCorrect= 100;
    get correct(): number { return this.mCorrect}

    private mProgress= 0;
    get progress(): number { return this.mProgress}
    set progress(v: number) { 
        this.mProgress=v;
        (this.parent.parent as TypingWord).drawScore();
    }
    
    constructor(quizData){
        super();
        this.mQuizData = quizData;
        this.init();

        window.onkeypress=(evt)=>{
            if(evt.keyCode ==13 || evt.key =="Enter"){
                SoundManager.Handle.Effect_ENTER_DOWN();
                if(this.mInputFlag == false) return;
                // 아무 내용없이 엔터 눌렀을 때
                if(this.mInputText.text=="" || this.mDisplayInput.text==""){
                   // if(this.mQuizFlag)alert(`텍스트를 입력해주세요.`);
                    this.mInputText.inFocus();
                    return;
                }
                this.nextStep();
            }
        }
    }

    async init(){

        this.texture = ViewerRscManager.Handle.getResource( "word" , "game_bg.png").texture;
        this.mQuizFlag = false;
        this.mInputFlag = true;
        this.mCurrentQuizIDX = 0;
        this.mWrong = 0;
        this.mTotal=0;
        this.mCorrect = 100;
        this.mProgress=0;

        this._createBackground();
        this._createQuiz();

        const lang = LanguageManager.Handle.LANG;

        this.mInputSprite = new PIXI.Sprite(ViewerRscManager.Handle.getResource("word",`input_bg_${lang}.png`).texture);
        this.addChild(this.mInputSprite)
        this.mInputSprite.anchor.set(0.5, 1)
        this.mInputSprite.position.set( TypeingApp.Handle.appWidth/2, 1407);

        const ch_enter = new PIXI.Sprite( ViewerRscManager.Handle.getResource("word","ch_enter.png").texture );
        ch_enter.anchor.set(0,1);
        ch_enter.position.set(-485,-118);

        this.mInputSprite.addChild(ch_enter);


        const ch = new PIXI.Sprite( ViewerRscManager.Handle.getResource("word","ch.png").texture );
        ch.position.set(1678,1194);
        this.addChild(ch);


        const inputStyle2 = new PIXI.TextStyle({
            fill: "#191919",
            fontFamily: "NanumGothicBold",
            fontWeight:'bold',
            fontSize: 90
        });

        this.mInputText = new InputText2(760,100, 0xffda18, inputStyle2);
        
        //this.mInputText.position.set(0,-200 );
        this.mInputText.position.set( 1030, 1180 );
        this.mQuizFlag = true;
        
        this.mInputText.inFocus();
        this.mInputText.addCustomEventListener(EventType.InputTextInput, (evt)=> this.onInput(evt));
  
        this.addChild(this.mInputText);


        this.mTime = Date.now();

        this.mDisplayInput = new DisplayInput();
        this.mInputSprite.addChild(this.mDisplayInput)
        this.mDisplayInput.position.set(0, 0);//-160

        this.mDisplayInput.visible = false;
    }

    _createBackground(){

        this.mQuestionText = new QuestionText();
        this.mQuestionText.position.set(100,100);
        this.mQuestionText.answerText = this.mQuizData[this.mCurrentQuizIDX];
        this.addChild(this.mQuestionText);
        this.mQuestionText.alpha=0;

        this.mQuizText = {};
        this.mQuizDisplay =new PIXI.Sprite(ViewerRscManager.Handle.getResource("word","quiz_bg.png").texture);

        const mask = new PIXI.Graphics();
        mask.beginFill(0x000000,1);
        mask.drawRoundedRect(0,0,this.mQuizDisplay.width,this.mQuizDisplay.height+100,80);
        mask.endFill();
        this.addChild(mask)
        mask.pivot.set(this.mQuizDisplay.width/2,this.mQuizDisplay.height/2)
        mask.position.set(TypeingApp.Handle.appWidth/2,(550-50)+this.mQuizDisplay.height/2)

        this.mQuizDisplay.mask = mask;
    }

    _createQuiz(){
        this.mFocus = new PIXI.Container();
        this.mQuizDisplay.addChild(this.mFocus);

        const focus = new PIXI.Sprite(ViewerRscManager.Handle.getResource('word','focus.png').texture);
        focus.pivot.set(focus.width/2,focus.height/2)
        focus.position.set(this.mQuizDisplay.width/2,this.mQuizDisplay.height/2)
        this.mFocus.addChild(focus)
        gsap.to(focus.scale,{x:1.1,y:1.1,duration:1}).repeat(-1).yoyo(true);

        this.mMovingTextBox = new PIXI.Container();
        this.mQuizDisplay.addChild(this.mMovingTextBox)

        this.updateQuizData();
        
        this.addChild(this.mQuizDisplay)

        this.mQuizDisplay.pivot.set(this.mQuizDisplay.width/2,this.mQuizDisplay.height/2);

        this.mQuizDisplay.position.set(TypeingApp.Handle.appWidth/2,550+this.mQuizDisplay.height/2);

        // gsap.to(this.mQuizText[this.mCurrentQuizIDX],{x:this.mQuizText[this.mCurrentQuizIDX].width/2,duration:0.5})
    }

    updateQuizData(){
        this.mMovingTextBox.removeChildren();

        let xValue=20;
        for(let i=0 ; i< this.mQuizData.length; i++){

            this.mTotal += this.mQuizData[i].length;
            const textBox = new PIXI.Container();

            let subX =0;
            for(let j=0; j<this.mQuizData[i].length; j++){
                const text = new PIXI.Text(this.mQuizData[i][j])
                text.style.fontSize = 90;
                text.style.padding = 10;
                text.style.fill= 0xFFFFFF;
                text.style.fontFamily = 'NanumGothicBold';
                text.style.fontWeight = 'bold';
                text.tint= 0x000000;
                text.position.set(subX,20);
                subX+=text.width;
                
                textBox.addChild(text)
            }
            textBox.pivot.set(textBox.width/2,0);
            textBox.position.set( xValue, this.mQuizDisplay.height/2-textBox.height/2 );
           // xValue+=  600;

           xValue+=  700;

            this.mMovingTextBox.addChild(textBox)
            this.mQuizText[i]=textBox.children;
            
        }
        this.mMovingTextBox.position.set(this.mQuizDisplay.width/2,0)
    }
    
    async nextStep(){
        if(this.mQuizFlag){
            this.mQuizFlag=false;
            await this.check();
            this.mQuizFlag=true;
        }
    }

    check(): Promise<void>{
        return new Promise<void>((resolve, reject)=>{


            

            this.mInputSprite.alpha=0.5;
            
            // 정오답 확인 후 글자색 변경
            if( this.mInputText.text != this.mQuizData[this.mCurrentQuizIDX]) { this.wrongEvent(); }
            else{ this.correctEvent(); }

            this.mCurrentQuizIDX+=1;
            this.progress = this.mCurrentQuizIDX;
            
            if(this.endGame() === true ){ return;}
        
            this.resetInput();

            //this.mInputText.x = ( TypeingApp.Handle.appWidth / 2 ) - (this.mInputText.getDisplayWidth() / 2 );

            gsap.to(this.mMovingTextBox,{x:this.mMovingTextBox.x-700,duration:0.5})
            .eventCallback('onComplete',()=>{ 
                this.mInputSprite.alpha= 1;
                this.mInputText.inFocus();
                resolve(); 
            })

        })
    }

    typingCheck() {
        const txtArr = this.mInputText.text.split('');
        const inputLen = txtArr.length;
        const answerLen = this.mQuizData[this.mCurrentQuizIDX].length;

        for (let i = 0; i < answerLen; i++) {
            if (i < inputLen) {
                if (this.mInputText.text[i] != this.mQuizData[this.mCurrentQuizIDX][i]) {
                    this.mQuizText[this.mCurrentQuizIDX][i].tint = 0XFF0000;
                } else {
                    this.mQuizText[this.mCurrentQuizIDX][i].tint = 0X191919;
                }
            } else {
                this.mQuizText[this.mCurrentQuizIDX][i].tint = 0X191919;
            }
        }
    }

    wrongEvent(){
        for(let i=0; i<this.mQuizData[this.mCurrentQuizIDX].length; i++ ){

            if(this.mInputText.text[i] != this.mQuizData[this.mCurrentQuizIDX][i]){

                this.mQuizText[this.mCurrentQuizIDX][i].tint = 0XFF0000;
            
                this.wrongCount+=1;
                /*
                console.log(`-------------------------------------------`)
                console.log(`%c" ${this.mQuizData[this.mCurrentQuizIDX]} " 의 ${i+1}번째`,"font-weight: bold;" , `음절 오타`)
                console.log(`   Typing=> %c ${this.mInputText.text[i]}`,"color:red; font-weight:bold;")
                console.log(`   Correct=> %c ${this.mQuizData[this.mCurrentQuizIDX][i]}`,"color:blue; font-weight:bold;")
                console.log(`   오답수 => %c ${this.wrongCount}` ,"border:2px black solid;  padding-right:6px;")
                */
            }else{
               this.mQuizText[this.mCurrentQuizIDX][i].tint = 0Xbcbcbc;
            }
        }
    }
    correctEvent(){
        for(let i=0; i<this.mQuizData[this.mCurrentQuizIDX].length; i++ ){
            this.mQuizText[this.mCurrentQuizIDX][i].tint = 0Xbcbcbc;
        }
        //console.log(`정답 => %c ${this.mInputText.text}` ,"border:2px blue solid; padding-right:6px;")
    }

    endGame(){
        if(this.mQuizData[this.mCurrentQuizIDX]== undefined){
            window.onkeypress=()=>null;
            this.mInputText.outFocus();
            this.mInputText.text="";
            this.mInputText=null;
            this.removeChild(this.mInputText);
            (this.parent.parent as TypingWord).playEOP();
            return true;
        }else{
            return false;
        }
    }

    resetInput(){
        this.mQuestionText.answerText = this.mQuizData[this.mCurrentQuizIDX];
        this.mInputText.outFocus();
        this.mInputText.text="";
        this.mDisplayInput.text="";
    }

    inFocus(){ this.mInputText.inFocus(); }

  

    onInput(evt){

        //this.mInputText.x = ( TypeingApp.Handle.appWidth / 2 ) - (this.mInputText.getDisplayWidth() / 2 );

        this.typingCheck()
       // if ( this.mInputText.checkNoEng(this.mInputText.htmlInput) != true ) {return;}
        if(this.mQuizData[this.mCurrentQuizIDX]== undefined){return;}

       // console.log(`quizData = ${this.mQuizData[this.mCurrentQuizIDX]}` );

        


        if(this.mInputFlag == false){return;}
        this.mDisplayInput.text = this.mInputText.htmlInput.value;

        /*
        if(this.mInputText.text.length>this.mQuizData[this.mCurrentQuizIDX].length){
            this.mInputFlag = false;
            this.mInputText.outFocus();
            this.wrongCount+=1;
            console.log(`글자수 초과되어서 오답`);
            this.mInputText.htmlInput.value = '';
            gsap.delayedCall(0.5,()=>{
                this.nextStep();
                if(this.mInputText)this.mInputText.inFocus();
                this.mInputFlag=true;
            })
        }
        */
    }
}

export class TypingWord extends SceneBase 
{
    private DATA: any;
    private mListIndex: number;
    private mDep2: string;

    private mActivity: Activity;
    private mActivityContainer: PIXI.Container;

    private mWrongText: PIXI.Text;
    private mAccuracyText: PIXI.Text;
    private mProgressText: PIXI.Text;

    private mTime: number;

    private mComboBox: WordComboBox;

    constructor() 
    {

        super();
        this.name = "TypingWord";
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
        this.mDep2 = this.DATA[this.mListIndex].Dep2;
        this.draw();
        this.setComboBox();
        this.visible = true;
    }

    private draw() {
    
        SoundManager.Handle.stopBgmSound();

        

        this.mActivityContainer = new PIXI.Container();
        this.addChild(this.mActivityContainer);

        const tempData = Util.shuffleArray( this.DATA[this.mListIndex].list );
        
        if ( tempData.length > 20 ) 
        {
            tempData.splice( 20, tempData.length - 1)
        } 

        //console.log(tempData);

        this.mActivity = new Activity( tempData );
        this.mActivityContainer.addChild(this.mActivity);




       const style = new PIXI.TextStyle({
            align: "rihgt",
            fill: "#f84d4d",
            fontFamily: "NanumGothicBold",
            fontWeight: "bold",
            fontSize: 44,
            lineHeight:28
        });

        this.mWrongText = new PIXI.Text("000개", style);
        this.mAccuracyText = new PIXI.Text("100%", style);
        this.mProgressText = new PIXI.Text("1/20", style);
 
        this.mWrongText.position.set(595,275);
        this.mAccuracyText.position.set(1317,275);
        this.mProgressText.position.set(2025,275);

         this.addChild(this.mWrongText);
         this.addChild(this.mAccuracyText);
         this.addChild(this.mProgressText);

         this.mTime = Date.now();
    }

    private setComboBox()
    {
        this.mComboBox = new WordComboBox();
        this.mComboBox.selectedIndex = this.mListIndex;
        this.mComboBox.label = this.DATA[this.mListIndex].title;
        this.mComboBox.addCustomEventListener(EventType.ComboBoxChange, (evt: CustomEvent) => {

                //this.stopTimer();
                this.mListIndex = evt.data;
                //this.mData = this.DATA[this.mListIndex].exam;

                this.mComboBox.selectedIndex = evt.data;
                this.mComboBox.label = this.DATA[this.mListIndex].title;
                this.mComboBox.data = this.DATA;
                this.mDep2 = this.DATA[this.mListIndex].Dep2;

                //
                this.mTime = Date.now();
                this.mWrongText.text = "000개"
                this.mAccuracyText.text = "100%"
                this.mProgressText.text = "1/20"

                this.mActivityContainer.removeChild( this.mActivity );
                
                const tempData = Util.shuffleArray( this.DATA[this.mListIndex].list );
                if ( tempData.length > 20 ) 
                {
                    tempData.splice( 20, tempData.length - 1)
                }

                //console.log(tempData);

                this.mActivity = new Activity( tempData );
                this.mActivityContainer.addChild(this.mActivity);

            });

        this.mComboBox.position.set(514, 70);
        this.mComboBox.data = this.DATA;
        this.addChild(this.mComboBox);

        const title = new PIXI.Sprite( ViewerRscManager.Handle.getResource("word", "drop_title.png").texture );
        title.position.set(80, 70);
        this.addChild(title);
    }

    public drawScore()
    {
        let tempActivity = this.mActivity.progress + 1;
        if( tempActivity > 20) tempActivity = 20;

        this.mProgressText.text = `${tempActivity}/20`;

        this.mWrongText.text =  `${Util.addZero( this.mActivity.wrongCount)}개`;

        this.mAccuracyText.text = `${this.mActivity.correct}%`;
    }

    public playEOP() {
        const eop = new EOPPopup();
        eop.addCustomEventListener( EventType.ReceiveData, ()=> {this.typingEnd();});
    }

    private async typingEnd(){
        const resultPopup = new ResultPopup(
            "낱말 연습 결과", 0, {
                "wrong": this.mActivity.wrongCount,
                "accuracy": this.mActivity.correct,
                "time": Math.floor((Date.now() - this.mTime) / 1000)
            }
        );

        await DataManager.Handle.getCompleteQuery(this.mDep2, 0, 0, this.mActivity.correct, 0);
    }
}