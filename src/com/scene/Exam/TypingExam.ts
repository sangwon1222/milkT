import { TypeingApp } from "../../TypeingApp";
import * as Util from "../../../Utill/Config";
import { SceneBase } from "../../core/SceneBast";
import { DataManager } from "../../manager/DataManager";
import { ViewerRscManager } from "../../manager/ViewerRscManager";
import { SoundManager } from "../../manager/SoundManager";
import { ExamComoboBox } from "./component/ExamComoboBox";
import { InputText2 } from "../../widget/InputText2";
import { QuestionText } from "../../widget/QuestionText";
import { EventType } from "../../core/EventType";
import { CustomEvent } from "../../core/CustomEvent";
import { Timer } from "../../../Utill/Timer";
import { EOPPopup } from "../../widget/popup/EOPPopup";
import { ResultPopup } from "../../widget/popup/ResultPopup";
import { TextBg } from "./component/TextBg";

interface TextInputOptions {
  position?: string;
  background?: string;
  border?: string;
  outline?: string;
  lineHeight?: string;
  multiline?: boolean;
  box?: any;
  input?: any;
}

const questStyle = {
  default: {
    fontFamily: "NanumGothicBold",
    fontSize: "50px",
    fill: "#999999",
    align: "left",
  },
  current: {
    fill: "#191919",
  },
  wrong: {
    fill: "#f84d4d",
  },
  stay: {
    fill: "#cfcfcf",
  },
};

const inputStyle: TextInputOptions = {
  input: {
    fontFamily: "NanumGothic",
    fontSize: "50px",
    width: "1922px",
    color: "#ffffff",
  },
  box: {
    default: { fill: 0x000000 },
    focused: { fill: 0x514761 },
    disabled: { fill: 0x000000 },
  },
};

const inputStyle2 = new PIXI.TextStyle({
  fill: "#ffffff",
  fontFamily: "NanumGothicBold",
  fontSize: 50,
});

export class TypingExam extends SceneBase {
  private DATA: any;
  private mData: any;
  private mDep2: string;

  private mListIndex: number;

  private mTextAry: Array<(QuestionText | InputText2)[]>;

  private mTypingSpeedAry: Array<number>;

  private mCurrentLine: number;
  private mCurrentNum: number;
  private mEndLine: number;

  private mIsFinishPage: boolean;

  private mTimeInterval: number;
  private mElapsedTime: number;
  private mTimerValue: number;

  // Typing
  private mScoreAry: Array<number>;
  private mCurrentTypingText: PIXI.Text;
  private mTopTypingText: PIXI.Text;
  private mAccuracyText: PIXI.Text;
  private mTimeLimitText: PIXI.Text;
  //

  private mComoBox: ExamComoboBox;
  private mTextBgAry: Array<TextBg>;

  constructor() {
    super();
    this.name = "TypingExam";
    this.visible = false;
  }

  async onInit() {
    // 헤더 상태 설정
    TypeingApp.Handle.getHeader().setTypingMode();

    // 앞단의 선택 페이지에서 선택한 카테고리의 데이타를 가져온다.
    this.DATA = DataManager.Handle.getMemoryData();
    this.mListIndex = DataManager.Handle.getMemoryIndex();
  }

  async onStart() {
    console.log(`onStart`);

    this.mDep2 = this.DATA[this.mListIndex].Dep2;

    this.mCurrentLine = 0;
    this.mCurrentNum = 0;
    this.mEndLine = 0;
    this.mIsFinishPage = false;
    this.draw();
    this.getFourLineString();
    this.setTextFocus(0);
    this.visible = true;
  }

  async onEnd() {
    clearInterval(this.mTimeInterval);
  }

