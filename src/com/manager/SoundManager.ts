import PIXISound from 'pixi-sound';
import { ViewerRscManager } from './ViewerRscManager';

const fileFormat = "mp3";

export class SoundManager{
    //-----------------------------------
    // singleton
    private static _handle: SoundManager;
    static get Handle(): SoundManager { 
        if( SoundManager._handle === undefined ){
            SoundManager._handle = new SoundManager();
        }
        return SoundManager._handle 
    }
    //-----------------------------------

    private mBgmSoundFlag: boolean;
    private mEffectSoundFlag: boolean;
    private mBgmSound: PIXI.sound.Sound;

    private mBGM1: PIXI.sound.Sound;

   

    constructor() 
    {
        SoundManager._handle =this;
        this.mBgmSoundFlag = true;
        this.mEffectSoundFlag = true;

        window['SoundManager'] = this;

        //"bgm_1.mp3",
        //"bgm_2.mp3",
        //"bgm_3.mp3",

    }

    get bgmSoundFlag(): boolean { return this.mBgmSoundFlag; }
    set bgmSoundFlag( bool: boolean )
    { 
        this.mBgmSoundFlag = bool; 
        if( this.mBgmSoundFlag == true ) 
        {
            this.mBgmSound.play( {loop: true});
        } else {
            this.mBgmSound.stop();
        } 
    }

    get effectSoundFlag(): boolean { return this.mEffectSoundFlag; }
    set effectSoundFlag( bool: boolean ){ this.mEffectSoundFlag = bool; }

    Pause(){
        if(!this.mBgmSound) return;
        this.mBgmSound.pause();
    }

    Resume() {
        if(!this.mBgmSound) return;
        this.mBgmSound.play();
    }

    /// BGM SOUND

    BGM_Main()
    {
         this.playBGMSound(ViewerRscManager.Handle.getResource("common", `bgm_1.${fileFormat}`).sound);  
    }

    BGM_SpaceGame()
    {

        this.playBGMSound(ViewerRscManager.Handle.getResource("common", "bgm_2.mp3").sound);  
    }

    BGM_ForestGame()
    {
        this.playBGMSound(ViewerRscManager.Handle.getResource("common", "bgm_3.mp3").sound);  
    }

    Effect_CNT(n: number)
    {
        this.playEffectSound(ViewerRscManager.Handle.getResource("common", `${n}.ogg`).sound);  
    }

    Effect_LEVEL()
    {
        this.playEffectSound(ViewerRscManager.Handle.getResource("common", "level.ogg").sound);  
    }

    Effect_READY()
    {
        this.playEffectSound(ViewerRscManager.Handle.getResource("common", "ready.ogg").sound);  
    }

    Effect_SET()
    {
        this.playEffectSound(ViewerRscManager.Handle.getResource("common", "set.ogg").sound);  
    }

    Effect_GO()
    {
        this.playEffectSound(ViewerRscManager.Handle.getResource("common", "go.ogg").sound);  
    }

    /// EFFECT SOUND
    Effect_CLICK()
    {
        this.playEffectSound(ViewerRscManager.Handle.getResource("button", `sfx_1.${fileFormat}`).sound); 
    }

    Effect_ENTER_DOWN()
    {
        this.playEffectSound(ViewerRscManager.Handle.getResource("common", `sfx_2.${fileFormat}`).sound); 
    }

    Effect_CHANGE_LANG()
    {
        this.playEffectSound(ViewerRscManager.Handle.getResource("common", `sfx_3.${fileFormat}`).sound); 
    }

    Effect_SPACE_LIFE_DECREASE()
    {
        this.playEffectSound(ViewerRscManager.Handle.getResource("common", `sfx_4.${fileFormat}`).sound); 
    }

    Effect_FOREST_LIFE_DECREASE()
    {
        this.playEffectSound(ViewerRscManager.Handle.getResource("common", `sfx_5.${fileFormat}`).sound); 
    }

    Effect_EXPO()
    {
        this.playEffectSound(ViewerRscManager.Handle.getResource("common", `sfx_6.${fileFormat}`).sound); 
    }

    Effect_COUNT_DOWN()
    {
       this.playEffectSound(ViewerRscManager.Handle.getResource("common", `sfx_7.${fileFormat}`).sound); 
    }

    stopBgmSound()
    {
        if(!this.mBgmSound) return;
        this.mBgmSound.stop();
        this.mBgmSound = null;
    }


    private playBGMSound( $snd: PIXI.sound.Sound, $option?: any ) 
    {

        if( this.mBgmSound == $snd) return;

        this.mBgmSound = $snd;
        if( !this.mBgmSoundFlag ) return; 
        this.mBgmSound.play( { loop: true} );
    }

    private playEffectSound( $snd: PIXI.sound.Sound, $option?: any ) 
    {

        if( !this.mEffectSoundFlag ) return; 
        $snd.play();

    }
}

