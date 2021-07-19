import Config from '@/Utill/Config';
import gsap from 'gsap';
import { ObjectBase } from "../core/ObjectBase"
import { SoundManager } from '../manager/SoundManager';
import { LanguageManager } from '../manager/LanguageManager';
import { ViewerRscManager } from '../manager/ViewerRscManager';
import { Button } from '../widget/Button';
import { EventType } from '../core/EventType';
import { CustomEvent } from '../core/CustomEvent'

import { TypeingApp } from '../TypeingApp';
import { SceneBase, SceneName } from '../core/SceneBast';

import { SpaceGame } from '../scene/Game/SpaceGame';
import { ForestGame } from '../scene/Game/ForestGame';

// popup
import { GuidePopup } from '../widget/popup/GuidePopup';
import { RankPopup } from '../widget/popup/RankPopup';
import { OptionPopup } from '../widget/popup/OptionPopup';
import { QuitPopup } from '../widget/popup/QuitPopup';
import { GamePopup } from '../widget/popup/GamePopup';

export class HeaderBtn extends PIXI.Sprite{

    
    private mKorEngOption: boolean;

    constructor(src: string , option?: boolean){
        super();
        
        this.texture = ViewerRscManager.Handle.getResource(`common`,src+".png").texture;
        this.anchor.set(0.5);

        this.interactive = true;
        this.buttonMode = true;
        
        if(option!==undefined){
            this.mKorEngOption = option;
            Config.KorEngMode = this.mKorEngOption;
            if(this.mKorEngOption) this.texture = ViewerRscManager.Handle.getResource(`common`, "kor_btn.png").texture;
            else this.texture = ViewerRscManager.Handle.getResource(`common`, "eng_btn.png").texture;
        }

        this
        .on("pointerover",()=>{ gsap.to(this.scale,{x:1.1,y:1.1, duration:0.5}) })
        .on("pointerout",()=>{ gsap.to(this.scale,{x:1,y:1, duration:0.5}) })
        .on("pointertap",()=>{ this.onClick() })
    }
    onClick(){
        //
    }

    changeLanguage(): Promise<void>{
        return new Promise<void>((resolve,reject)=>{
            if(this.mKorEngOption==undefined){return;}
            this.mKorEngOption = !this.mKorEngOption;
            Config.KorEngMode = this.mKorEngOption;
            if(this.mKorEngOption) this.texture = ViewerRscManager.Handle.getResource(`intro`, "kor_btn.png").texture;
            else this.texture = ViewerRscManager.Handle.getResource(`intro`, "eng_btn.png").texture;
            console.log(`한글설정 인가?=> %c ${Config.KorEngMode}`,"font-weight:bold; border:2px black solid;")
            resolve();
        })
    }
}

export class Header extends ObjectBase {

    //-----------------------------------
    // singleton
    private static _handle: Header;
    static get Handle(): Header { 
        if( Header._handle === undefined ){
            Header._handle = new Header();
        }
        return Header._handle 
    }
    //-----------------------------------

    private mGuideBtn: Button;
    private mRecordBtn: Button;
    private mLangBtn: Button;
    private mOptionBtn: Button;
    private mHomeBtn: Button;
    private mClose: Button;
    private mStateKR: PIXI.Sprite;
    private mStateEN: PIXI.Sprite;

    private mButtonSheet: PIXI.LoaderResource;

    constructor(){
        super();
       
    }

    async init() {


        this.mButtonSheet = ViewerRscManager.Handle.getResource("button", "button.json");

     
        // 학습안내 버튼
        // --------------------------------------------------------------------------------------------------------------------------------
        //this.mGuideBtn = new Button( ViewerRscManager.Handle.getResource('common', 'guide_btn.png').texture);
        this.mGuideBtn = new Button( this.mButtonSheet.textures['guide_btn.png']);

        this.mGuideBtn.position.set(80,70);
        this.mGuideBtn.addCustomEventListener( EventType.ButtonTab, ()=>{
            console.log( TypeingApp.Handle.getCurrentSceneIndex() );
            const popup = new GuidePopup( TypeingApp.Handle.getCurrentSceneIndex());
            TypeingApp.Handle.popupRoot.addChild( popup );
            // this.addChild(popup);
        })
        this.addChild(this.mGuideBtn);


        // 나의 기록 버튼
        // --------------------------------------------------------------------------------------------------------------------------------
        this.mRecordBtn = new Button( this.mButtonSheet.textures['myrecord_btn.png']);
        this.mRecordBtn.position.set(400,70);
        this.mRecordBtn.addCustomEventListener( EventType.ButtonTab, ()=>{
            const popup = new RankPopup();
            TypeingApp.Handle.popupRoot.addChild( popup );
            //this.addChild(popup);
        })
        this.addChild(this.mRecordBtn);

         this.mStateKR = new PIXI.Sprite( this.mButtonSheet.textures['btn_header_state_kr.png'] );
         this.mStateKR.position.set( 400, 70);
         this.addChild( this.mStateKR );

         this.mStateEN= new PIXI.Sprite( this.mButtonSheet.textures['btn_header_state_en.png']);
         this.mStateEN.position.set( 400, 70);
         this.addChild( this.mStateEN );

        // 언어 변경 버튼
        // --------------------------------------------------------------------------------------------------------------------------------
        this.mLangBtn = new Button( 
            this.mButtonSheet.textures['btn_option_kr.png'],
            this.mButtonSheet.textures['btn_option_en.png']
            );
        this.mLangBtn.position.set(1701,70);
        this.mLangBtn.addCustomEventListener( EventType.ButtonTab, ()=>{

            SoundManager.Handle.Effect_CHANGE_LANG();
            this.mLangBtn.selected = !this.mLangBtn.selected;
            LanguageManager.Handle.langFlag = !this.mLangBtn.selected;

        })
        this.addChild(this.mLangBtn);

        // 설정 버튼 
        // --------------------------------------------------------------------------------------------------------------------------------
        this.mOptionBtn = new Button( this.mButtonSheet.textures['btn_header_set.png']);
        this.mOptionBtn.position.set(2091,70);
        this.mOptionBtn.addCustomEventListener( EventType.ButtonTab, ()=>{
            const popup = new OptionPopup();
            TypeingApp.Handle.popupRoot.addChild( popup );
            //this.addChild(popup);
        })
        this.addChild(this.mOptionBtn);

        // 홈 버튼
        // --------------------------------------------------------------------------------------------------------------------------------
        this.mHomeBtn = new Button( this.mButtonSheet.textures['btn_header_home.png']);
        this.mHomeBtn.position.set(2394,70);
        this.mHomeBtn.addCustomEventListener(EventType.ButtonTab, ()=> {
            //  메인 화면으로 돌아간다.
            this.sceneMove( SceneName.Intro );
        });
        this.addChild(this.mHomeBtn); 


        // 클로즈 버튼
        // --------------------------------------------------------------------------------------------------------------------------------
        this.mClose = new Button( this.mButtonSheet.textures['btn_header_close.png']);
        this.mClose.position.set(2394,70);
        this.mClose.addCustomEventListener(EventType.ButtonTab, ()=> {
            this.close();
        });
        this.addChild(this.mClose); 
    }

