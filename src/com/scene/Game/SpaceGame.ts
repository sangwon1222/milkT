import {TypeingApp} from '../../TypeingApp';
import { DataManager} from '../../manager/DataManager'
import { SoundManager } from '../../manager/SoundManager';
import { LanguageManager } from '../../manager/LanguageManager';
import { EventType } from '../../core/EventType';
import { CustomEvent } from '../../core/CustomEvent';
import { SceneBase } from '@/com/core/SceneBast';
////
import { EnemyContainer } from './space/EnemyContainer';
import { ScoreBoard } from './component/ScoreBoard';
import { InputContainer } from './component/InputContainer';
import { BaseContainer } from './space/BaseContainer';
import { CharactersContainer } from './space/CharactersContainer';
import { BonusContainer } from './component/BonusContainer';
import { StartPopup } from './component/StartPopup';
import { EOPPopup } from '../../widget/popup/EOPPopup';
import { ResultPopup } from '../../widget/popup/ResultPopup';

import * as Util from '../../../Utill/Config';
import gsap from 'gsap';


export class SpaceGame extends SceneBase
{
    public startLevel: number;
    //////////////////////////////////////////
    private DATA: any;
    private mLevel: number;

    private mBaseContainer: BaseContainer;
    private mEnemyContainer: EnemyContainer;
    private mCharactersContainer: CharactersContainer;
    private mBonuseContainer: BonusContainer;
    private mScoreBoardContainer: ScoreBoard;
    private mInputContainer: InputContainer;
    private mStartPopup: StartPopup;

    private mDelay: gsap.core.Tween;
    
    constructor()
    {
        super();
        this.name = "SpaceGame";
        this.visible = false;
        this.startLevel = 0;
    }

    async onInit(){
        // 헤더 상태 설정
        TypeingApp.Handle.getHeader().setTypingMode();
        ///------------------------------
        this.DATA = await DataManager.Handle.getData('game',LanguageManager.Handle.LANG);

        //베이스 컨테이너
        this.mBaseContainer = new BaseContainer();
        this.addChild( this.mBaseContainer );

        // 적 컨테이너
        this.mEnemyContainer = new EnemyContainer();
        this.mEnemyContainer.addCustomEventListener( EventType.RecieveScore, (evt)=> this.checkScore(evt));
        this.mEnemyContainer.addCustomEventListener( EventType.RecieveGameSucceed, (evt)=> this.checkSucceed(evt));
        this.mEnemyContainer.addCustomEventListener( EventType.ReceiveGameRecover, (evt)=> this.checkRecover(evt));
        this.mEnemyContainer.addCustomEventListener( EventType.CRASH, (evt)=> this.checkCrash(evt));
        this.addChild( this.mEnemyContainer );

        //캐릭터 컨테이너
        this.mCharactersContainer = new CharactersContainer();
        this.addChild( this.mCharactersContainer );

        //보너스 컨테이너
        this.mBonuseContainer = new BonusContainer(0);
        this.mBonuseContainer.addCustomEventListener( EventType.RecieveScore, (evt)=> this.checkScore(evt));
        this.addChild( this.mBonuseContainer);


        //스코어보드 컨테이너-----------------------------------
        this.mScoreBoardContainer = new ScoreBoard();
        this.mScoreBoardContainer.addCustomEventListener( EventType.RecieveNoVitality, (evt)=> this.checkVitality(evt));
        this.mScoreBoardContainer.position.set(30,7);
        this.addChild(this.mScoreBoardContainer);
        this.mScoreBoardContainer.lifeFull();
        this.addChild(this.mScoreBoardContainer);
        
        //입력 컨테이너 -----------------------------------------
        this.mInputContainer = new InputContainer("spacegame");
        this.mInputContainer.addCustomEventListener( EventType.RecieveText, (evt)=> this.checkText(evt));
        this.addChild(this.mInputContainer);

        //스타트 팝업 컨테이너
        this.mStartPopup = new StartPopup();
        this.mStartPopup.addCustomEventListener( EventType.RecieveGameStart, (evt)=> this.checkGamePlay(evt));
        this.addChild(this.mStartPopup);
    }

