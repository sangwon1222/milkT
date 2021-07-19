import { ViewerRscManager } from '../../../manager/ViewerRscManager';

export class AnimCrash extends PIXI.Container
{

    private mAnim: PIXI.AnimatedSprite;
    private mCrashSheet: PIXI.LoaderResource;

    constructor( x: number, y: number )
    {
        super();

        this.mCrashSheet = ViewerRscManager.Handle.getResource("game", "ef_boom.json");
        this.mAnim = new PIXI.AnimatedSprite( this.mCrashSheet.spritesheet.animations["ef_boom"] );
        this.mAnim.anchor.set(0.5,0.5);
        this.mAnim.position.set(x,y);
        this.mAnim.loop = false;
        this.addChild( this.mAnim );
    }

    playAnim()
    {
        this.mAnim.play();
        this.mAnim.onComplete = ()=> {
            this.parent.removeChild(this);
        }
    }
}