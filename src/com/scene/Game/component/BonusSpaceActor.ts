import { Actor } from '../../../widget/Actor';
import { ViewerRscManager } from '../../../manager/ViewerRscManager';
import { SoundManager } from '../../../manager/SoundManager';
import { TypeingApp } from '../../../TypeingApp';
//import { SpaceGameEngine } from '../SpaceGame';
import { EffectType } from './EffectType';


export class BonusSpaceActor extends Actor {


    private mText: PIXI.Text;
    private mSpr: PIXI.Sprite;

    private mYvalue: number;
    private mAlive: boolean;
    private mType: EffectType;

    constructor( txt: string ) {

        super();

        this.mAlive = true;
        this.mType = 0;
        this.position.set(TypeingApp.Handle.appWidth, 338);

        this.mSpr = new PIXI.Sprite( ViewerRscManager.Handle.getResource("spacegame", "bonus.png").texture);
        this.addChild(this.mSpr);

        const style = new PIXI.TextStyle({
            fill: "#101010",
            fontFamily: "NanumGothicBold",
            fontSize: 60
        });

        this.mText = new PIXI.Text( txt, style);
        this.mText.position.set(250, 64);
        this.addChild(this.mText);
        this.ticker = true;
    }

    onUpdate( delta: number ) {
        
        if(this.mAlive) {

            this.x -= 14 * delta;
            if(this.x + this.width < 0) {
                this.mAlive = false;
            }

        } else {
              this.ticker = false;
            //(this.parent.parent as SpaceGameEngine ).removeBonusMember(this);
            this.parent.removeChild(this);
            this.removeTicker();
        }  
    }

    set alive( bool: boolean) {
        this.mAlive = bool;
    }
    get alive(): boolean { return this.mAlive; }

    get text(): string { return this.mText.text; }

    get type(): EffectType { return this.mType; }
}