import { ObjectBase } from '../../../core/ObjectBase';
import { TypeingApp } from '../../../TypeingApp';
import { ViewerRscManager } from '../../../manager/ViewerRscManager';
import { SoundManager } from '../../../manager/SoundManager';
import { EventType } from '../../../../com/core/EventType';


import gsap from 'gsap';


export class StartPopup extends ObjectBase {

    private mLevel: PIXI.Text;

    private mReady: PIXI.Sprite;
    private mSet: PIXI.Sprite;
    private mGo: PIXI.Sprite;

    private mPosX: number;
    private mPosY: number;

    private delayedCallSnd: gsap.core.Tween;

    private mCommonSheet: PIXI.LoaderResource;

    constructor() {

        super();

        this.mCommonSheet = ViewerRscManager.Handle.getResource("game", "game_common.json");

        const dimmed = new PIXI.Graphics();
        dimmed.beginFill(0x000000,0.8);
        dimmed.drawRect(0,0, TypeingApp.Handle.appWidth, TypeingApp.Handle.appHeight );
        dimmed.endFill();
        this.addChild(dimmed);
        dimmed.interactive = true;

        this.visible = false;

        this.mPosX = TypeingApp.Handle.appWidth / 2;
        this.mPosY = TypeingApp.Handle.appHeight / 2 -50;


        const style = new PIXI.TextStyle({
            fill: "#ffe001",
            fontFamily: "TmoneyRoundWindExtraBold",
            fontSize: 200,
            stroke: "#002632",
            strokeThickness: 20
        });

        this.mLevel = new PIXI.Text("",style);
        this.mReady = new PIXI.Sprite( this.mCommonSheet.textures[`ready.png`] );
        this.mSet = new PIXI.Sprite( this.mCommonSheet.textures[`set.png`] );
        this.mGo = new PIXI.Sprite( this.mCommonSheet.textures[`go.png`] );

        this.mReady.anchor.set(0.5, 0.5);
        this.mSet.anchor.set(0.5, 0.5);
        this.mGo.anchor.set(0.5, 0.5);

        this.mLevel.alpha = 0;
        this.mReady.alpha = 0;
        this.mSet.alpha = 0;
        this.mGo.alpha = 0;

        this.addChild(this.mLevel);
       
        this.addChild(this.mReady);
        this.addChild(this.mSet);
        this.addChild(this.mGo);

        


    }

    clearContainer()
    {
        gsap.killTweensOf(this.mReady);
        gsap.killTweensOf(this.mSet);
        gsap.killTweensOf(this.mGo);
        this.delayedCallSnd.kill();
    }

    killTweens()
    {
        gsap.killTweensOf(this.mReady);
        gsap.killTweensOf(this.mSet);
        gsap.killTweensOf(this.mGo);
        this.delayedCallSnd.kill();
    }

    showPopup( level: number) {

        TypeingApp.Handle.getHeader().visible = false;
        this.visible = true;

        this.delayedCallSnd = gsap.delayedCall( 0.5, ()=>{
        this.mLevel.scale.set(1,1);
        this.mLevel.text = `${level + 1} 단계`;
        this.mLevel.pivot.set( this.mLevel.width / 2, this.mLevel.height / 2);
        this.mLevel.position.set( this.mPosX, this.mPosY + 20);
   
        gsap.to( this.mLevel.scale, {duration:0.5, x:1.0, y:1.0,});
        gsap.to( this.mLevel, {duration:0.5, alpha:1, y: this.mPosY});

        gsap.to( this.mLevel.scale, {delay: 0.5, duration:0.5, x:1.5, y:1.5,});
        gsap.to( this.mLevel, {delay: 1, duration:0.5, alpha:0 })
        .eventCallback( "onComplete", ()=> this.playReady());
        });
    }


    private playReady()
    {
        SoundManager.Handle.Effect_READY();
        this.mReady.position.set( this.mPosX, this.mPosY);
        this.mReady.scale.set(0.5, 0.5);

        gsap.to( this.mReady.scale, {duration:0.5, x:1.0, y:1.0,});
        gsap.to( this.mReady, {duration:0.5, alpha:1 });

        gsap.to( this.mReady.scale, {delay: 1, duration:0.5, x:2, y:2,});
        gsap.to( this.mReady, {delay: 0.5, duration:0.5, alpha:0 })
        .eventCallback( "onComplete", ()=> this.playSet());
    }

    private playSet()
    {
        SoundManager.Handle.Effect_SET();

        this.mSet.position.set( this.mPosX, this.mPosY);
        this.mSet.scale.set(0.5, 0.5);

        gsap.to( this.mSet.scale, {duration:0.5, x:1.0, y:1.0,});
        gsap.to( this.mSet, {duration:0.5, alpha:1 });

        gsap.to( this.mSet.scale, {delay: 1, duration:0.5, x:2, y:2,});
        gsap.to( this.mSet, {delay: 0.5, duration:0.5, alpha:0 })
        .eventCallback( "onComplete", ()=> this.playGo());
    }

    private playGo()
    {
        SoundManager.Handle.Effect_GO();
        this.mGo.position.set( this.mPosX, this.mPosY);
        this.mGo.scale.set(0.5, 0.5);
        gsap.to( this.mGo.scale, {duration:0.5, x:1.0, y:1.0,});
        gsap.to( this.mGo, {duration:0.5, alpha:1 });

        gsap.to( this.mGo.scale, {delay: 1, duration:0.5, x:2, y:2,});
        gsap.to( this.mGo, {delay: 0.5, duration:0.5, alpha:0 })
        .eventCallback( "onComplete", ()=> {
            this.visible = false;
            TypeingApp.Handle.getHeader().visible = true;
            this.dispatchEvent( EventType.RecieveGameStart);
           // (this.parent as Engine).gamePlay() 
        });
    }
}