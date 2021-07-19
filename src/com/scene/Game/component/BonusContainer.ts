import { Actor } from '../../../widget/Actor';
import { ViewerRscManager } from '../../../manager/ViewerRscManager';
import { TypeingApp } from '../../../TypeingApp';
import { ObjectBase } from '../../../core/ObjectBase';
import { EventType } from '../../../core/EventType';
import { CustomEvent } from '../../../core/CustomEvent';
import gsap from 'gsap';

export class BonusActor extends Actor {
    private mText: PIXI.Text;
    private mSpr: PIXI.Sprite;
    private mGameIndex: number;
    constructor( gameIndex: number ) {

        super();

        let gameName: string;

        this.mGameIndex = gameIndex;

        if(gameIndex == 0) gameName = "spacegame";
        if(gameIndex == 1) gameName = "forestgame";

        this.position.set(TypeingApp.Handle.appWidth, 338);
        this.mSpr = new PIXI.Sprite( ViewerRscManager.Handle.getResource( gameName, "bonus.png").texture);
        this.addChild(this.mSpr);

        const spacestyle = new PIXI.TextStyle({
            fill: "#101010",
            fontFamily: "NanumGothicBold",
            fontSize: 60
        });
        const foreststyle = new PIXI.TextStyle({
            fill: "#ffffff",
            fontFamily: "NanumGothicBold",
            fontSize: 60
        });



        this.mText = new PIXI.Text( "");
        if(gameIndex == 0) {
            this.mText.position.set(250, 64);
            this.mText.style = spacestyle;
        }
        if(gameIndex == 1) {
            this.mText.position.set(200, 8);
            this.mText.style = foreststyle;
        }
        this.addChild(this.mText);
    }

    

    showBonus()
    {
        this.position.set(TypeingApp.Handle.appWidth, 338);
        this.ticker = true;
    }

    setText( txt: string)
    {
        this.mText.text = txt;

        if( this.mGameIndex == 1 )
        {
            this.mText.x =  ( 162 -(this.mText.width / 2) ) + 176;
        }
    }

    onUpdate( delta: number ) {

        this.x -= 14 * delta;

        if( this.x + this.width < 0 ) this.ticker = false;
    }
}


export class BonusContainer extends ObjectBase
{
    private mBonusAcotr: BonusActor;
    private mText: string;
    private mLevel: number;
    private mWordData: Array<string>;

    constructor( gameIndex: number)
    {
        super();
        this.mBonusAcotr = new BonusActor( gameIndex );
        this.mBonusAcotr.visible = false;
        this.addChild(this.mBonusAcotr);
    }

    setData( $data: any )
    {
        //this.clearContainer();
        this.mWordData = [];
        this.mWordData = $data.wordData;
        this.mLevel = $data.level;
    }

    clearContainer()
    {
        this.mWordData = [];
        this.mBonusAcotr.removeTicker();
        this.removeChild(this.mBonusAcotr);
    }

    pause()
    {
        this.mBonusAcotr.ticker = false;
    }

    resume()
    {
        if( this.mBonusAcotr.visible ) this.mBonusAcotr.ticker = true;
    }

    matchText(txt: string) {

        // ********** 210324 0240 김태신 과장 요청에 의한 수정 ***********
        // if(txt == this.mText)
        if(txt == this.mText && this.x + this.width > 0 && this.x < TypeingApp.Handle.appWidth)
        {
            this.hitBonus();
            this.dispatchEvent(EventType.RecieveScore, 2000);
        }
    }

    showBonus()
    {
        if(this.mBonusAcotr.ticker) return;
        const rnd = Math.floor(Math.random() * 5);
        let str: string;
        if( this.mLevel < 7 )
        {
            str = this.mWordData[rnd + 34];
        } else {
            str = this.mWordData[rnd + 54];
        }

        this.mBonusAcotr.setText( str );
        this.mText = str;

        this.mBonusAcotr.visible = true;
        this.mBonusAcotr.showBonus();   
    }

    getText(): string
    {
        return this.mText;
    }

    private hitBonus()
    {

        

        const style = new PIXI.TextStyle({
            fill: "#ffe001",
            fontFamily: "NanumGothicBold",
            fontWeight: "normal",
            fontSize: 60,
        });

        const txt = new PIXI.Text("+2000", style);
        txt.position.set(this.mBonusAcotr.x, this.mBonusAcotr.y);
        const ypos = this.mBonusAcotr.y + 20; 
        gsap.to( txt, { duration:1, alpha:0, y: ypos})
        .eventCallback("onComplete", ()=> {
            this.removeChild(txt);
        });

        this.mBonusAcotr.ticker = false;
        this.mBonusAcotr.visible = false;
        this.mBonusAcotr.position.set(TypeingApp.Handle.appWidth, 338);

        this.addChild(txt);
    }
}