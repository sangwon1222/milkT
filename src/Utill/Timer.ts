export class Timer {

    //-----------------------------------
    // singleton
    private static _handle: Timer;
    static get Handle(): Timer { 
        if( Timer._handle === undefined ){
            Timer._handle = new Timer();
        }
        return Timer._handle 
    }
    //-----------------------------------



    private mStartTimer: number;
    private mEndTimer: number;

    private mTimeTakne: number;

    constructor() {
        //
    }

    start() {
        this.mStartTimer = (+ new Date() / 1000);
    }

    stop() {
        this.mEndTimer = (+ new Date() / 1000);
    }

    getTimeTaken(): number {

        const v = (this.mEndTimer - this.mStartTimer).toFixed(2);
        this.mTimeTakne = Number(v);
        return this.mTimeTakne;
    }
}