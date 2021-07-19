
export class Loader extends PIXI.Container
{

    private mAnimTexture: Array< PIXI.Texture >
    private mAnim: PIXI.AnimatedSprite;

    constructor()
    {
        super();
        const bg =  new PIXI.Graphics();

        bg.beginFill(0xc7efff);
        bg.drawRect(0,0,2560, 1600);
        bg.endFill();

        this.addChild(bg);

        this.mAnimTexture = [
            PIXI.Texture.from('rsc/source/loader/images/loading_1.png'),
            PIXI.Texture.from('rsc/source/loader/images/loading_2.png'),
            PIXI.Texture.from('rsc/source/loader/images/loading_3.png'),
            PIXI.Texture.from('rsc/source/loader/images/loading_4.png')
        ]

        this.mAnim = new PIXI.AnimatedSprite(this.mAnimTexture);
        this.mAnim.anchor.set(0.5,0.5);
        this.mAnim.position.set( 1280, 800);
        this.addChild( this.mAnim );

        this.mAnim.animationSpeed = 20;

        this.mAnim.play();
    }

    clear()
    {
        for( const anim of this.mAnimTexture) 
        {
            PIXI.Texture.removeFromCache( anim );
        } 

        this.mAnimTexture = [];
    }
}