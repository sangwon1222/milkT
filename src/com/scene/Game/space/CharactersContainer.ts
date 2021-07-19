import { ObjectBase } from '../../../core/ObjectBase';
import { ViewerRscManager } from '../../../manager/ViewerRscManager';
import gsap from 'gsap';

export class CharactersContainer extends ObjectBase
{
    private mCh0: PIXI.Sprite;
    private mCh1: PIXI.Sprite;
    private mCh2: PIXI.Sprite;
    private mCh3: PIXI.Sprite;

    constructor()
    {
        super();

        this.mCh0 = new PIXI.Sprite( ViewerRscManager.Handle.getResource("spacegame", `ch_0.png`).texture );
        this.mCh1 = new PIXI.Sprite( ViewerRscManager.Handle.getResource("spacegame", `ch_1.png`).texture );
        this.mCh2 = new PIXI.Sprite( ViewerRscManager.Handle.getResource("spacegame", `ch_2.png`).texture );
        this.mCh3 = new PIXI.Sprite( ViewerRscManager.Handle.getResource("spacegame", `ch_3.png`).texture );

        this.mCh0.position.set(121,1407);
        this.mCh1.position.set(562,1341);
        this.mCh2.position.set(1696,1311);
        this.mCh3.position.set(2271,1407);

        this.addChild( this.mCh0 );
        this.addChild( this.mCh1 );
        this.addChild( this.mCh2 );
        this.addChild( this.mCh3 );

        gsap.to( this.mCh0, {y: 1417, x:124,duration: 1.2, repeat: -1, yoyo: true,});
        gsap.to( this.mCh1, {y: 1361, x: 558, duration: 1.5, repeat: -1, yoyo: true,});
        gsap.to( this.mCh2, {y: 1326, x: 1686,duration: 2, repeat: -1, yoyo: true,});
        gsap.to( this.mCh3, {y: 1437, x: 2260,duration: 1.8, repeat: -1, yoyo: true,});
    }

    cleaerContainer()
    {
        gsap.killTweensOf( this.mCh0 );
        gsap.killTweensOf( this.mCh1 );
        gsap.killTweensOf( this.mCh2 );
        gsap.killTweensOf( this.mCh3 );
    }

    creash()
    {
        //
    }
}