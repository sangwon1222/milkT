import { TypeingApp } from '../../TypeingApp';
import { ObjectBase } from '../../core/ObjectBase';
import { SoundManager } from '../../manager/SoundManager';

export class PopupBase extends ObjectBase
{
    protected mPopupContainer: PIXI.Container;

    constructor()
    {
        super();

        window.onkeypress=null;
        window.onkeyup=null;
        window.onkeydown=null;

        const dimmed = new PIXI.Graphics();
        dimmed.beginFill(0x000000,0.8);
        dimmed.drawRect(0,0, TypeingApp.Handle.appWidth, TypeingApp.Handle.appHeight );
        dimmed.endFill();
        this.addChild(dimmed);
        dimmed.interactive = true;

        this.mPopupContainer = new PIXI.Container();
        this.addChild(this.mPopupContainer);

        TypeingApp.Handle.popupRoot.addChild( this );

        this.init();
    }

    init()
    {
        // override
    }

    closePopup() 
    {
        window.onkeypress=null;
        window.onkeyup=null;
        window.onkeydown=null;
        TypeingApp.Handle.popupRoot.removeChild( this );
    }
}