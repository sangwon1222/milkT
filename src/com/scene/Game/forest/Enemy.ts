import { Actor } from '../../../widget/Actor';
import { ViewerRscManager } from '../../../manager/ViewerRscManager';
import { EventType } from '../../../core/EventType';
import { EffectType } from '../component/EffectType';
import { AnimExpo } from '../component/AnimExpo';
//import { AnimCrash } from '../component/AnimCrash';
import gsap from 'gsap';
import { SoundManager } from '@/com/manager/SoundManager';

// forest game enemy
const effectStyle = new PIXI.TextStyle({
    fill: "#00fcff",
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

    private mSbCt: PIXI.Container;
    private mSb: PIXI.Sprite;
    private mText: PIXI.Text;

    private mLabel: string;
    private mType: EffectType;

    public speed: number;
    public way: number;

    public armor: boolean; // 보스 전용 속성

    

    constructor( isEvt: boolean)
    {
        super();
        this.ticker = true;
        this.speed = 0;
        this.way = 0;

        if(isEvt) {
            const rnd = Math.floor(Math.random() * 5) + 1;
            this.mType = rnd;
        } else {
            this.mType = EffectType.Normal;
        }

        this.armor = false;

        this.draw();
    }

    breakArmor( txt: string )
    {
        //
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
        this.mText.x = 170 - ( this.mText.width / 2 );
        this.mText.y = 9;
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

      
        const fAngle = Math.PI / 6;
        const vx = this.speed * Math.cos(fAngle);
        const vy = this.speed * Math.sin(fAngle);

        if (this.way == 0) {
            this.x += (vx) * delta;
            this.y += (vy) * delta;
        }

        if (this.way == 1) {
            this.x -= (vx) * delta;
            this.y += (vy) * delta;
        }


        if (this.way == 2) {
            this.x += (vx) * delta;
            this.y -= (vy) * delta;
        }


        if (this.way == 3) {
            this.x -= (vx) * delta;
            this.y -= (vy) * delta;
        }

        const dis = Math.sqrt(Math.pow( this.x - 1280, 2) + Math.pow( this.y - 800, 2));
        if( dis <= 220) this.dispatchEvent(EventType.CRASH, this);
    }

    setExpo( comboCnt: number )
    {
        SoundManager.Handle.Effect_EXPO();
        const anim = new AnimExpo( comboCnt, 0, 0 );
        this.addChild(anim);
        anim.playAnim();
        this.mBg.visible = false;
        this.mSbCt.visible = false;
    }

    setCrash()
    {
        this.mBg.visible = false;
        this.mSbCt.visible = false;
    }

    setPosition( x: number,y: number,dis: number )
    {
        this.position.set(x,y);

        const fAngle = Math.PI / 6;
        const vx = dis * Math.cos(fAngle);
        const vy = dis * Math.sin(fAngle);

        if (this.way == 0) {
            this.x -= vx;
            this.y -= vy;
        }

        if (this.way == 1) {
            this.x += vx;
            this.y -= vy;
        }

        if (this.way == 2) {
            this.x -= vx;
            this.y += vy;
        }

        if (this.way == 3) {
            this.x += vx;
            this.y += vy;
        }
    }

    setSlimeFace()
    {
        this.mBg.texture = ViewerRscManager.Handle.getResource("forestgame", `slime_${this.way}.png`).texture;
        if( this.way == 0 || this.way == 2) this.mSb.texture = ViewerRscManager.Handle.getResource("forestgame", `sb_left.png`).texture;
        if( this.way == 1 || this.way == 3) this.mSb.texture = ViewerRscManager.Handle.getResource("forestgame", `sb_right.png`).texture

        const sbPos = [[-336,-101],[5,-101],[-336,-101],[5,-101]];
        this.mSbCt.position.set(sbPos[this.way][0], sbPos[this.way][1]);
    }
    

    private draw()
    {
        this.mBg = new PIXI.Sprite(ViewerRscManager.Handle.getResource("forestgame", `slime_${this.way}.png`).texture);
        this.mBg.anchor.set(0.5, 0.5);
        this.mBg.position.set(0,0);
        this.addChild(this.mBg);

        this.mSbCt = new PIXI.Container();
        
        this.mSb = new PIXI.Sprite();
        this.mSbCt.addChild(this.mSb);

        this.mText = new PIXI.Text("");
        this.mSbCt.addChild(this.mText);

        this.addChild(this.mSbCt);
    }
}

