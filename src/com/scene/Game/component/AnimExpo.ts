import { ViewerRscManager } from '../../../manager/ViewerRscManager';

export class AnimExpo extends PIXI.Container
{
    private mAnimTexture: Array< PIXI.Texture >
    private mAnim: PIXI.AnimatedSprite;

    private mNumberSheet: PIXI.LoaderResource;

    constructor( comboCnt: number, x: number, y: number )
    {
        super();

        this.mNumberSheet = ViewerRscManager.Handle.getResource("game", "numbers.json");

        this.mAnimTexture = [];

        for( let i = 1; i < 42; i++) {

            let str = "";
            if( i < 10 ) {
                str = `0${i}`;
            } else {
                str = `${i}`;
            }
            const texture = ViewerRscManager.Handle.getResource("gamecommon", `ef_combo_${str}.png`).texture;
            this.mAnimTexture.push( texture );
        }

        this.mAnim = new PIXI.AnimatedSprite(this.mAnimTexture);
        this.mAnim.anchor.set(0.5,0.5);
        this.mAnim.position.set(x,y);
        this.mAnim.loop = false;
        this.addChild( this.mAnim );

        const numContainer = new PIXI.Container();
        const frontNum = new PIXI.Sprite();
        const backNum = new PIXI.Sprite();

        if( comboCnt < 10) {
      
            backNum.texture = this.mNumberSheet.textures[ `no_combo_0${comboCnt}.png` ];
            backNum.anchor.set(0.5,0);
            backNum.x = x;
            numContainer.addChild(backNum);
        } else {
            const chStr = String(comboCnt);
     
            frontNum.texture = this.mNumberSheet.textures[ `no_combo_0${chStr.substr(0,1)}.png` ];
            backNum.texture = this.mNumberSheet.textures[ `no_combo_0${chStr.substr(1,1)}.png` ];

            frontNum.anchor.set(1,0);
        
            frontNum.x = x;
            backNum.x = x;

            numContainer.addChild(frontNum);
            numContainer.addChild(backNum);
        }
        this.addChild(numContainer);
    }

    playAnim()
    {
        this.mAnim.play();
        this.mAnim.onComplete = ()=> {
            this.parent.removeChild(this);
        }
    }
}