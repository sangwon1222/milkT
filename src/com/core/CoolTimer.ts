export class CoolTimer{
    //-----------------------------------
    // singleton
    private static _handle: CoolTimer;
    static get Handle(): CoolTimer { 
        if( CoolTimer._handle === undefined ){
            CoolTimer._handle = new CoolTimer();
        }
        return CoolTimer._handle 
    }

    private mIsCoolling: boolean;
    private mCoolTime: number;

    constructor()
    {
        CoolTimer._handle = this;
        this.mIsCoolling = false;
    }

    isCoolling(): boolean
    {
       // console.log(this.mIsCoolling);
        if( this.mIsCoolling ){
            return true;
        } 
    
        this.mIsCoolling = true;
        this.mCoolTime = setTimeout( ()=> {
            this.mIsCoolling = false;
            clearTimeout( this.mCoolTime);
        }, 300);
         
        return false;
    }
}