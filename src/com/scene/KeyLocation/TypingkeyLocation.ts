import { TypeingApp } from '../../TypeingApp';
import { SceneBase, SceneName } from '../../core/SceneBast';
import { DataManager} from '../../manager/DataManager';
import { ViewerRscManager } from '../../manager/ViewerRscManager';
import { SoundManager } from '../../manager/SoundManager';
import { EventType } from "../../core/EventType";
import { CustomEvent} from '../../core/CustomEvent';
import gsap from 'gsap';
import { OneInputText } from '../../widget/OneInputText';
import { QuestionText } from '../../widget/QuestionText';
import * as Util from '../../../Utill/Config';
import { EOPPopup } from '../../widget/popup/EOPPopup';
import { ResultPopup } from '../../widget/popup/ResultPopup';
import { KeyLocationComboBox } from './component/KeyLocationComboBox';


export class Keyboard extends PIXI.Sprite{
    private mLeftFinger: PIXI.Sprite;
    private mRightFinger: PIXI.Sprite;
    private mLeftData: string;
    private mRightData: string;

    set fingerAlpha(v: number) { 
        this.mLeftFinger.alpha = v;
        this.mRightFinger.alpha = v;
    }

    constructor(inputdata: string){
        super();

        this.texture = ViewerRscManager.Handle.getResource("keylocation","keyboard.png").texture;

        this.mLeftData= "";
        this.mRightData= "";
        this.update(inputdata); 

    }
    update(inputdata){
        this.removeChildren();
        this.mLeftData= "";
        this.mRightData= "";
        
        if(inputdata=="ㅂ" || inputdata=="q" ){this.mLeftData = "q" ;}
        if(inputdata=="ㅈ" || inputdata=="w" ){this.mLeftData = "w" ;}
        if(inputdata=="ㄷ" || inputdata=="e" ){this.mLeftData = "e" ;}
        if(inputdata=="ㄱ" || inputdata=="r" ){this.mLeftData = "r" ;}
        if(inputdata=="ㅅ" || inputdata=="t" ){this.mLeftData = "t" ;}
        
        if(inputdata=="ㅛ" || inputdata=="y" ){this.mRightData = "y" ;}
        if(inputdata=="ㅕ" || inputdata=="u" ){this.mRightData = "u" ;}
        if(inputdata=="ㅑ" || inputdata=="i" ){this.mRightData = "i" ;}
        if(inputdata=="ㅐ" || inputdata=="o" ){this.mRightData = "o" ;}
        if(inputdata=="ㅔ" || inputdata=="p" ){this.mRightData = "p" ;}
        
        if(inputdata=="ㅁ" || inputdata=="a" ){this.mLeftData = "a" ;}
        if(inputdata=="ㄴ" || inputdata=="s" ){this.mLeftData = "s" ;}
        if(inputdata=="ㅇ" || inputdata=="d" ){this.mLeftData = "d" ;}
        if(inputdata=="ㄹ" || inputdata=="f" ){this.mLeftData = "f" ;}
        if(inputdata=="ㅎ" || inputdata=="g" ){this.mLeftData = "g" ;}
        
        if(inputdata=="ㅗ" || inputdata=="h"){this.mRightData = "h" ;}
        if(inputdata=="ㅓ" || inputdata=="j"){this.mRightData = "j" ;}
        if(inputdata=="ㅏ" || inputdata=="k"){this.mRightData = "k" ;}
        if(inputdata=="ㅣ" || inputdata=="l"){this.mRightData = "l" ;}
        
        if(inputdata=="ㅋ" || inputdata=="z" ){this.mLeftData = "z" ;}
        if(inputdata=="ㅌ" || inputdata=="x" ){this.mLeftData = "x" ;}
        if(inputdata=="ㅊ" || inputdata=="c" ){this.mLeftData = "c" ;}
        if(inputdata=="ㅍ" || inputdata=="v" ){this.mLeftData = "v" ;}
        
        if(inputdata=="ㅠ" || inputdata=="b"){this.mLeftData = "b" ;}
        if(inputdata=="ㅜ" || inputdata=="n"){this.mRightData = "n" ;}
        if(inputdata=="ㅡ" || inputdata=="m"){this.mRightData = "m" ;}
        
        if(inputdata==","){this.mRightData = "comma" ;}
        if(inputdata=="."){this.mRightData = "full_stop" ;}
        if(inputdata==";"){this.mRightData = "semicolon" ;}
        if(inputdata==":"){this.mLeftData="l_shift"; this.mRightData = "semicolon" ;}
        
        if(inputdata=="ㅃ" || inputdata=="Q" ){this.mLeftData = "q";this.mRightData ="r_shift";}
        if(inputdata=="ㅉ" || inputdata=="W"){this.mLeftData = "w";this.mRightData ="r_shift";}
        if(inputdata=="ㄸ" || inputdata=="E"){this.mLeftData = "e";this.mRightData ="r_shift";}
        if(inputdata=="ㄲ" || inputdata=="R"){this.mLeftData = "r";this.mRightData ="r_shift";}
        if(inputdata=="ㅆ" || inputdata=="T"){this.mLeftData = "t";this.mRightData ="r_shift";}
        if(inputdata=="ㅒ" || inputdata=="O"){this.mLeftData = "l_shift";this.mRightData ="o";}
        if(inputdata=="ㅖ" || inputdata=="P"){this.mLeftData = "l_shift";this.mRightData ="p";}
        
        if(inputdata=="Y" ){this.mLeftData = "l_shift";this.mRightData = "y" ;}
        if(inputdata=="U" ){this.mLeftData = "l_shift";this.mRightData = "u" ;}
        if(inputdata=="I" ){this.mLeftData = "l_shift";this.mRightData = "i" ;}
        
        if(inputdata=="A" ){this.mLeftData = "a";this.mRightData = "r_shift" ;}
        if(inputdata=="S" ){this.mLeftData = "s";this.mRightData = "r_shift" ;}
        if(inputdata=="D" ){this.mLeftData = "d";this.mRightData = "r_shift" ;}
        if(inputdata=="F" ){this.mLeftData = "f";this.mRightData = "r_shift" ;}
        if(inputdata=="G" ){this.mLeftData = "g";this.mRightData = "r_shift" ;}
        
        if(inputdata=="H"){this.mLeftData="l_shift";this.mRightData = "h" ;}
        if(inputdata=="J"){this.mLeftData="l_shift";this.mRightData = "j" ;}
        if(inputdata=="K"){this.mLeftData="l_shift";this.mRightData = "k" ;}
        if(inputdata=="L"){this.mLeftData="l_shift";this.mRightData = "l" ;}

        if(inputdata=="Z" ){this.mLeftData = "z" ;this.mRightData = "r_shift" ;}
        if(inputdata=="X" ){this.mLeftData = "x" ;this.mRightData = "r_shift" ;}
        if(inputdata=="C" ){this.mLeftData = "c" ;this.mRightData = "r_shift" ;}
        if(inputdata=="V" ){this.mLeftData = "v" ;this.mRightData = "r_shift" ;}
        
        if(inputdata=="B"){this.mLeftData="b";this.mRightData = "r_shift" ;}
        if(inputdata=="N"){this.mLeftData="l_shift";this.mRightData = "n" ;}
        if(inputdata=="M"){this.mLeftData="l_shift";this.mRightData = "m" ;}

        if(inputdata=="/"){this.mLeftData="l_hand";this.mRightData = "question_mark" ;}
        if(inputdata=="?"){this.mLeftData="l_shift";this.mRightData = "question_mark" ;}

        if(this.mLeftData == ""){this.mLeftData="l_hand";}
        if(this.mRightData == ""){this.mRightData="r_hand";}

        this.mLeftFinger = new PIXI.Sprite(ViewerRscManager.Handle.getResource("keylocation",`${this.mLeftData}.png`).texture);
        this.mLeftFinger.anchor.set(0.5);

        this.mRightFinger = new PIXI.Sprite(ViewerRscManager.Handle.getResource("keylocation",`${this.mRightData}.png`).texture);
        this.mRightFinger.anchor.set(0.5);

        this.anchor.set(0.5);
        this.addChild(this.mLeftFinger,this.mRightFinger)
    }
}