  draw() {
    SoundManager.Handle.stopBgmSound();

    this.mData = this.DATA[this.mListIndex].exam;

    // 배경 이미지
    const bg = new PIXI.Sprite(
      ViewerRscManager.Handle.getResource("exam", "typing_bg.png").texture
    );
    this.addChild(bg);

    const questionBg = new PIXI.Sprite(
      ViewerRscManager.Handle.getResource("exam", "question_bg.png").texture
    );
    questionBg.position.set(125, 484);
    this.addChild(questionBg);

    const inputBg = new PIXI.Sprite(
      ViewerRscManager.Handle.getResource("exam", "input_bg.png").texture
    );
    inputBg.position.set(125, 996);
    this.addChild(inputBg);

    // Score-------------------------------------------------------
    const style = new PIXI.TextStyle({
      align: "left",
      fill: "#f84d4d",
      fontFamily: "TmoneyRoundWindExtraBold",
      fontWeight: "bold",
      fontSize: 44,
      lineHeight: 28,
    });

    this.mTypingSpeedAry = [];
    this.mScoreAry = [0, 0, 0, 0];

    this.mCurrentTypingText = new PIXI.Text("000타", style);
    this.mTopTypingText = new PIXI.Text("000타", style);
    this.mAccuracyText = new PIXI.Text("100%", style);
    this.mTimeLimitText = new PIXI.Text("0개", style);

    this.mCurrentTypingText.position.set(502, 275);
    this.mTopTypingText.position.set(1135, 275);
    this.mAccuracyText.position.set(1714, 275);
    this.mTimeLimitText.position.set(2238, 275);

    this.addChild(this.mCurrentTypingText);
    this.addChild(this.mTopTypingText);
    this.addChild(this.mAccuracyText);
    this.addChild(this.mTimeLimitText);
    // ------------------------------------------------------------

    let ypos = 566;
    this.mTextBgAry = [];
    this.mTextAry = [];

    for (let i = 0; i < 4; i++) {
      const texts = [
        new QuestionText(questStyle),
        new InputText2(1922, 50, 0xffda18, inputStyle2),
      ];

      // 단어,문장 창
      const questionText = texts[0] as QuestionText;
      questionText.position.set(340, ypos);
      this.addChild(questionText);

      // 입력창
      const inputText = texts[1] as InputText2;
      inputText.htmlInput.style.caretColor = "#ffde34";
      inputText.position.set(340, ypos + 512);

      inputText.addCustomEventListener(EventType.InputTextKeyUp, (evt) =>
        this.onKeyUp(evt, i)
      );
      inputText.addCustomEventListener(EventType.InputTextInput, (evt) =>
        this.onInput(evt, i)
      );
      questionText.setLinkInputText(inputText);
      this.addChild(inputText);

      this.mTextAry.push(texts);

      // 입력창 배경 객체
      const textBg = new TextBg();
      textBg.position.set(0, ypos + 512);
      this.mTextBgAry.push(textBg);
      this.addChild(textBg);

      ypos += 82;
    }

    this.mComoBox = new ExamComoboBox();
    this.mComoBox.selectedIndex = this.mListIndex;
    this.mComoBox.label = this.DATA[this.mListIndex].label;

    this.mComoBox.addCustomEventListener(
      EventType.ComboBoxChange,
      (evt: CustomEvent) => {
        this.stopTimer();

        this.mListIndex = evt.data;

        this.mData = this.DATA[this.mListIndex].exam;

        this.mComoBox.selectedIndex = evt.data;
        this.mComoBox.label = this.DATA[this.mListIndex].label;
        this.mComoBox.data = this.DATA;
        this.mDep2 = this.DATA[this.mListIndex].Dep2;

        this.mTypingSpeedAry = [];
        this.mScoreAry = [0, 0, 0, 0];
        this.mCurrentTypingText.text = "000타";
        this.mTopTypingText.text = "000타";
        this.mAccuracyText.text = "100%";

        this.mCurrentLine = 0;
        this.mCurrentNum = 0;
        this.mEndLine = 0;
        this.mIsFinishPage = false;
        this.getFourLineString();
        this.setTextFocus(0);
        this.startTimer();
      }
    );

    this.mComoBox.position.set(514, 70);
    this.mComoBox.data = this.DATA;
    this.addChild(this.mComoBox);

    const title = new PIXI.Sprite(
      ViewerRscManager.Handle.getResource("exam", "drop_title.png").texture
    );
    title.position.set(80, 70);
    this.addChild(title);

    // 캐릭터 이미지
    const ch = new PIXI.Sprite(
      ViewerRscManager.Handle.getResource("exam", "ch.png").texture
    );
    ch.position.set(2300, 1160);
    this.addChild(ch);

    console.log("startTimer 1");
    this.startTimer();
  }

  onKeyUp(evt: CustomEvent, idx: number) {
    const keyCode: number = evt.data;
    const questionText = this.mTextAry[idx][0] as QuestionText;
    const inputText = this.mTextAry[idx][1] as InputText2;

    if (inputText.text.length >= questionText.answerText.length) {
      if (keyCode == 13) {
        //엔터키
        SoundManager.Handle.Effect_ENTER_DOWN();
        inputText.outFocus();
        Timer.Handle.stop();
        //  console.log(Timer.Handle.getTimeTaken());
        this.check(idx);
      }
    }
  }

  onInput(evt: CustomEvent, idx: number) {
    const questionText = this.mTextAry[idx][0] as QuestionText;
    const inputText = this.mTextAry[idx][1] as InputText2;
    questionText.inputText = inputText.text;
  }

  private check(idx: number, over?: string) {
    console.log(idx);

    const questionText = this.mTextAry[idx][0] as QuestionText;
    const inputText = this.mTextAry[idx][1] as InputText2;

    this.drawScore(
      questionText.getTypingValue(),
      questionText.getWrongAnswerCnt(),
      questionText.getAccuracy()
    );

    this.mTextBgAry[idx].setLabel(inputText.text);

    if (this.mIsFinishPage && idx == this.mEndLine) {
      this.setTextFocus(-1);
      const eop = new EOPPopup();
      eop.addCustomEventListener(EventType.ReceiveData, () => {
        this.typingEnd();
      });
      return;
    }

    if (idx != 3) {
      inputText.htmlInput.disabled = true;
      this.setTextFocus(idx + 1);
    } else {
      this.getFourLineString();
      this.setTextFocus(0);
    }
  }

