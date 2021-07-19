import { ObjectBase } from "../core/ObjectBase"
import { EventType } from "../core/EventType"
import { ViewerRscManager } from '../manager/ViewerRscManager'
import Config from '@/Utill/Config';
import gsap from 'gsap';

export class Bee extends PIXI.Sprite{
    public mBeeTween: gsap.core.Tween;
    private mMotionFlag: boolean;

    constructor(x: number,y: number){
        super()
        this.x = x;
        this.y=y;
        this.texture = ViewerRscManager.Handle.getResource('common', `bee.png`).texture;
        this.anchor.set(0.5)
        this.mMotionFlag=true;
        this.randomMotion();
    }

   
    randomMotion(){
        if(!this.mMotionFlag){return;}
        if(this.mBeeTween)this.mBeeTween.kill();
        this.mMotionFlag=false;
        let x= 0;
        let y= 0;
        x = Math.floor(Math.random()*(Config.w - this.width/2));
        y = Math.floor(Math.random()*(Config.h - this.height/2-50 ));
        if( x > this.x )this.scale.x=-1;
        else this.scale.x=1;

        const rDuration = Math.floor( Math.random() * 5 + 3 );
        this.mBeeTween = gsap.to(this,{x:x,y:y,duration:rDuration,ease:"power4"})
        .eventCallback("onComplete",()=>{
            this.mMotionFlag=true;
            this.randomMotion();
        })
    }

    
    clickMotion(evt: PIXI.Point ){
        this.mMotionFlag=false;
        if(this.mBeeTween)this.mBeeTween.kill();
        if(evt.x > this.x )this.scale.x=-1;
        else this.scale.x=1;
        let x= evt.x;
        let y= evt.y;

        if(evt.x < this.width) x = this.width/2;
        if(evt.x > Config.w-this.width) x = Config.w-this.width/2;
        if(evt.y < this.height ) y= this.height/2;
        if(evt.y > Config.h-100) y= Config.h-100;

        const duration = Math.ceil( Math.random()*5 )+10;
        this.mBeeTween = gsap.to(this,{x: x , y: y , duration:duration,ease:"power1"})
        .eventCallback("onComplete",()=>{
            gsap.delayedCall(0.5,()=>{ 
                this.mMotionFlag=true;
                this.randomMotion(); 
            })
        })
    }
    
}

export class Background extends ObjectBase{

    private mMainBg: PIXI.Sprite;
    private mCommonBg: PIXI.Sprite;
    private mGameBg: PIXI.Sprite;

    private mBee: Array<Bee>;

    constructor() {

        super();

        this.mMainBg = new PIXI.Sprite( ViewerRscManager.Handle.getResource( "common", "main_bg.png").texture );
        this.addChild(this.mMainBg);

        this.mCommonBg = new PIXI.Sprite( ViewerRscManager.Handle.getResource( "common", "common_bg.png").texture );
        this.mCommonBg.alpha = 0;
        this.addChild(this.mCommonBg);

        this.mGameBg = new PIXI.Sprite( ViewerRscManager.Handle.getResource( "common", "bg_3.png").texture );
        this.mGameBg.alpha = 0;
        this.addChild(this.mGameBg);

       // this.changeBg(0);
       this.mBee = [];
    }


    private addBee()
    {
        if(this.mBee.length > 0 ) return;

        const beeCount = 4;
        this.mBee = [];
        for(let i=0; i< beeCount; i++){
            const x = Math.floor(Math.random()*Config.w);
            const y = Math.floor(Math.random()*Config.h);
            const bee = new Bee(x,y); 
            this.addChild(bee)
            bee.position.set(x,y)
            this.mBee.push(bee);
        } 
    }

    removeBee()
    {
     
        for( const bee of this.mBee)
        {
            this.removeChild(bee);
            bee.mBeeTween.kill();
        }
        this.mBee = [];
    }

    changeBg( n: number ) {

        gsap.killTweensOf(this.mMainBg);
        gsap.killTweensOf(this.mCommonBg);

        if( n == -1 ) {
            this.removeBee();
            return;
        }

        if( n == 0 ) {
            this.addBee();
            gsap.to( this.mMainBg, { alpha: 1, duration: 0.5});
            gsap.to( this.mCommonBg, { alpha: 0, duration: 0.5});
            gsap.to( this.mGameBg, { alpha: 0, duration: 0.5});
            return;
        } 

        if( n == 1 ) {
            this.addBee();
            gsap.to( this.mMainBg, { alpha: 0, duration: 0.5});
            gsap.to( this.mCommonBg, { alpha: 1, duration: 0.5});
            gsap.to( this.mGameBg, { alpha: 0, duration: 0.5});
            return;
        } 

        if( n == 2 ) {
            this.removeBee();
            gsap.to( this.mMainBg, { alpha: 0, duration: 0.5});
            gsap.to( this.mCommonBg, { alpha: 0, duration: 0.5});
            gsap.to( this.mGameBg, { alpha: 1, duration: 0.5});
            return;
        }
        
    }
}