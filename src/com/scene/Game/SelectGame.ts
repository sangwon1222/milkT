import { TypeingApp } from '../../TypeingApp';
import { SceneBase, SceneName } from '../../core/SceneBast';
import { ViewerRscManager } from '../../manager/ViewerRscManager';
import { EventType } from "../../core/EventType";
import { CustomEvent} from '../../core/CustomEvent';
import gsap from 'gsap';
import { Sine } from 'gsap';

import { Button } from '../../../com/widget/Button';
import { SpaceGame } from './SpaceGame';
import { ForestGame } from './ForestGame';
import { LevelPopup } from '../../widget/popup/LevelPopup';
import Config from '../../../Utill/Config'

export class SelectGame extends SceneBase 
{
    private DATA: any;

    private mSpaceGameBtn: Button;
    private mForestGameBtn: Button;

    private mButtonSheet: PIXI.LoaderResource;

    private mForestSign: PIXI.Sprite;
    private mSpaceSign: PIXI.Sprite;

    private mCh2: PIXI.Sprite;

    private mTimeLineOne: gsap.core.Timeline;
    private mTimeLineTwo: gsap.core.Timeline;

    constructor() {
        super();
        this.name = "SelectGame";
        this.visible = false;
    }

    async onInit(){

        // 헤더 상태 설정
        TypeingApp.Handle.getHeader().setSubMode();
        // 언어 상태와 데이타 값을 가져온다.
       // this.DATA = await DataManager.Handle.getData( "word", LanguageManager.Handle.LANG);

       this.mButtonSheet = ViewerRscManager.Handle.getResource("button", "button.json");
    }

    async onStart(){
        this.draw();
        this.visible = true;
    }

    async onEnd()
    {
        gsap.killTweensOf( this.mForestSign);
        gsap.killTweensOf( this.mSpaceSign );
        gsap.killTweensOf( this.mCh2 );

        this.mTimeLineOne.kill();
        this.mTimeLineTwo.kill();
    }

    private draw() 
    {

        const title = new PIXI.Sprite(ViewerRscManager.Handle.getResource("game", "title.png").texture);
        title.position.set(852, 247);
        this.addChild(title);

        const script = new PIXI.Sprite(ViewerRscManager.Handle.getResource("game", "script.png").texture);
        script.position.set(784, 504);
        this.addChild(script);

        const stick = new PIXI.Sprite(ViewerRscManager.Handle.getResource("game", "forest_stick.png").texture);
        stick.position.set(625, 868);
        this.addChild(stick);

       this.mForestSign = new PIXI.Sprite( ViewerRscManager.Handle.getResource("game", "forest_sign.png").texture );
       this.mForestSign.anchor.set(0.5, 0.5);
       this.mForestSign.position.set(668, 1017);
       gsap.to( this.mForestSign.scale, { duration:1.2, x:1.1, y:1.1, repeat:-1, yoyo:true});
       this.addChild(this.mForestSign);


       this.mSpaceSign = new PIXI.Sprite( ViewerRscManager.Handle.getResource("game", "space_sign.png").texture );
       this.mSpaceSign.anchor.set(0.5, 0.5);
       this.mSpaceSign.position.set(2095, 566);
       gsap.to( this.mSpaceSign.scale, { duration:1.2, x:1.05, y:1.05, repeat:-1, yoyo:true});
       this.addChild(this.mSpaceSign);


        this.mSpaceGameBtn = new Button( this.mButtonSheet.textures['btn_tr.png'] );
        this.mSpaceGameBtn.width = 600;
        this.mSpaceGameBtn.height = 500;

        this.mSpaceGameBtn.addCustomEventListener( EventType.ButtonTab, ()=> {
            const popup = new LevelPopup(0);
            popup.addCustomEventListener( EventType.ReceiveData, (evt: CustomEvent)=> { 

                const scene = (TypeingApp.Handle.getScene( SceneName.SpaceGame ) as SpaceGame);
                (TypeingApp.Handle.getScene( SceneName.SpaceGame ) as SpaceGame).startLevel = evt.data.level;
                this.dispatchEvent(EventType.ReceiveData, SceneName.SpaceGame); 
            }); 
        })

        this.mSpaceGameBtn.position.set(1796,332);
        this.addChild( this.mSpaceGameBtn);

        //----------------------------------------------------------------------------

        this.mForestGameBtn = new Button(this.mButtonSheet.textures['btn_tr.png']);
        
        this.mForestGameBtn.addCustomEventListener( EventType.ButtonTab, ()=> {
            const popup = new LevelPopup(1);
            popup.addCustomEventListener( EventType.ReceiveData, (evt: CustomEvent)=> { 

                const scene = (TypeingApp.Handle.getScene( SceneName.ForestGame ) as ForestGame);
                (TypeingApp.Handle.getScene( SceneName.ForestGame ) as ForestGame).startLevel = evt.data.level;
                this.dispatchEvent(EventType.ReceiveData, SceneName.ForestGame) 
            });
        })

        
        this.mForestGameBtn.position.set(374, 886);
        this.mForestGameBtn.width = 586;
        this.mForestGameBtn.height = 700;

       

        this.addChild( this.mForestGameBtn);


        const ch0 = new PIXI.Sprite(ViewerRscManager.Handle.getResource("game", "ch_0.png").texture);
        ch0.anchor.set(0.5,0);
        ch0.position.set(885, 1118);
        this.addChild(ch0);

        this.mTimeLineTwo = gsap.timeline({repeat: -1, repeatDelay: 2});
        this.mTimeLineTwo.to(ch0.scale, {x: 1, duration: 0});
        this.mTimeLineTwo.to(ch0, {x: 900, duration: 3});
        this.mTimeLineTwo.to(ch0.scale, {x: -1, duration: 0});
        this.mTimeLineTwo.to(ch0, {x: 885, duration: 3});
        this.mTimeLineTwo.play();

        const ch1 = new PIXI.Sprite(ViewerRscManager.Handle.getResource("game", "ch_1.png").texture);
        ch1.anchor.set(0.5,0);
        ch1.position.set(480, 1184);
       // gsap.to( ch1, { duration:1, x:400, repeat:-1, yoyo:true, ease:Sine.easeInOut});
        this.addChild(ch1);

        this.mTimeLineOne = gsap.timeline({repeat: -1, repeatDelay: 2});
        this.mTimeLineOne.to(ch1.scale, {x: 1, duration: 0});
        this.mTimeLineOne.to(ch1, {x: 500, duration: 2});
        this.mTimeLineOne.to(ch1.scale, {x: -1, duration: 0});
        this.mTimeLineOne.to(ch1, {x: 480, duration: 2});
        this.mTimeLineOne.play();

        this.mCh2 = new PIXI.Sprite(ViewerRscManager.Handle.getResource("game", "ch_2.png").texture);
        this.mCh2.position.set(1829, 616);
        gsap.to( this.mCh2, { duration:1, y:636, repeat:-1, yoyo:true, ease:Sine.easeInOut});
        this.addChild(this.mCh2);

    }
}