export class Activity extends PIXI.Sprite{
    // 테마바와 레코드바는 데이터설정때문에 keylocation에 넣어두었다.
    private mInputText: OneInputText;
    get inputText(): OneInputText{return this.mInputText}

    private mTypingText: string;
    private mKeyBoard: Keyboard;

    private mQuestionText: QuestionText;
    private mTextAry: Array<PIXI.Text>;
    private mCurrentQuizIDX: number;

    private mQuizBox: PIXI.Sprite;
    private mQuizDisplay: PIXI.Container;
    private mQuizFlag: boolean;
    private mQuizData: Array<string>;
    private mFocus: PIXI.Sprite;

    private mTotal: number;

    private mWrongCount=0 ;
    get wrongCount(): number { return this.mWrongCount}
    set wrongCount(v: number) { 
        this.mWrongCount =v;
        this.mCorrect = Math.ceil( (1-(this.mWrongCount/this.mTotal))*100 ) ;
        if(this.mCorrect<0){this.mCorrect=0;}
    }

    private mCorrect= 100;
    get correct(): number { return this.mCorrect}

    private mProgress= 0;
    get progress(): number { return this.mProgress}
    set progress(v: number) { 
        this.mProgress=v;
        (this.parent.parent as TypingKeyLocation ).drawScore();
    }

