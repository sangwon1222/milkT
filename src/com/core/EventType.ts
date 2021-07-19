export enum EventType {
    ReceiveData = "ReceiveData",

    ButtonDown = "ButtonDown",
    ButtonUp = "ButtonUp",
    ButtonMove = "ButtonMove",
    ButtonOutSide = "ButtonOutSide",
    ButtonTab = "ButtonTab",

    SliderChange = "SliderChange",
    SliderThumbDown = "SliderThumbDown",
    SliderThumbUp = "SliderThumbUp",

    InputTextKeyDown = "InputTextKeyDown",
    InputTextKeyUp = "InputTextKeyup",
    InputTextInput = "InputTextInput",
    InputTextCompUpdate = "InputTextCompUpdate",

    ComboBoxChange = "ComboBoxChange",

    GameOnKeyUp = "GameOnKeyUp",

    CRASH ="Crash",

    RecieveText="ReceiveText",
    RecieveScore="RecieveScore",
    RecieveNoVitality="RecieveNoVitality",
    RecieveGameStart="RecieveGameStart",
    RecieveGameSucceed="RecieveGameSucceed",
    ReceiveGameRecover="ReceiveGameRecover"
}