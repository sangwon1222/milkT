// 라이브러리
import WebFont from 'webfontloader';
import PIXISound from 'pixi-sound';
//core
import { App } from '../com/core/App';
import { SceneBase, SceneName } from '../com/core/SceneBast';
import { EventType } from '../com/core/EventType';
import { CustomEvent } from '../com/core/CustomEvent'
// Header
import { Header } from '../com/widget/Header';
// Scene
import { Start } from '../com/scene/Start'

import { Intro } from '../com/scene/Intro';

import { SelectKeyLocation } from '../com/scene/KeyLocation/SelectKeyLocation';
import { TypingKeyLocation } from '../com/scene/KeyLocation/TypingkeyLocation';

import { SelectWord } from '../com/scene/Word/SelectWord';
import { TypingWord } from '../com/scene/Word/TypingWord';

import { SelectShortText } from './scene/ShortText/SelectShortText';
import { TypingShortText } from './scene/ShortText/TypingShortText';

import { SelectLongText } from './scene/LongText/SelectLongText';
import { TypingLongText } from './scene/LongText/TypingLongText';

import { SelectExam } from './scene/Exam/SelectExam';
import { TypingExam } from './scene/Exam/TypingExam';

import { SelectGame } from './scene/Game/SelectGame';
import { SpaceGame } from './scene/Game/SpaceGame';
import { ForestGame } from './scene/Game/ForestGame';


//Bg
import { Background } from '../com/widget/Background';
// Manager
import { SoundManager } from '../com/manager/SoundManager';
import { ViewerRscManager } from '../com/manager/ViewerRscManager';
import { DataManager } from '../com/manager/DataManager';
import Config from '@/Utill/Config';

import { Loader } from '../com/widget/Loader';



export class TypeingApp extends App{

    //-----------------------------------
    // singleton
    private static _handle: TypeingApp;
    static get Handle(): TypeingApp { return TypeingApp._handle }
    //-----------------------------------

    private mSceneAry: Array <SceneBase>;
    private mPrevIdx: number; // 이전씬 index
    private mCurrentIdx: number; // 현재씬 index

    private mBackground: Background;

    private mHeader = new Header();

    private mLoader = new Loader();


    constructor( canvas: HTMLCanvasElement ) {

        super( canvas );
        TypeingApp._handle = this;
        this.startPage();
    }

    private async startPage()
    {
        await this.getQuery();

        const viewerJson = await ViewerRscManager.Handle.getJSON();
        await ViewerRscManager.Handle.loadPointResource( "button", viewerJson.data );
        await ViewerRscManager.Handle.loadPointResource( "popup", viewerJson.data );

        const startScene = new Start();
        startScene.addCustomEventListener("startClick", ()=>{

            this.sceneRoot.removeChild( startScene );
            this.firstInit();
        });
        await startScene.onInit();
        await startScene.onStart();
        this.sceneRoot.addChild( startScene );

        //this.firstInit();
    }

    private async firstInit()
    {
        this.mPrevIdx = 0;
        this.mCurrentIdx = 0;


        // 씬 생성
        this.mSceneAry = [];
        this.addScene( new Intro()); // 메인
        this.addScene( new SelectKeyLocation()); // 자리 연습 선택 화면
        this.addScene( new SelectWord()); // 낱말연습
        this.addScene( new SelectShortText()); // 짧은글 선택 화면
        this.addScene( new SelectLongText()); // 긴글 연습 선택 화면
        this.addScene( new SelectExam()); // 타자검정 선택 화면
        this.addScene( new SelectGame()); // 게임 선택 화면
        
        this.addScene( new TypingShortText()); // 짧은글 타이핑 화면
        this.addScene( new TypingLongText()); // 긴글 타이핑 화면
        this.addScene( new TypingExam()); // 타자 검정 타이핑 화면
        this.addScene( new TypingKeyLocation()); // 자리 연습 타이핑 화면
        this.addScene( new TypingWord()); // 낱말 연습 타이핑 화면
        this.addScene( new SpaceGame() ); // 우주 게임
        this.addScene( new ForestGame() ); // 숲속 게임

        for( let i = 0; i < this.mSceneAry.length; i++) {
            const scene = this.mSceneAry[i];
            scene.index = i;
            // 메인단과의 통신을 위한 이벤트
            scene.addCustomEventListener(EventType.ReceiveData, (evt)=> this.receiveScene(evt) );
        }
        this.startApp();

    }