    constructor(quizData: Array<string> ,  ){
        super();
        this.texture = ViewerRscManager.Handle.getResource("keylocation", `game_bg.png`).texture;
        this.mQuizBox = new PIXI.Sprite(ViewerRscManager.Handle.getResource("keylocation", `quizbox.png`).texture)
        this.mQuizBox.anchor.set(0.5);
        this.mQuizBox.position.set( TypeingApp.Handle.appWidth/2, TypeingApp.Handle.appHeight /2-220)
        this.addChild(this.mQuizBox)

        this.mQuizData = quizData;
        this.mTotal = this.mQuizData.length;

        this.init();
        window.onkeydown=(evt)=>{

            if(!this.mInputText){window.onkeypress=null;}
            if(evt.code == 'Enter' || evt.code == 'NumpadEnter' || evt.code == 'Backspace'){
                this.mInputText.outFocus();
                this.mInputText.inFocus();
            }
        }
    }

   async init(){
        
        this.mTextAry=[];
        this.mCurrentQuizIDX = 0;
        this.mQuizFlag = false;
        this.mWrongCount =0;
        this.mCorrect = 100;
        this.mProgress = 0;
        this.mTypingText="";

        this._createBackground();

        this.mFocus = new PIXI.Sprite(ViewerRscManager.Handle.getResource(`keylocation`,"focus.png").texture);
        this.mQuizBox.addChild(this.mFocus)
        this.mFocus.anchor.set(0.5);
        gsap.to(this.mFocus.scale,{x:1.1,y:1.1,duration:1}).repeat(-1).yoyo(true);

        this._createQuiz();

        this.mInputText = new OneInputText();
        this.mInputText.width=0;
        this.mInputText.height=0;
        this.addChild(this.mInputText)
        this.mInputText.position.set(-600, 100);
        this.mInputText.addCustomEventListener(EventType.InputTextKeyUp, (evt)=> {
            this.mTypingText = evt.data.slice(-1);
            this.onKeyUp(evt.data)
        })
        this.mQuizFlag = true;
        this.mInputText.inFocus();

        this.mKeyBoard = new Keyboard(this.mQuizData[this.mCurrentQuizIDX]);
        this.mKeyBoard.position.set(TypeingApp.Handle.appWidth/2,TypeingApp.Handle.appHeight+this.mKeyBoard.height)
        this.addChild(this.mKeyBoard)
        gsap.to(this.mKeyBoard,{y:734+this.mKeyBoard.height/2,duration:0.5})
   }
       
    _createBackground(){
        this.mQuestionText = new QuestionText();
        this.mQuestionText.position.set(100,100);
        this.mQuestionText.answerText = this.mQuizData[this.mCurrentQuizIDX];
        this.addChild(this.mQuestionText);
        this.mQuestionText.position.set(0, 0);
        this.mQuestionText.alpha=0;

        const mask = new PIXI.Sprite(ViewerRscManager.Handle.getResource("keylocation", `quizbox.png`).texture);
        mask.position.set(-1000,-120);
        this.mQuizBox.addChild(mask)

        this.mQuizDisplay =new PIXI.Container;
        this.mQuizDisplay.mask = mask;
    }

    _createQuiz(){
        let xValue=0;
        for(let i=0 ; i< this.mQuizData.length; i++){
            
            const textCard = new PIXI.Graphics();
            textCard.beginFill(0xFFFFFF,0)
            textCard.drawRect(0,0,200,200);
            textCard.endFill();

            const text = new PIXI.Text(this.mQuizData[i])
            text.style.fontFamily ='NanumGothicBold';
            text.style.fontWeight ='bold';
            text.style.fontSize = 130;
            text.style.padding = 10;
            text.style.lineHeight = 30;
            text.pivot.x= text.width/2;
            text.pivot.y= text.height/2;
            text.x=textCard.width/2;
            text.y = textCard.height/2 + 20;
            text.style.fill=0xFFFFFF;
            text.tint=0x191919;

            this.mTextAry.push(text);
            textCard.addChild(text)

            textCard.pivot.x = textCard.width/2;
            textCard.x = xValue ;
            textCard.y = 40 ;
            xValue+=350;
            this.mQuizDisplay.addChild(textCard)
            
        }
        this.mQuizBox.addChild(this.mQuizDisplay)
        this.mQuizDisplay.position.set(0,-160);

    }


