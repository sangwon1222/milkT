import { ObjectBase } from "../core/ObjectBase"
import { EventType } from "../core/EventType"
import { SoundManager }from "../manager/SoundManager";
import { CoolTimer } from "../core/CoolTimer";

export class Button extends ObjectBase{

    private mSprite: PIXI.Sprite;

    private mIndex: number;
    private mSelected: boolean;
    private mDisabled: boolean;

    private mNormalTexture: PIXI.Texture;
    private mSelectTexture: PIXI.Texture;
    private mDisableTexture: PIXI.Texture;

    constructor( normal: PIXI.Texture, sel?: PIXI.Texture, dis?: PIXI.Texture) {

        super(); 
        this.mSelected = false;
        this.mDisabled = false;
        this.buttonMode = true;
        this.interactive = true;
        this
        .on('pointerdown', this.onButtonDown)
        .on('pointerup', this.onButtonUp)
        .on('pointertap', this.onButtonTab)
        .on('pointerupoutside', this.onButtonOutSide)

        this
        .on('pointerover',()=> this.onButtonOver() )
        .on('pointerout',()=> this.onButtonOut() )
        
                
        this.mNormalTexture = normal;

        sel? (this.mSelectTexture = sel) : (this.mSelectTexture = normal);
        dis? (this.mDisableTexture = dis) : (this.mDisableTexture = normal);

        this.mSprite = new PIXI.Sprite();
        this.mSprite.texture = this.mNormalTexture;
        this.addChild(this.mSprite);
    }

    setAnchor( x: number, y: number) {
        this.mSprite.anchor.set(x, y);
    }

    setDrag() {
        this.on("pointermove", this.onButtonMove);
    }

    set index( idx: number ) {
        this.mIndex = idx;
    }
    get index(): number { return this.mIndex; }

    set disabled( bool: boolean) {
        this.mDisabled = bool;
        this.renewal();
    }
    get disabled(): boolean { return this.mDisabled; }

    set selected( bool: boolean ) {
        this.mSelected = bool;
        this.renewal();
    }
    get selected(): boolean {return this.mSelected; }

    private onButtonTab( evt: PIXI.InteractionEvent ) {

     
        if( CoolTimer.Handle.isCoolling()) return;
 
        if(this.mDisabled) return;
        SoundManager.Handle.Effect_CLICK();
        this.dispatchEvent(EventType.ButtonTab, evt);
    }

 
    private onButtonDown( evt: PIXI.InteractionEvent ) {

      //  if( CoolTimer.Handle.isCoolling()) return;

        if(this.mDisabled) return;
        this.dispatchEvent(EventType.ButtonDown, evt);
    }

    private onButtonUp( evt: PIXI.InteractionEvent ) {

      //  if( CoolTimer.Handle.isCoolling()) return;

        if(this.mDisabled) return;
        
        this.dispatchEvent(EventType.ButtonUp, evt);
    }

    onButtonOver( evt?: PIXI.InteractionEvent ) {

        // if(this.mDisabled) return;

    }

    onButtonOut( evt?: PIXI.InteractionEvent ) {

        // if(this.mDisabled) return;
    }

    private onButtonOutSide( evt: PIXI.InteractionEvent ) {

        if(this.mDisabled) return;
        this.dispatchEvent(EventType.ButtonOutSide, evt);
    }

    private onButtonMove( evt: PIXI.InteractionEvent) {

        if(this.mDisabled) return;
        this.dispatchEvent(EventType.ButtonMove, evt);
    }

    private renewal() {
        
        // 버튼 사용불가
        if( this.mDisabled ) {
            this.mSprite.texture = this.mDisableTexture;
            return;
        }

        if( this.mSelected ) {
            this.mSprite.texture = this.mSelectTexture;
        } else {
            this.mSprite.texture = this.mNormalTexture;
        }
    }
}

