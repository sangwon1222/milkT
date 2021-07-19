import { ViewerRscManager } from '../../manager/ViewerRscManager'
import { EventType } from "../../core/EventType"
import { TypeingApp } from '@/com/TypeingApp';
import { PopupBase } from "./PopupBase";
import gsap from 'gsap';
import "pixi-spine";


export class EOPPopup extends PopupBase {

    constructor() {
        super();
    }

    init() {
        const random = Math.floor(Math.random() * 5) + 1;
        const eopSpine = new PIXI.spine.Spine(ViewerRscManager.Handle.getResource("common", "common_eop.json").spineData)
        eopSpine.state.setAnimation(0, `eop0${random }`, false);
        eopSpine.position.set(TypeingApp.Handle.appWidth / 2, TypeingApp.Handle.appHeight / 2);
        this.mPopupContainer.addChild(eopSpine);

        const delay = eopSpine.stateData.skeletonData.findAnimation(`eop0${random}`).duration;
        gsap.delayedCall(delay + 0.5, () => {
            this.closePopup();
            this.dispatchEvent(EventType.ReceiveData);
        })
    }
}