// import { ObjectBase } from '../../../../com/core/ObjectBase';
// import { StartPopup } from './StartPopup';
// import { InputText2 } from '../../../widget/InputText2';
// import { ViewerRscManager } from '../../../manager/ViewerRscManager';
// import { EventType } from '../../../core/EventType';
// import { CustomEvent } from '../../../core/CustomEvent';
// import { ScoreBoard } from './ScoreBoard';
// import { Actor } from '../../../widget/Actor';

// import { BonusSpaceActor } from './BonusSpaceActor';
// import { BonusForestActor } from './BonusForestActor';
// import { EnemyRainActor } from './EnemyRainActor';
// import { EffectType } from './EffectType';
// import { EnemySlimeActor } from './EnemySlimeActor';
// import { EOPPopup } from '../../../widget/popup/EOPPopup';
// import { ResultPopup } from '../../../widget/popup/ResultPopup';
// import gsap from 'gsap';
// import { EnemyBossSlimeActor } from './EnmeyBossSlimeActor';

// interface TextInputOptions {
//     position?: string;
//     background?: string;
//     border?: string;
//     outline?: string;
//     lineHeight?: string;
//     multiline?: boolean;
//     box?: any;
//     input?: any;
// }


// export class Engine extends ObjectBase
// {
//     //----------------------------------------------
//     protected mGameCategory: string;
//     //----------------------------------------------

//     protected mIsGamePlay: boolean;

//     protected mInterval: number; // 인터벌 객체

//     protected mEnemyAry: Array< EnemyRainActor | EnemySlimeActor | EnemyBossSlimeActor>;
//     protected mBonusAry: Array< BonusSpaceActor | BonusForestActor>;

//     // 게임 관련
//     protected mComboCnt: number;
//     protected mMaxComboCnt: number;

//     protected mGoalCnt: number; 
//     protected mGoal: number; // 각 스테이지 종료를 위한 목표 수
    
//     protected mIntervalTime: number // 현 mLevel 값의 mLevelData의 "interval"값
//     protected mActiveIntervalTime: number; // 현재 사용중인 Interval 값 ( 특수효과에 따라서 인터벌 값은 변화한다.)
//     protected mBasePlusScore: number; // 레벨에 따른 기본 증가 점수

//     protected mCurrentSpeed: number // 현재 적 속도
//     protected mDropSpeed: number // 레벨에 따른 적 최소 속도.
//     protected mSlowSpeed: number // 적 느려지는 속도.
//     protected mFastSpeed: number // 적 빨라지는 속도.


//     protected mLevel: number; // 현재 레벨값
//     protected mComboData: Array<number> // 콤보에 따른 추가 점수 값
//     protected mLevelData: Array<any> //  레벨값에 따른 게임 적용값 배열 오브젝트

//     protected mEnumyContainer: ObjectBase;
//     protected mBonusContainer: ObjectBase;
//     protected mBossContainer: ObjectBase;

//     protected mStratPopup: StartPopup;
//     protected mScoreBoardContainer: ObjectBase;
//     protected mScoreBorad: ScoreBoard;

//     // 게임효과
//     protected mStopTime: number;
//     protected mSlowTime: number;
//     protected mFastTime: number;

//     // 특수 텍스트를 생성을 위한 변수
//   //  protected mEffectCnt: number; // 특수 텍스트를 생성하기 위한 Cnt
//     protected mEffectMaxCnt: number; // 특수 텍스트의 생성 빈도 ( 5라면 단어 5개가 생성될 때 하나를 생성)
//     protected mEffectMakeCnt: number; // mEffectCnt 가 mEffectMakeCnt 동일하면 특수 텍스트를 생성.

//     get comboCnt(): number { return this.mComboCnt;}

    
//      /// 테스트용
//      public testDropSpeed: number;
//      public testInterval: number;


    
//    // private delayedCallGamePlay: gsap.core.Tween;

//     // Input 관련
//     private mInputWidgetContainer: ObjectBase;
//     private mInputTxtContainer: PIXI.Container;
//     protected mInputText: InputText2;

//     constructor()
//     {
//         super();

        
//         //this.init();
//     }