    public close()
    {

        window.onkeypress = null;
        window.onkeydown = null;
        window.onkeyup = null;
 
        switch( TypeingApp.Handle.getCurrentSceneIndex() ) {

            case SceneName.Intro :
                this.openQuitPopup();
                break;
            case  SceneName.TypingShortText :
                this.sceneMove(SceneName.SelectShortText);
                break;
            case  SceneName.TypingLongText :
                this.sceneMove(SceneName.SelectLongText);
                break;
            case  SceneName.TypingExam :
                this.sceneMove(SceneName.SelectExam);
                break;
            case  SceneName.TypingKeyLocation :
                this.sceneMove(SceneName.SelectKeyLocation);
                 break;
            case  SceneName.TypingWord :
                 this.sceneMove(SceneName.SelectWord);
                 break;
            case  SceneName.SpaceGame :
                this.openGamePopup( TypeingApp.Handle.getScene(SceneName.SpaceGame) );
                //this.sceneMove(SceneName.SelectGame);
                break;
            case  SceneName.ForestGame :
                this.openGamePopup( TypeingApp.Handle.getScene(SceneName.ForestGame) );
                //this.sceneMove(SceneName.SelectGame);
                break;
            default :
                break;
        }  
    }

    private openGamePopup( scene: SceneBase )
    {
        const popup = new GamePopup( scene.index );

        popup.addCustomEventListener( EventType.ReceiveData, (evt: CustomEvent)=> {
            SoundManager.Handle.stopBgmSound();
            this.sceneMove(SceneName.SelectGame);
        })

        if( scene.index == SceneName.SpaceGame ) ( scene as SpaceGame).puaseGame();
        if( scene.index == SceneName.ForestGame ) ( scene as ForestGame).puaseGame();
    }

    private openQuitPopup()
    {
        const popup = new QuitPopup();  
    }

    public sceneMove( idx: number ) {
        this.dispatchEvent( EventType.ReceiveData, idx );
    }

    // 메인 화면 : 학습 안내, 나의 기록, 한글/영어, 설정, 클로즈
    public setMainMode() 
    {

        this.mGuideBtn.visible = true;
        this.mRecordBtn.visible = true;
        this.mLangBtn.visible = true;
        this.mOptionBtn.visible = true;
        this.mHomeBtn.visible = false;
        this.mClose.visible = true;

        this.mStateKR.visible = false;
        this.mStateEN.visible = false;
    }

    // 메인 서브 화면 : 학습 안내, 한글, 홈
    public setSubMode() 
    {
        this.mGuideBtn.visible = true;
        this.mRecordBtn.visible = false;
        this.mLangBtn.visible = false;
        this.mOptionBtn.visible = false;
        this.mHomeBtn.visible = true;
        this.mClose.visible = false;

        if(LanguageManager.Handle.LANG == "kr") 
        {
            this.mStateKR.visible = true;
            this.mStateEN.visible = false;
        } else {
            this.mStateKR.visible = false;
            this.mStateEN.visible = true;
        }
    }

    // 타이핑 화면
    public setTypingMode() 
    {
        this.mGuideBtn.visible = false;
        this.mRecordBtn.visible = false;
        this.mLangBtn.visible = false;
        this.mOptionBtn.visible = false;
        this.mHomeBtn.visible = false;
        this.mClose.visible = true;

        this.mStateKR.visible = false;
        this.mStateEN.visible = false;
    }


    get langBtn(): Button { return this.mLangBtn; }
}