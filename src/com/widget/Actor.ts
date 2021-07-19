import { TypeingApp } from '../TypeingApp';
import { ObjectBase } from "../core/ObjectBase"
import { EventType } from "../core/EventType"

export class Actor extends ObjectBase {

    private mTicker: boolean;
    private mTickerFnc: any;

    constructor() {

        super();
        this.mTicker = false;
        this.mTickerFnc = (delta: number)=>{ this.update(delta)}

        
        PIXI.Ticker.shared.add( this.mTickerFnc, PIXI.UPDATE_PRIORITY.NORMAL);
    }

    set ticker( bool: boolean ) {
        this.mTicker = bool;
    }
    get ticker(): boolean { return this.mTicker; }

    
    removeTicker() {

        console.log("removeTicker");
        PIXI.Ticker.shared.remove(this.mTickerFnc, PIXI.UPDATE_PRIORITY.NORMAL);                                                                                        
    }

    // override
    onUpdate( delta: number ) {
        //
    }

    private update( delta: number ) {

        if(this.mTicker) {
            this.onUpdate( delta );
        }
    }  
}