//     private finishLevel() 
//     {

//         const check = setInterval( async()=>{

//             if( this.mScoreBorad.lifeCnt <= 0)
//             {
//                 this.gamePause();
//                 this.reSet();
//                 clearInterval( check );
//                 this.gameOver();
//                 return;
//             }

//             if( this.mEnemyAry.length == 0 && this.mGoalCnt >= this.mGoal)
//             {
//                 this.gamePause();
//                 this.reSet();
//                 clearInterval( check );

//                 this.removeAllEnemyTicker();
//                 this.removeAllBonusTicker();

//                 if( this.mLevel + 1 == 8 )
//                 {
//                     console.log("모든 스테이지 종료");
//                     this.gameOver();
//                 }else{

//                     console.log("Next Stage");
//                     this.mIsGamePlay = false;
//                     this.mLevel++;
//                     this.setLevel();
//                     this.showStartPopup();
//                 }
//             }
//         },1000);
//     }

//     setLevel()
//     {
//         //
//     }

//     public makeReadySetGo()
//     {
//         this.mStratPopup = new StartPopup();
//         this.addChild(this.mStratPopup);
//     }

//     public makeInputWidget() {

//         this.mInputWidgetContainer = new ObjectBase();
//         this.mInputWidgetContainer.position.set(948, 1380);

//         const bg = new PIXI.Sprite(ViewerRscManager.Handle.getResource( this.mGameCategory, "input_bg.png").texture);
//         this.mInputWidgetContainer.addChild(bg);


//         const style = new PIXI.TextStyle({
//             fill: "#010101",
//             fontFamily: "NanumGothicBold",
//             fontWeight: "normal",
//             fontSize: 60,
//         });

//         this.mInputText = new InputText2( 490, 60, 0xffb000, style );
//         this.mInputText.htmlInput.disabled = true;
//         this.mInputText.y = 54;

//         this.mInputText.htmlInput.disabled = false;
//         this.mInputText.addCustomEventListener(EventType.InputTextInput, (evt)=> this.onInput(evt));
//         this.mInputText.addCustomEventListener(EventType.InputTextKeyUp, (evt)=> this.onKeyUp(evt));
//         this.mInputWidgetContainer.addChild(this.mInputText);

//         this.mInputText.x = 335 - this.mInputText.getDisplayWidth() / 2;

//         this.addChild(this.mInputWidgetContainer);
//     }

//     public makeScoreBoard() {

//         this.mScoreBoardContainer = new ObjectBase();
//         this.mScoreBoardContainer.position.set(30,7);

//         this.mScoreBorad = new ScoreBoard();
//         this.mScoreBoardContainer.addChild(this.mScoreBorad);
//         this.mScoreBorad.lifeFull();

//         this.addChild(this.mScoreBoardContainer);
//     }

//     public showStartPopup()
//     {
//         this.mStratPopup.showPopup( this.mLevel );
//     }

//     private onInput( evt: CustomEvent ) 
//     {
//         this.mInputText.x = 335 - this.mInputText.getDisplayWidth() / 2;
//     }

//     private onKeyUp( evt: CustomEvent ) {
//         if(evt.data == 13 || evt.data == 32) {
//             const txt = this.mInputText.text.trim();
//             this.mInputText.text = "";
//             this.mInputText.x = 335 - this.mInputText.getDisplayWidth() / 2;
//             this.dispatchEvent( EventType.GameOnKeyUp, txt);
//         }  
//     }

//     reSet() {
//         clearTimeout(this.mStopTime);
//         clearTimeout(this.mSlowTime);
//         clearTimeout(this.mFastTime);
//         this.mActiveIntervalTime = this.mIntervalTime;
//     }

//     makeEnemy()
//     {
//         //
//     }

//     private changeSpeed( spd: number ) {
//         this.mCurrentSpeed = spd;
//         for(const enemy of this.mEnemyAry) {enemy.speed = this.mCurrentSpeed;}
//     }

//         // 게임 처음 시작
//         gamePlay() {

//             for( const enmey of this.mEnemyAry)
//                 {
//                     enmey.removeTicker();
//                     this.mEnumyContainer.removeChild(enmey);
//                 }

