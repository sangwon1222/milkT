import { TypeingApp } from '../../../TypeingApp';
import { ObjectBase } from '../../../core/ObjectBase';
import { ViewerRscManager } from '../../../manager/ViewerRscManager';
import gsap from 'gsap';
import "pixi-spine";

// forest game base
export class BaseContainer extends ObjectBase
{

    constructor()
    {
        super();
        this.draw();
    }

    crash()
    {
        //
    }

    clearContainer()
    {
       //
    }

    private draw()
    {
        const bg = new PIXI.Sprite( ViewerRscManager.Handle.getResource( "forestgame", "bg.png").texture);
        this.addChild(bg);
    }
}