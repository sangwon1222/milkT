import { Actor } from '../../../widget/Actor';
import { ViewerRscManager } from '../../../manager/ViewerRscManager';
import { SoundManager } from '../../../manager/SoundManager';
import { EventType } from '../../../core/EventType';
import { EffectType } from '../component/EffectType';
import { AnimExpo } from '../component/AnimExpo';
import { AnimCrash } from '../component/AnimCrash';
import gsap from 'gsap';



// space game enemy

const effectStyle = new PIXI.TextStyle({
    fill: "#ff0101",
    fontFamily: "NanumGothicBold",
    fontSize: 60
});

const normalStyle = new PIXI.TextStyle({
    fill: "#000000",
    fontFamily: "NanumGothicBold",
    fontSize: 60
});

export class Enemy extends Actor
{
    private mBg: PIXI.Sprite;
    private mText: PIXI.Text;
    private mLabel: string;
    private mType: EffectType;

    public speed: number;

    constructor( isEvt: boolean)
    {
        super();
        this.ticker = true;
        this.speed = 0;

        if(isEvt) {
            const rnd = Math.floor(Math.random() * 5) + 1;
            this.mType = rnd;
        } else {
            this.mType = EffectType.Normal;
        }

        this.draw();
    }


    setText( txt: string)
    {
        this.mLabel = txt;
        this.mText.text = this.mLabel;
        if( this.mType == EffectType.Normal) 
        {
            this.mText.style = normalStyle;
        } else {
            this.mText.style = effectStyle;
        }
       
        this.mText.x = 218 - ( this.mText.width / 2 );
        this.mText.y = 6;
    }

    getText(): string 
    {
        return this.mLabel;
    }

    getType(): EffectType
    {
        return this.mType;
    }

    onUpdate(delta: number) {

        this.y += this.speed * delta;
        if (this.y >= 1300) {
            this.dispatchEvent(EventType.CRASH, this);
        }
    }

    setExpo( comboCnt: number )
    {
        SoundManager.Handle.Effect_EXPO();
        const anim = new AnimExpo( comboCnt, this.width/ 2, 0 );
        this.addChild(anim);
        anim.playAnim();

        this.mBg.visible = false;
        this.mText.visible = false;
    }

    setCrash()
    {
        const anim = new AnimCrash( this.width/ 2, 83 );
        this.addChild(anim);
        anim.playAnim();

        this.mBg.visible = false;
        this.mText.visible = false;
    }
    

    private draw()
    {
        this.mBg = new PIXI.Sprite(ViewerRscManager.Handle.getResource("spacegame", "rain_bg.png").texture);
        this.mBg.y = -83;
        this.addChild(this.mBg);

        this.mText = new PIXI.Text("");
        this.addChild(this.mText);
    }
}

