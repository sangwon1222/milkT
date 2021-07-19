// core
import {  TypeingApp } from '../TypeingApp';
import { EventType } from '../core/EventType';
import { SceneBase } from '../core/SceneBast';
import { CustomEvent } from '../core/CustomEvent'
// widget
import { Button } from '../widget/Button'
// manager
import { ViewerRscManager } from '../manager/ViewerRscManager'
import { SoundManager } from '../manager/SoundManager';

import gsap from 'gsap';
import { BluetoothPopup } from '../widget/popup/BluetoothPopup';



export class Intro extends SceneBase{
    
    private mWordBtn: Button;
    private mShortTextBtn: Button;
    private mLongTextBtn: Button;
    private mExamBtn: Button;
    private mGameBtn: Button;
    private mKeyLocation: Button;
    

    private mSceneBtnAry: Array<Button>;

    private mFirtStartFlag: boolean;
  
    constructor() {

        super();
        this.name = "Intro";
        this.visible = false;
        this.mFirtStartFlag = true;
    }

    async onInit(){

        TypeingApp.Handle.getHeader().setMainMode();
    }

    async onStart(){

        if(this.mFirtStartFlag)
        {
            const popup = new BluetoothPopup();
            this.mFirtStartFlag = false;
        }
        
        this.draw();
        this.visible = true;
    }

    draw()
    {
        SoundManager.Handle.BGM_Main();

        const title = new PIXI.Sprite(ViewerRscManager.Handle.getResource(this.name, `title.png`).texture);
        title.position.set(947, 132);
        this.addChild(title);

         // 자리 연습 버튼
        this.mKeyLocation = new Button( ViewerRscManager.Handle.getResource( this.name, 'location_btn.png').texture );
        this.mKeyLocation.setAnchor(0.5, 0.5);
        this.mKeyLocation.position.set( 242 + this.mKeyLocation.width/2 , 466 + this.mKeyLocation.height/2);
        this.addChild(this.mKeyLocation);
        this.mKeyLocation.onButtonOver=()=>{gsap.to(this.mKeyLocation.scale,{x:1.1,y:1.1,duration:0.5}) }
        this.mKeyLocation.onButtonOut=()=>{ gsap.to(this.mKeyLocation.scale,{x:1,y:1,duration:0.5}) }

        // 낱말연습 버튼
        this.mWordBtn = new Button( ViewerRscManager.Handle.getResource( this.name, 'word_btn.png').texture );
        this.mWordBtn.setAnchor(0.5, 0.5);
        this.mWordBtn.position.set( this.mKeyLocation.x+150 +this.mWordBtn.width , this.mKeyLocation.y);
        this.addChild(this.mWordBtn);
        this.mWordBtn.onButtonOver=()=>{ gsap.to(this.mWordBtn.scale,{x:1.1,y:1.1,duration:0.5}) }
        this.mWordBtn.onButtonOut=()=>{ gsap.to(this.mWordBtn.scale,{x:1,y:1,duration:0.5}) }

         // 짧은글 연습 버튼
        this.mShortTextBtn = new Button( ViewerRscManager.Handle.getResource( this.name, 'shorttext_btn.png').texture );
        this.mShortTextBtn.setAnchor(0.5, 0.5);
        this.mShortTextBtn.position.set( this.mWordBtn.x + 150 + this.mShortTextBtn.width ,  this.mKeyLocation.y);
        this.addChild(this.mShortTextBtn);
        this.mShortTextBtn.onButtonOver=()=>{ gsap.to(this.mShortTextBtn.scale,{x:1.1,y:1.1,duration:0.5}) }
        this.mShortTextBtn.onButtonOut=()=>{ gsap.to(this.mShortTextBtn.scale,{x:1,y:1,duration:0.5}) }

        // 긴글 연습 버튼
        this.mLongTextBtn = new Button( ViewerRscManager.Handle.getResource( this.name, 'longtext_btn.png').texture );
        this.mLongTextBtn.setAnchor(0.5, 0.5);
        this.mLongTextBtn.position.set(556+this.mLongTextBtn.width/2 , 930+this.mLongTextBtn.height/2);
        this.addChild(this.mLongTextBtn);
        this.mLongTextBtn.onButtonOver=()=>{ gsap.to(this.mLongTextBtn.scale,{x:1.1,y:1.1,duration:0.5}) }
        this.mLongTextBtn.onButtonOut=()=>{ gsap.to(this.mLongTextBtn.scale,{x:1,y:1,duration:0.5}) }

        // 타자 검정 버튼
        this.mExamBtn = new Button( ViewerRscManager.Handle.getResource( this.name, 'exam_btn.png').texture );
        this.mExamBtn.setAnchor(0.5, 0.5);
        this.mExamBtn.position.set( this.mLongTextBtn.x + 150 + this.mExamBtn.width ,  this.mLongTextBtn.y);
        this.addChild(this.mExamBtn);
        this.mExamBtn.onButtonOver=()=>{ gsap.to(this.mExamBtn.scale,{x:1.1,y:1.1,duration:0.5}) }
        this.mExamBtn.onButtonOut=()=>{ gsap.to(this.mExamBtn.scale,{x:1,y:1,duration:0.5}) }
      
        // 타자 게임 버튼
        this.mGameBtn = new Button( ViewerRscManager.Handle.getResource( this.name, 'game_btn.png').texture );
        this.mGameBtn.setAnchor(0.5, 0.5);
        this.mGameBtn.position.set( this.mExamBtn.x + 150 + this.mGameBtn.width ,this.mLongTextBtn.y);
        this.addChild(this.mGameBtn);
        this.mGameBtn.onButtonOver=()=>{ gsap.to(this.mGameBtn.scale,{x:1.1,y:1.1,duration:0.5}) }
        this.mGameBtn.onButtonOut=()=>{ gsap.to(this.mGameBtn.scale,{x:1,y:1,duration:0.5}) }

        // 배열 순서는 TypeingApp에서 넣어준 순서로 동일하게.
        this.mSceneBtnAry =[
            this.mKeyLocation,
            this.mWordBtn,
            this.mShortTextBtn,
            this.mLongTextBtn,
            this.mExamBtn,
            this.mGameBtn  
        ]

        let cnt = 1; // Intro가 0번이므로 1번부터 시작해야 한다.

        for( const btn of this.mSceneBtnAry) {
            btn.index = cnt;
            btn.addCustomEventListener( EventType.ButtonTab, (evt)=> this.onSceneButtonClick(evt));
            cnt++;
        }
    }

    private onSceneButtonClick( evt: CustomEvent ) {

        const btn = evt.caller as Button;
        this.dispatchEvent(EventType.ReceiveData, btn.index);

    }
}