    onKeyUp( evt: CustomEvent ) {
        
        this.mInputText.inFocus();
       // if ( this.mInputText.checkNoEng(this.mInputText.htmlInput) != true ) { return;}
        if(this.mCurrentQuizIDX> this.mQuizData.length){return;}

        if(this.mTypingText !==""){  this.nextStep();  }
    }

    async nextStep(){
        if(this.mQuizFlag){
            this.mQuizFlag=false;
            await this.check();  
            this.mQuizFlag=true;
        }
    }

    check(): Promise<void>{
        return new Promise<void>( (resolve, reject)=>{
            this.mInputText.outFocus();
            this.mKeyBoard.fingerAlpha = 0;
            //정오답 체크
            if( this.mTypingText==this.mQuizData[this.mCurrentQuizIDX]){
                console.log(`정답:=> %c ${this.mTypingText}`,"font-weight:bold;")
                this.mTextAry[this.mCurrentQuizIDX].tint = 0x999999;
            }else{
                console.log( ` %c [오답] Typing: => '${this.mTypingText}' ,  Correct: => '${this.mQuizData[this.mCurrentQuizIDX]}'` ,"font-weight:bold;")
                this.mTextAry[this.mCurrentQuizIDX].tint = 0xf84d4d;
                this.wrongCount+=1;
            }
            this.mCurrentQuizIDX+=1;
            this.progress = this.mCurrentQuizIDX;
            
            //게임 끝
            if(this.mQuizData[this.mCurrentQuizIDX]== undefined){
                this.mInputText=null;
                this.removeChild(this.mInputText);
                gsap.delayedCall(0.2,()=>{

                   (this.parent.parent as TypingKeyLocation).playEOP();
                    resolve();
                    return;
                })
            }else{
                this.mQuestionText.answerText = this.mQuizData[this.mCurrentQuizIDX];
            

                gsap.to(this.mQuizDisplay,{x:this.mQuizDisplay.x-350,duration:0.2})
                .eventCallback('onComplete',()=>{ 
                    this.mKeyBoard.fingerAlpha = 1;
                    this.mKeyBoard.update(this.mQuizData[this.mCurrentQuizIDX]);
                    this.mInputText.inFocus();
                    resolve(); 
                })
            }
            
        })
    }

    inFocus(){
        if(this.mInputText==undefined){this.mInputText = new OneInputText();}
        this.mInputText.inFocus();
    }

}

export class TypingKeyLocation extends SceneBase 
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

   
    private mComboBox: KeyLocationComboBox;


    constructor() 
    {

        super();
        this.name = "TypingKeyLocation";
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

    private draw()
    {

        SoundManager.Handle.stopBgmSound();

        this.mActivityContainer = new PIXI.Container();
        this.addChild(this.mActivityContainer);

        const temp = Util.shuffleArray( this.DATA[this.mListIndex].list );

        if (temp.length > 20) temp.splice(20);

        this.mActivity = new Activity( temp );
        this.mActivityContainer.addChild(this.mActivity);

        const style = new PIXI.TextStyle({
            align: "rihgt",
            fill: "#f84d4d",
            fontFamily: "TmoneyRoundWindExtraBold",
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
        this.mComboBox = new KeyLocationComboBox();
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
                this.mActivity = new Activity( Util.shuffleArray(this.DATA[this.mListIndex].list) );
                this.mActivityContainer.addChild(this.mActivity);

                /*

                this.mTypingSpeedAry = [];
                this.mScoreAry = [0, 0, 0, 0];
                this.mCurrentTypingText.text = "000타"
                this.mTopTypingText.text = "000타"
                this.mAccuracyText.text = "100%"

                this.mCurrentLine = 0;
                this.mCurrentNum = 0;
                this.mEndLine = 0;
                this.mIsFinishPage = false;
                this.getFourLineString();
                this.setTextFocus(0);
                this.startTimer();

                */

            });

        this.mComboBox.position.set(514, 70);
        this.mComboBox.data = this.DATA;
        this.addChild(this.mComboBox);

      const title = new PIXI.Sprite( ViewerRscManager.Handle.getResource("keylocation", "drop_title.png").texture );

        // const title = new PIXI.Sprite( this.mKeyLocationSheet.texture[`drop_title.png`]);

        
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
            "자리 연습 결과", 0, {
                "wrong": this.mActivity.wrongCount,
                "accuracy": this.mActivity.correct,
                "time": Math.floor((Date.now() - this.mTime) / 1000)
            }
        );

        await DataManager.Handle.getCompleteQuery(this.mDep2, 0, 0, this.mActivity.correct, 0);
    }
}