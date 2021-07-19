import { TypeingApp } from '../../../TypeingApp';
import { ObjectBase } from '../../../core/ObjectBase';
import { ViewerRscManager } from '../../../manager/ViewerRscManager';
import "pixi-spine";

export class CharactersContainer extends ObjectBase
{
    private mCassle: PIXI.spine.Spine;

    constructor()
    {
        super();

        this.mCassle = new PIXI.spine.Spine( ViewerRscManager.Handle.getResource("forestgame", "game2_bear.json").spineData );
        this.mCassle.position.set(TypeingApp.Handle.appWidth / 2,TypeingApp.Handle.appHeight / 2);
        this.addChild( this.mCassle );

        const cir = new PIXI.Graphics();
        cir.beginFill(0xff0000);
        cir.drawCircle(1280,800,220);
        cir.endFill();
        cir.alpha = 0;
        this.addChild(cir);
        this.mCassle.state.setAnimation(1,`default`,true);
    }

    crash()
    {
        this.mCassle.state.setAnimation(1,`fail`,false);
        this.mCassle.state.addListener({
            complete: (trackIndex: PIXI.spine.core.TrackEntry) => { this.mCassle.state.setAnimation(1,`default`,true)}
        });
    }

    cleaerContainer()
    {
        //
    }
}