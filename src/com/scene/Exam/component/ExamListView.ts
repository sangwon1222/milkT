import { ExamRenderer } from "./ExamRenderer";
import { ListView } from "../../../widget/ListView";
import { ViewerRscManager } from "../../../manager/ViewerRscManager";

export class ExamListView extends ListView {
  constructor(w: number, h: number) {
    super(w, h);
  }

  draw(info: any): ExamRenderer {
    // console.warn(info);
    const list = new ExamRenderer();
    list.interactive = true;
    list.on("pointerup", () => {
      this.selectedIndex = list.index;
    });

    let numStr = String(info.index + 1);

    if (numStr.length == 1) {
      numStr = `0${numStr}`;
    }

    list.mIndexText.text = numStr;
    list.mTitleText.text = info.label;
    list.index = info.index;

    if (info.index % 2 == 0) {
      list.setBgTexture(
        ViewerRscManager.Handle.getResource("exam", "render_white.png").texture
      );
    } else {
      list.setBgTexture(
        ViewerRscManager.Handle.getResource("exam", "render_blue.png").texture
      );
    }

    if (info.did == true) {
      list.setDidTexture(
        ViewerRscManager.Handle.getResource("common", "again_btn.png").texture
      );
    } else {
      list.setDidTexture(
        ViewerRscManager.Handle.getResource("common", "practice_btn.png")
          .texture
      );
    }

    return list;
  }
}