  private drawScore(currentCnt: number, wrongCnt: number, accuracyCnt: number) {
    this.mCurrentLine++;
    this.mTypingSpeedAry.push(currentCnt);

    this.mScoreAry[0] = currentCnt;
    if (currentCnt > this.mScoreAry[1]) this.mScoreAry[1] = currentCnt;
    this.mScoreAry[2] = this.mScoreAry[2] + wrongCnt;
    this.mScoreAry[3] = this.mScoreAry[3] + accuracyCnt;

    //------------------------------------------------------------
    this.mCurrentTypingText.text = `${Util.addZero(this.mScoreAry[0])}타`;
    this.mTopTypingText.text = `${Util.addZero(this.mScoreAry[1])}타`;
    this.mAccuracyText.text = `${Math.floor(
      this.mScoreAry[3] / this.mCurrentLine
    )}%`;
    //-----------------------------------------------------------
  }

  private setTextFocus(idx: number) {
    for (let i = 0; i < 4; i++) {
      const questionText = this.mTextAry[i][0] as QuestionText;
      const inputText = this.mTextAry[i][1] as InputText2;
      const textBg = this.mTextBgAry[i];

      if (idx == i) {
        textBg.setFocus(true);

        inputText.visible = true;
        inputText.htmlInput.disabled = false;
        inputText.inFocus();

        window.onkeypress = null;
        window.onkeypress = (evt: KeyboardEvent) => {
          const focusEle = document.activeElement;
          if (evt.keyCode == 13 && focusEle != inputText.htmlInput) {
            inputText.inFocus();
          }
        };
      } else {
        textBg.setFocus(false);
        inputText.visible = false;
        inputText.htmlInput.disabled = true;
      }
    }

    Timer.Handle.start();
  }

  private startTimer() {
    //

    console.log("startTimer");
    this.mElapsedTime = 0;
    this.mTimerValue = 300;
    this.mTimeLimitText.text = "05:00";
    this.mTimeInterval = setInterval(() => {
      this.mElapsedTime++;
      this.mTimerValue--;

      let min: number;
      let sec: number;

      if (this.mTimerValue > 59) {
        min = Math.floor(this.mTimerValue / 60);
        sec = this.mTimerValue % 60;
      } else {
        min = 0;
        sec = this.mTimerValue;
      }

      // console.log( `Time =  ${min}:${sec}`);

      this.mTimeLimitText.text = `${Util.addZero(min, 2)}:${Util.addZero(
        sec,
        2
      )}`;

      if (this.mTimerValue == 5) {
        SoundManager.Handle.Effect_COUNT_DOWN();
      }

      if (this.mTimerValue == 0) {
        this.stopTimer();

        const eop = new EOPPopup();
        eop.addCustomEventListener(EventType.ReceiveData, () => {
          this.typingEnd();
        });
        //this.addChild(eop);
        TypeingApp.Handle.popupRoot.addChild(eop);
        return;
      }
    }, 1000);
  }

  private stopTimer() {
    console.log("clear timer");
    clearInterval(this.mTimeInterval);
  }

  private async typingEnd() {
    this.stopTimer();

    window.onkeypress = null;
    window.onkeydown = null;

    let typeAverage = 0;
    const len = this.mTypingSpeedAry.length;
    if (len > 0) {
      for (let i = 0; i < len; i++) {
        typeAverage += this.mTypingSpeedAry[i];
      }
      typeAverage = Math.floor(typeAverage / len);
    }

    const top = this.mScoreAry[1];
    const accuracy = Math.floor(this.mScoreAry[3] / this.mCurrentLine);
    const resultPopup = new ResultPopup("타자 검정 결과", 1, {
      average: typeAverage,
      wrong: this.mScoreAry[2],
      accuracy: accuracy,
      time: this.mElapsedTime,
    });

    await DataManager.Handle.getCompleteQuery(
      this.mDep2,
      typeAverage,
      top,
      accuracy,
      0
    );
  }

  getFourLineString() {
    let cnt = 0;
    let line = 0;
    let idx = this.mCurrentNum;

    while (cnt < 4) {
      const questionText = this.mTextAry[cnt][0] as QuestionText;
      const inputText = this.mTextAry[cnt][1] as InputText2;
      inputText.text = "";

      const textBg = this.mTextBgAry[cnt];
      textBg.setLabel("");
      inputText.text = "";

      if (this.mData[idx]) {
        questionText.answerText = this.mData[idx];
        questionText.visible = true;
        this.mEndLine = line;
        idx++;
        line++;
      } else {
        console.log("finish page");
        questionText.visible = false;
        this.mIsFinishPage = true;
      }
      cnt++;

      // 다음페이지가 있는지 체크
      if (cnt == 4) {
        if (this.mData[idx]) {
          console.log("다음페이지 있음");
          this.mCurrentNum = idx;
          Timer.Handle.start();
        } else {
          console.log("다음페이지 없음");
          this.mIsFinishPage = true;
          // this.mEndLine = 3;
        }
      }
    }
  }
}
