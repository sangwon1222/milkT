import gsap from "gsap";

const debugMode = false;

export class DisplayInput extends PIXI.Container{
    private mDebug: PIXI.Graphics;

    private mCursor: PIXI.Graphics;
    private mColor: number;
    private mFontFm: string;
    private mText: PIXI.Text;
    set text(v: string) { 
        this.setData(v);
     }

    constructor(color?: number , fontFamily?: string){
        super()
        if(color){ 
            this.mColor = color;
            this.mFontFm = fontFamily;
        }
        this.reset();
    }
    reset(){
        this.removeChildren();
        this.mCursor = new PIXI.Graphics();
        this.mCursor.beginFill(0xFFFFFF,1);
        this.mCursor.drawRect(0,0,10,100);
        this.mCursor.endFill();
        this.mCursor.tint = 0xffda18;
        
        gsap.to(this.mCursor,{alpha:0,duration:0.5}).repeat(-1).yoyo(true);

        const style= {
            fontFamily: 'NanumGothicBold',
            fontWeight: 'bold',
            fontSize: 100,
            padding: 20,
            fill: 0x333,
        }
        if(this.mColor){ 
            style.fill = this.mColor; 
            style.fontFamily = this.mFontFm
            this.mCursor.tint = this.mColor;
        }

        this.mText = new PIXI.Text( "",style );

        this.addChild(this.mCursor,this.mText)
        this.mCursor.x = this.mText.width+this.mCursor.width;

        if(debugMode){
            this.mDebug = new PIXI.Graphics();
            this.mDebug.lineStyle(2,0XFF0000,1);
            this.mDebug.drawRect(0,0,this.width, this.height )
            this.mDebug.endFill();
            this.addChild(this.mDebug)
        }

        this.pivot.set(this.width/2, this.height/2)
    }

    setData(htmlData: string){
        this.reset()
        this.mText.text =  htmlData;
        this.mCursor.x = this.mText.width+this.mCursor.width;
        
        if(this.mDebug)this.mDebug.width=this.width;

        this.pivot.set(0, 0)
        this.pivot.set(this.width/2, this.height/2)
    }

    setTextStyle(style: any){
        this.mText.style = style;
    }
}