import { ObjectBase } from "./ObjectBase"

export enum SceneName {

    Intro = 0,

    SelectKeyLocation = 1,
    SelectWord = 2,
    SelectShortText = 3,
    SelectLongText = 4,
    SelectExam = 5,
    SelectGame = 6,

    TypingShortText = 7,
    TypingLongText = 8,
    TypingExam = 9,
    TypingKeyLocation = 10,
    TypingWord = 11,
    SpaceGame = 12,
    ForestGame = 13
}

export class SceneBase extends ObjectBase {

    private mIndex: number;
 
    constructor() {

        super();
        this.hide();
    }

    // Index
    set index( n: number ) {
        this.mIndex = n;
    }
    get index(): number { return this.mIndex; }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    // override ----------------------------------------
    async onInit(){
        //
    }
    async onStart(){
        //
    }
    async onEnd(){
        //
    }
    async onChangeMode(){
        //
    }
}