    async onStart(){
        SoundManager.Handle.stopBgmSound();
        SoundManager.Handle.BGM_SpaceGame();

        console.log( this.startLevel);
        this.setGame( this.startLevel );
        this.startGame( this.startLevel );
    }

    async onEnd()
    {
        this.mBaseContainer.clearContainer();
        this.mCharactersContainer.cleaerContainer();
        this.mEnemyContainer.clearContainer();
        this.mBonuseContainer.clearContainer();
        this.mInputContainer.clearContainer();  
        this.mStartPopup.clearContainer();  

        if(this.mDelay) this.mDelay.kill();
    }

    // Header->
    puaseGame()
    {
        this.mBonuseContainer.pause();
        this.mEnemyContainer.pause();
    }
    // GamePopup->
    resumeGame()
    {
        this.mBonuseContainer.resume();
        this.mEnemyContainer.resume();
    }

    // 게임 실행 준비
    private setGame( level: number )
    {
        this.mLevel = level;
        const levelData = Util.shuffleArray(this.DATA[ level ]);
        this.mScoreBoardContainer.drawLevel( this.mLevel + 1);
        this.mEnemyContainer.setData( 
            {
                wordData:levelData,
                level: level
            } 
        );

        this.mBonuseContainer.setData( 
            {
                wordData:levelData,
                level: level
            } 
        );
    }
    private startGame( level: number )
    {
        this.mStartPopup.showPopup( level);
    }

    // InputContainer ->
    private checkText( evt: CustomEvent ) 
    {
        this.mBonuseContainer.matchText( evt.data );
        this.mEnemyContainer.matchText( evt.data );
    }
    // BonusContainer ->
    // EnemyContainer ->
    private checkScore( evt: CustomEvent )
    {
        const score = evt.data;
        this.mScoreBoardContainer.score += score;
    }
    // EnemyContainer ->
    private checkRecover( evt: CustomEvent )
    {
        this.mScoreBoardContainer.lifeFull();
    }
    // EnemyContainer ->
    private checkCrash( evt: CustomEvent )
    {
        SoundManager.Handle.Effect_SPACE_LIFE_DECREASE();
        this.mScoreBoardContainer.lifeReduce();
        this.mBaseContainer.creash();
    }
     // EnemyContainer ->
    private checkSucceed( evt: CustomEvent )
    {
        this.mLevel++;
        this.mDelay = gsap.delayedCall(2, ()=>{
            if( this.mLevel == 8) {
                console.log("게임 8단계까지 클리어");
                this.mLevel--;
                this.showEopPopup();
                this.mInputContainer.focusOut();
            } else {
                this.setGame( this.mLevel );
                this.mStartPopup.showPopup( this.mLevel );
            }
        });
    }
    // ScoreBoardContainer ->
    private checkVitality( evt: CustomEvent )
    {
        const life: number = evt.data;

        if( life == 6 || life == 2)
        {
            console.log("보너스 발생");
            this.mBonuseContainer.showBonus();
        }

        if( life == 0 ) 
        {
            this.mEnemyContainer.pause();
            this.showEopPopup();
            this.mInputContainer.focusOut();
        }
    }

    // StartPopup ->
    private checkGamePlay( evt: CustomEvent )
    {
        this.mEnemyContainer.resume();
        this.mInputContainer.focusIn();
    }

    private showEopPopup()
    {
        const eop = new EOPPopup();
        eop.addCustomEventListener( EventType.ReceiveData, async()=> {
            const resultPopup = new ResultPopup(
                "게임 결과", 2, {
                    "score": Util.addComma(this.mScoreBoardContainer.score),
                    "level": this.mLevel + 1
                }
            );

            const dep2 = (LanguageManager.Handle.LANG == 'kr')? '610001' : '620001'
            await DataManager.Handle.getCompleteQuery(dep2, 0, 0, 0, this.mScoreBoardContainer.score);

            resultPopup.addCustomEventListener( EventType.ReceiveData, async()=> {
                //다시 하기
                this.mScoreBoardContainer.lifeFull();
                this.mScoreBoardContainer.score = 0;
                this.setGame( this.mLevel );
                this.mStartPopup.showPopup( this.mLevel );
            })
        });
    }
}

