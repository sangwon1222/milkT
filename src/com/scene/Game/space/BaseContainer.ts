import { ObjectBase } from '../../../core/ObjectBase';
import { ViewerRscManager } from '../../../manager/ViewerRscManager';
import gsap from 'gsap';

class Ground extends PIXI.Container {

    private mLand: PIXI.Sprite;
    constructor() {
        super();
        this.mLand = new PIXI.Sprite( ViewerRscManager.Handle.getResource("spacegame", "bg_land.png").texture);
        this.mLand.position.set(0,1319);
        this.addChild(this.mLand)
        
    }

    earthQuake() {
        
        gsap.killTweensOf(this.mLand);
        const timeline = gsap.timeline( {repeat: 1});
        timeline.to( this.mLand, { duration:0.05, y:1317, });
        timeline.to( this.mLand, { duration:0.05, y:1321, delay:0.05 });
        timeline.to( this.mLand, { duration:0.05, y:1319, delay:0.1});
        timeline.play();
    }

    clear()
    {
        gsap.killTweensOf(this.mLand);
    }
}

export class BaseContainer extends ObjectBase
{
    private mGound: Ground;

    constructor()
    {
        super();
        this.draw();
    }

    creash()
    {
        this.mGound.earthQuake();
    }

    clearContainer()
    {
        this.mGound.clear();
    }

    private draw()
    {
        const bg = new PIXI.Sprite( ViewerRscManager.Handle.getResource( "spacegame", "bg.png").texture);
        this.addChild(bg);

        this.mGound = new Ground();
        this.addChild( this.mGound );
    }
}