//             for( const bonus of this.mBonusAry)
//                 {
//                     bonus.removeTicker();
//                     this.mBonusContainer.removeChild(bonus);
//                 }

//             this.mIsGamePlay = true;
//             this.makeEnemy()
//             this.mInputText.htmlInput.disabled = false;
//             this.mInputText.inFocus();
//             clearInterval( this.mInterval);
//           //this.mInterval = setInterval( ()=> {this.makeEnemy();}, this.mActiveIntervalTime );
//             this.mInterval = setInterval( this.makeEnemy.bind(this), this.mActiveIntervalTime);
//             this.changeSpeed(this.mDropSpeed);
//             this.finishLevel();
//         }
    
//         // 게임 재개
//         gameResume() {
//             this.mInputText.htmlInput.disabled = false;
//             this.mInputText.inFocus();
//             for (const bonus of this.mBonusAry) {
//                 bonus.ticker = true;
//             }
//             for (const enemy of this.mEnemyAry) {
//                 enemy.ticker = true;
//             }
//             this.mInterval = setInterval(this.makeEnemy.bind(this), this.mActiveIntervalTime);

//         }

//         // 게임 멈추기
//         gamePause() {
//             this.mInputText.htmlInput.disabled = true;
//             for (const bonus of this.mBonusAry) {
//                 bonus.ticker = false;
//             }
//             for (const enemy of this.mEnemyAry) {
//                 enemy.ticker = false;
//             }
//             clearInterval(this.mInterval);
//         }

//         setEffect( effect: number ) {

//             if(effect == EffectType.Recover) {
//                 console.log("applyRecover");
//                 this.applyRecover();
//             }
    
//             if(effect == EffectType.Remover) {
//                 //console.log("applyAllRemover");
//                 this.applyAllRemover();
//             }
    
//             if(effect == EffectType.TimeSlow) {
//                 console.log("applySlowTime");
//                 this.applySlowTime();
//             }
    
//             if(effect == EffectType.TimeStop) {
//                 console.log("applyTimeStop");
//                 this.applyTimeStop();
//             }
    
//             // 부정 효과
//             if( effect == EffectType.Blind ) {
//                // console.log("applyBlind");
//                 this.applyBlind();
//             }
    
//             if( effect == EffectType.TimeFast ) {
//                 console.log("applyTimeFast");
//                 this.applyTimeFast();
//             }
//         }

//     // 게임 효과 -------------------------------------------------------------------------------------
//     // 모든 생명 회복
//     private applyRecover() {
//         this.mScoreBorad.lifeFull();
//     }
//     // 1초동안 적이 움직이지 않는다.
//     private applyTimeStop() {
//        // this.gamePause();

//         clearInterval(this.mInterval);
//         this.changeSpeed(0);
//         this.reSet();
//         this.mStopTime = setTimeout( ()=>{
//             this.changeSpeed(this.mDropSpeed);
//             this.gameResume();
//         }, 1000);
//     }
//     // 2초 동안 적의 속도가 느려진다.
//     private applySlowTime() {
//         this.reSet();
//         this.changeSpeed(this.mSlowSpeed);
//         this.mSlowTime = setTimeout( ()=> {
//             //this.gamePause();
//             this.changeSpeed(this.mDropSpeed);
//             this.gameResume();
//         },2000)
//     }
//      // 2초 동안 낙하 속도가 빨라진다.
//      private applyTimeFast() {
//         //
//         this.reSet();
//         this.changeSpeed(this.mFastSpeed);
//         this.mFastTime = setTimeout( ()=> {
//             //this.gamePause();
//             this.changeSpeed(this.mDropSpeed);
//             this.gameResume();
//         },1000)
//     }
//     // 모든 낙하 텍스트를 제거한다. (사용 안함)
//     private applyAllRemover() {
//         this.gamePause();
//         this.mInputText.outFocus();
//         this.mInputText.htmlInput.disabled = true;
//         this.reSet();
//         let delay = 0;
//         for( const enemy of this.mEnemyAry){ 
//             const temp =  setInterval( ()=> {
//             enemy.alive = false;
//             clearInterval(temp);},delay);
//             delay += 100;
//         }
//         const cleaer = ()=> {
//             if(this.mEnemyAry.length == 0) {
//                 gsap.ticker.remove( cleaer );
//                // this.mEffectCnt = 0;
//               //  this.mEffectMakeCnt = -1;
//                 this.mEnemyAry = [];
//                 this.mInputText.htmlInput.disabled = false;
//                 this.mInputText.inFocus();
//                 this.changeSpeed(this.mDropSpeed);
//                 this.gameResume();
//             }
//         }
//         gsap.ticker.add( cleaer );
//     }

