import { ObjectBase } from '../../../core/ObjectBase';
import { ViewerRscManager } from '../../../manager/ViewerRscManager';

export class Heart extends ObjectBase {

    private mHeart: PIXI.AnimatedSprite;
    private mHeartSheet: PIXI.LoaderResource;

    constructor() {
        
        super();
        this.mHeartSheet = ViewerRscManager.Handle.getResource("game", `heart.json`);
        this.mHeart = new PIXI.AnimatedSprite(this.mHeartSheet.spritesheet.animations["ef_heart"]);
        this.mHeart.loop = false;
        this.full();
        this.addChild(this.mHeart);
    }

    full() {
        this.mHeart.gotoAndStop(1);
    }

    empty() {
        this.mHeart.play();
    }
}
