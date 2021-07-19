import * as PIXI from "pixi.js";
window.PIXI = PIXI;

import "pixi-sound";
import pixiSound from "pixi-sound";
import gsap from "gsap";
import { SoundManager } from "../manager/SoundManager";

export class App extends PIXI.Application {

    /*
    //-----------------------------------
    // singleton
    private static _handle: App;
    static get Handle(): App { return App._handle }
    //-----------------------------------
    */

    private mBgRoot: PIXI.Container;
    private mSceneRoot: PIXI.Container;
    private mNaviRoot: PIXI.Container;
    private mPopupRoot: PIXI.Container;

    private mLoaderRoot: PIXI.Container;

    private mWidth: number;
    private mHeight: number;

    private mIsMobile: boolean;

    private mLogPosY: number;

    private mLogAry: Array< PIXI.Text >;


    constructor( canvas: HTMLCanvasElement, pWidth = 2560, pHeight = 1600) {
        
        console.log( "App Created")



        super({
            width: pWidth,
            height: pHeight,
            backgroundColor: 0xffffff,

            //antialias: true,
            
            // transparent: true,
            //resolution: window.devicePixelRatio || 1,
            view: canvas,
        });

        canvas.tabIndex = 1;
        this.ticker.maxFPS = 30;

        const am = new PIXI.AccessibilityManager( this.renderer);
        am.renderer.plugins.accessibility.activate = () =>{
           const ac = document.getElementById("appCase");
           const cv = document.getElementsByTagName("canvas")[0];
           const stLen =  ac.childNodes.length;
           
           for( let i = 0; i < stLen; i++)
           {
               //console.log( ac.childNodes[i].nodeName );
                if( `DIV` == ac.childNodes[i].nodeName ) {
                    ac.removeChild( ac.childNodes[i] );
                }
           }
           cv.focus();
        };

        document.addEventListener( "visibilitychange", ()=> { this.handleVisibilityChange() }, false);

        
        this.stage.removeChildren();
        pixiSound.stopAll();
        gsap.globalTimeline.clear();

        this.mLogPosY = 0;
        this.mLogAry = [];

        this.mBgRoot = new PIXI.Container();
        this.stage.addChild( this.mBgRoot );

        this.mSceneRoot = new PIXI.Container();
        this.stage.addChild( this.mSceneRoot );

        this.mNaviRoot = new PIXI.Container();
        this.stage.addChild( this.mNaviRoot );

        this.mPopupRoot = new PIXI.Container();
        this.stage.addChild(this.mPopupRoot);

        this.mLoaderRoot = new PIXI.Container();
        this.stage.addChild(this.mLoaderRoot);

        this.mWidth = pWidth;
        this.mHeight = pHeight;


        this.setCommonCssStyle();
        this.checkDevice();

        //App._handle = this;
        // hack for browser
        //(window as any)['app'] = this;
    }

    get appWidth(): number { return this.mWidth; }
    get appHeight(): number { return this.mHeight; }

    get bgRoot(): PIXI.Container { return this.mBgRoot;}
    get sceneRoot(): PIXI.Container { return this.mSceneRoot;}
    get naviRoot(): PIXI.Container { return this.mNaviRoot;}
    get popupRoot(): PIXI.Container { return this.mPopupRoot;}

    get loaderRoot(): PIXI.Container { return this.mLoaderRoot;}

    get isMobile(): boolean { return this.mIsMobile; }

    private handleVisibilityChange()
    {
        if (document[`hidden`]) {
            SoundManager.Handle.Pause();
          } else {
            SoundManager.Handle.Resume();
          }
    }


    AddOnScreenDebugMessage( msg: any ) {
        //
        const msgStr = String(msg);

        const style = new PIXI.TextStyle({
            fill: "#ff0000",
            fontSize: 40,
        });

        const log = new PIXI.Text(msgStr, style);
        this.mLogAry.push(log);
        this.stage.addChild(log);
        this.showLog();

        setTimeout( ()=> {
            this.stage.removeChild(log);
            this.mLogAry.splice(this.mLogAry.indexOf(log), 1);
            this.showLog();
        }, 5000);
    }

    private showLog() {

        let ypos = 0;

        for( const log of this.mLogAry) {
            log.y = ypos;
            ypos += 20;
        }
    }


    // 기기가 모바일인이 pc인지 확인.
    private checkDevice() {
        const filter = "win16|win32|win64|mac";
        if (navigator.platform) {
            this.mIsMobile = filter.indexOf(navigator.platform.toLowerCase()) < 0;
        }
    }

    private setCommonCssStyle() {

        const style = document.createElement('style');
        document.body.appendChild(style);
        style.innerHTML = 
        `
        html, body, div, span, applet, object, iframe, table, caption, tbody, tfoot, thead, tr, th, td,
        del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code,
        dl, dt, dd, ol, ul, li, fieldset, form, label, legend {
        vertical-align: baseline; outline: 0; padding: 0; margin: 0; border: 0;
       }
   
       body {
         position:relative;
         top:0;
         left:0;
       }

       canvas {
           width: 100%;
       }

        input[type="text"] { 
            
            -webkit-font-smoothing: antialiased;
            
        }

        

        `
    }
}