    // 생성자에서 호출하는 최초 실행 함수
    private async startApp(){

       // console.log( "App start ");

        this.loaderRoot.addChild( this.mLoader);
        await this.onSharedPreferences();

        this.mLoader.clear();
        this.loaderRoot.removeChild( this.mLoader);

        //Bg 생성
        this.mBackground = new Background();
        this.bgRoot.addChild(this.mBackground);

        this.addNavi();
        this.goScene( this.mCurrentIdx );
    }

    loading(){
        const bg = new PIXI.Graphics();
        bg.beginFill(0x000000,0.4);
        bg.drawRect(0,0,Config.w,Config.h)
        bg.endFill();
        this.stage.addChild(bg);
    }

    // 공유 기본 설정
    private async onSharedPreferences(){

        const viewerJson = await ViewerRscManager.Handle.getJSON();

        await ViewerRscManager.Handle.loadResource( viewerJson.data );

        await this.loadJsFile('js/pixiTextInput.js');
        await this._fontLoading();
        PIXISound.stopAll();
    }

    // 해당 씬으로 전환
    private async goScene( pIdx: number ) {

        if(pIdx == SceneName.Intro ) {
            this.mBackground.changeBg(0);
        } else if ( pIdx == SceneName.SelectGame ) {
            this.mBackground.changeBg(2);
        } else if ( pIdx == SceneName.SelectKeyLocation ||  pIdx == SceneName.SelectWord || 
            pIdx == SceneName.SelectShortText || pIdx == SceneName.SelectLongText || pIdx == SceneName.SelectExam ) {
            this.mBackground.changeBg(1);
        } else {
            this.mBackground.changeBg(-1);
        }
        

        this.mPrevIdx =  this.mCurrentIdx;
        this.mCurrentIdx = pIdx;

       // PIXISound.stopAll();
  
        let scene: SceneBase;
        // 기존씬 초기화 작업
         if( this.mPrevIdx != pIdx) {
            scene = this.mSceneAry[this.mPrevIdx];
            scene.hide();
            await scene.onEnd();
            scene.removeChildren();
            this.sceneRoot.removeChildren();
        }

        // 현재씬
        scene = this.mSceneAry[this.mCurrentIdx];
        //console.log(`CurrentScene = ${scene.name}`)
        this.sceneRoot.addChild( scene );
        await scene.onInit();
        await scene.onStart();
        scene.show();
    }

    getScene( idx: number)
    {
        return this.mSceneAry[idx];
    }

    // 네비 추가
    private async addNavi() {
        this.mHeader = new Header();
        this.mHeader.addCustomEventListener( EventType.ReceiveData, (evt: CustomEvent )=> this.receiveScene(evt));
        await this.mHeader.init();
        this.naviRoot.addChild( this.mHeader );
    }
    getHeader(): Header { return this.mHeader; }

    getCurrentSceneIndex(): number { return this.mCurrentIdx; }

    // 씬 추가
    private addScene( pScene: SceneBase) {
        pScene.index = this.mSceneAry.length;
        //console.log( pScene.name, pScene.index);
        this.mSceneAry.push( pScene );
    }

    // 씬에서 메인단으로 전송하는 이벤트를 받는 함수
    private receiveScene( evt: CustomEvent ) {
        const sceneIndex = evt.data;
        this.goScene(sceneIndex);
        SoundManager.Handle.BGM_Main();
    }

    // JS 로딩 
    private async loadJsFile( src: string): Promise < void >  {
        return new Promise < void > ( (resolve, reject) => {
            const themejs = document.createElement('script');
            themejs.setAttribute('src', src);
            document.head.appendChild(themejs) 
            themejs.onload = ()=> { 
                resolve(); 
            }
        });
    }

    // 쿼리 로딩
    private async getQuery(){
        //var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href
        const url = new URL(document.location.href);
        const param = url.searchParams.get("json") as any;
        const data = JSON.parse(`${param}`);

        if( data != null) {
            Config.strWebDns = data.strWebDns;
            Config.strUserID = data.strUserID;
            Config.strName = data.strName;
            Config.strGrade = data.strGrade;
            //console.log(data);
            /*
            TypeingApp.Handle.AddOnScreenDebugMessage( 
                `strWebDns = ${Config.strWebDns}\nstrUserID = ${Config.strUserID}\nstrName = ${Config.strName}\nstrGrade = ${Config.strGrade}`
            );*/
        }
    }

    // Font 로딩
    private _fontLoading(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            WebFont.load({
            custom: {
              families: ["NanumGothic","NanumGothicBold", "TmoneyRoundWindExtraBold", "BMJUA"],
              urls: ["fonts/fonts.css"],
            },
            active: () => {
                // console.log(" font loaded");
                resolve();
            },
            fontloading: (fontname) => {
                // console.log("fontLoading", fontname);
                resolve();
            },
            });
        });
    }
    //--------------------End
}

