import Config from "@/Utill/Config";
import gsap from "gsap";
import { ViewerRscManager } from "../manager/ViewerRscManager";

export class ClosePop extends PIXI.Graphics{
    private mPopSprite: PIXI.Sprite;
    constructor(sprite: string){
        super();
        this.beginFill(0x000000,0.8);
        this.drawRect(0,0,Config.w,Config.h);
        this.endFill();
        this.interactive = true;
        this.on("poinertap",(evt: PointerEvent)=>{ evt.stopPropagation(); })

        //this.alpha=0;

        this.mPopSprite = new PIXI.Sprite(ViewerRscManager.Handle.getResource("common", `${sprite}.png` ).texture);
        this.mPopSprite.anchor.set(0.5);
        this.mPopSprite.position.set(Config.w/2,Config.h/2);
        this.addChild(this.mPopSprite);

        // if(sprite==`exit_pop` || sprite==`game_exit_pop` ){ this.createClosePop(); }
        if(sprite==`game_result_pop`){ this.createGamePop(); }
        else { this.createClosePop(); } 

       // gsap.to(this,{alpha:1,duration:0.2})
    }

    createClosePop(){
        const yes = new PIXI.Sprite(ViewerRscManager.Handle.getResource("common","yes.png").texture);
        const no = new PIXI.Sprite(ViewerRscManager.Handle.getResource("common","no.png").texture);
        yes.anchor.set(0.5);
        no.anchor.set(0.5);
        yes.position.set(220,140);
        no.position.set(-220,140);
        this.mPopSprite.addChild(yes,no)
        yes.interactive = true;
        no.interactive = true;
        yes.buttonMode = true;
        no.buttonMode = true;
        yes.on("pointertap",()=>{  this.exit(); })
        no.on("pointertap",()=>{  this.back(); })
    }

    createGamePop(){
        const again = new PIXI.Sprite(ViewerRscManager.Handle.getResource(`common`,"again.png").texture)
        again.anchor.set(0.5)
        again.position.set(-220 , 300)
        again.interactive = true;
        again.buttonMode = true;

        const exit = new PIXI.Sprite(ViewerRscManager.Handle.getResource(`common`,"exit.png").texture)
        exit.anchor.set(0.5)
        exit.position.set( 220 , 300);
        exit.interactive = true;
        exit.buttonMode = true;

        again.on("pointertap",()=>{ this.again(); })
        exit.on("pointertap",()=>{ this.exit(); })

        this.mPopSprite.addChild(again , exit)
    }

    again(){/** */}
    back(){ /** */}
    exit(){/** */ }
}