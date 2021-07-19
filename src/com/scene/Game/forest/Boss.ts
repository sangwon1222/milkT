import { Actor } from '../../../widget/Actor';
import { ViewerRscManager } from '../../../manager/ViewerRscManager';
import { SoundManager } from '../../../manager/SoundManager';
import { EventType } from '../../../core/EventType';
import { EffectType } from '../component/EffectType';
import { AnimExpo } from '../component/AnimExpo';
import { AnimCrash } from '../component/AnimCrash';
import gsap from 'gsap';


// forest game enemy
const normalStyle = new PIXI.TextStyle({
    fill: "#ffffff",
    fontFamily: "NanumGothicBold",
    fontSize: 60
});

class SBubble extends PIXI.Container
{
    private mText: PIXI.Text;
    private mBg: PIXI.Sprite;

    constructor()
    {
        super();
        this.mBg = new PIXI.Sprite( ViewerRscManager.Handle.getResource("forestgame", `boss_sb.png`).texture );
        this.addChild( this.mBg );

        this.mText = new PIXI.Text("", normalStyle);
        this.mBg.addChild(this.mText);
    }

    setText( txt: string )
    {
        this.mText.text = txt;
        this.mText.position.set( 170 - this.mText.width / 2, 10);
    }

    getText(): string
    {
        return this.mText.text;
    }
}

export class Boss extends Actor
{
    private mBg: PIXI.Sprite;

    private mSbCt: PIXI.Container;
    private mText: PIXI.Text;

    private mTail: PIXI.Sprite;

    private mLabel: string;
    private mType: EffectType;

    public speed: number;
    public way: number;

    public armor: boolean;

    constructor()
    {
        super();
        this.ticker = true;
        this.speed = 0;
        this.way = 0;

        // ********** 210323 0340 김태신 과장 요청에 의한 수정 ***********
        // const rnd = Math.floor(Math.random() * 5) + 1;
        // this.mType = rnd;
        this.mType = EffectType.Normal;

        this.armor = true;

        this.draw();
    }

    breakArmor( txt: string )
    {
        this.removeTxt(txt);
        const len = this.mSbCt.children.length;

        if( len == 1)
        {
            this.armor = false;
            const child = this.mSbCt.children[0] as SBubble;
            this.mLabel = child.getText();
        }
    }


    setText( txtAry: Array<string> )
    {
        for( let i=0; i<3; i++)
        {
            const sb = new SBubble();
            sb.setText( txtAry[i] );
            this.mSbCt.addChild(sb);
        }

        this.setTextPostion();
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
        const anim = new AnimExpo( comboCnt, this.width/ 2, 0 );
        this.addChild(anim);
        anim.playAnim();

        this.mTail.visible = false;
        this.mBg.visible = false;
        this.mSbCt.visible  = false;
    }

    setCrash()
    {
        this.mTail.visible = false;
        this.mBg.visible = false;
        this.mSbCt.visible  = false;
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
        this.mBg.texture = ViewerRscManager.Handle.getResource("forestgame", `boss_${this.way}.png`).texture

        
        if( this.way == 0 || this.way == 2) 
        {
            this.mTail.texture = ViewerRscManager.Handle.getResource("forestgame", `boss_sb_left_tail.png`).texture;
            this.mTail.position.set( -150, 8); //265
        } 

        if( this.way == 1 || this.way == 3)  
        {
            this.mTail.texture = ViewerRscManager.Handle.getResource("forestgame", `boss_sb_right_tail.png`).texture
            this.mTail.position.set( 50, 8); //48
        } 
        

        this.setTextPostion();
    }

    private removeTxt( txt: string)
    {
        for( let i = this.mSbCt.children.length - 1; i >= 0; i--)
        {
            const child = this.mSbCt.children[i] as SBubble;
            if( txt == child.getText())
            {
                SoundManager.Handle.Effect_EXPO();
                this.mSbCt.removeChild( child );
                this.setTextPostion();
                return;
            }
        }  
    }
    
    private draw()
    {
        this.mTail = new PIXI.Sprite();
        this.addChild(this.mTail);

        this.mSbCt = new PIXI.Container();
        this.addChild(this.mSbCt);

        this.mBg = new PIXI.Sprite(ViewerRscManager.Handle.getResource("forestgame", `boss_${this.way}.png`).texture);
        this.mBg.anchor.set(0.5, 0.5);
        this.mBg.position.set(0,0);
        this.addChild(this.mBg);
    }

    private setTextPostion()
    {
        let posY = 0;
        for( let i = this.mSbCt.children.length - 1; i >= 0; i--)
        {
            const child = this.mSbCt.children[i] as SBubble;
            child.y = posY;
            posY += 97;
        } 
        
        const sbPos = [-404,60,-404,60];
        this.mSbCt.pivot.set(0, this.mSbCt.height);
        this.mSbCt.position.set(sbPos[this.way], 14);
    }
}