//     // 2초 동안 단어가 보이지 않는다. (사용 안함)
//     private applyBlind() {
//         for( const enmey of this.mEnemyAry ) {enmey.blind();}
//     }

//     removeAllEnemyTicker()
//     {
//         for( let i = this.mEnumyContainer.children.length - 1; i >= 0; i--)
//         {
//             const child = this.mEnumyContainer.children[i];
//             (child as Actor).removeTicker();
//         }
//     }

//     removeAllBonusTicker()
//     {
//         for( let i = this.mBonusContainer.children.length - 1; i >= 0; i--)
//         {
//             const child = this.mBonusContainer.children[i];
//             (child as Actor).removeTicker();
//         }
//     }

//     removeAllEnmey()
//     {
//         for( let i = this.mEnumyContainer.children.length - 1; i >= 0; i--)
//         {
//             const child = this.mEnumyContainer.children[i];
//             this.mEnumyContainer.removeChild( child );
//             (child as Actor).removeTicker();
//         }
//         this.mEnemyAry = [];
//     }

//     removeAllBonus()
//     {
//         for( let i = this.mBonusContainer.children.length - 1; i >= 0; i--)
//         {
//             const child = this.mBonusContainer.children[i];
//             this.mBonusContainer.removeChild( this.mBonusContainer.children[i] );
//             (child as Actor).removeTicker();
//         }
//         this.mBonusAry = [];
//     }

//     gameOut() {
//         console.log("game out");
//         this.mStratPopup.killTweens();
//         this.mInputText.outFocus();
//         this.mInputText.text = "";
//         this.mInputText.htmlInput.disabled = true;
//         this.gamePause();
//         clearTimeout(this.mStopTime);
//         clearTimeout(this.mSlowTime);
//         clearTimeout(this.mFastTime);
//        // this.mInterval = null;

//         this.removeAllEnmey();
//         this.removeAllBonus();
        
//         this.removeChild(this.mStratPopup);
//     }

//     async gameOver() {
//         console.log('Game Over');
//         this.mInputText.outFocus();
//         this.mInputText.text = "";
//         this.mInputText.htmlInput.disabled = true;
//         this.gamePause();
//         clearTimeout(this.mStopTime);
//         clearTimeout(this.mSlowTime);
//         clearTimeout(this.mFastTime);
//         //this.mInterval = null;
//         //this.reSet();

//         this.removeAllEnemyTicker();
//         this.removeAllBonusTicker();


//         const eop = new EOPPopup();
//         eop.addCustomEventListener( EventType.ReceiveData, ()=> {
//             const resultPopup = new ResultPopup(
//                 "게임 결과", 2, {
//                     "score": this.mScoreBorad.score,
//                     "level": this.mLevel + 1
//                 }
//             );

//             resultPopup.addCustomEventListener( EventType.ReceiveData, async()=> {
                
//                 for( const enmey of this.mEnemyAry)
//                 {
//                     enmey.removeTicker();
//                     this.mEnumyContainer.removeChild(enmey);
//                 }

//                 for( const bonus of this.mBonusAry)
//                 {
//                     bonus.removeTicker();
//                     this.mBonusContainer.removeChild(bonus);
//                 }
 
//                 this.mEnemyAry = [];
//                 this.mBonusAry = [];
      
//                 this.mScoreBorad.score = 0;
//                 this.mIsGamePlay = false;
//                 this.setLevel();
//                 this.mScoreBorad.lifeFull();
//                 this.showStartPopup();
//             })
//         });
//     }
// }