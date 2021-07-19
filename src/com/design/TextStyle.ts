export interface TextInputOptions {
    position?: string;
    background?: string;
    border?: string;
    outline?: string;
    lineHeight?: string;
    multiline?: boolean;
    box?: any;
    input?: any;
}

export function defaultInputTextStyle(): TextInputOptions {

    const style: TextInputOptions = {

        input: {
            fontSize: '20pt',
            padding: '14px',
            width: '1200px',
            color: '#26272E'

        },
        box: {
            default: {fill: 0xE8E9F3, rounded: 16, stroke: {color: 0xCBCEE0, width: 4}},
            focused: {fill: 0xE1E3EE, rounded: 16, stroke: {color: 0xABAFC6, width: 4}},
            disabled: {fill: 0xDBDBDB, rounded: 16}
        }
    }
    return style;
}

export function defaultRendererTextStyle(): PIXI.TextStyle {
    
    const style = new PIXI.TextStyle({
        fill: "#333333",
        fontFamily: "NanumGothicBold",
        fontSize: 60
    });

    return style;
}



export function defaultQuestionTextStyle(): any {
    const style = {
        "default": {
            fontFamily: "Arial",
            fontSize: "80px",
            fill: "#d3d3d3",
            align: "center"
        },
        "current": {
            fill: "#000000"
        },
        "wrong": {
            fill: "#ff8888"
        }
    }

    return style;
}

export function getInfoStyle(): PIXI.TextStyle {
    
    const style = new PIXI.TextStyle({
        align: "left",
        fill: "#FFFFFF",
        fontFamily: "NanumGothic",
        fontSize: 40
    });

    return style;
}

// 짧은글 연습----------------------------------------------------------\
// 선택 화면 
export function shortTextStyle0(): PIXI.TextStyle {

    const style = new PIXI.TextStyle({
        align: "left",
        fill: "#ffffff",
        fontFamily: "TmoneyRoundWindExtraBold",
        fontWeight: "bold",
        fontSize: 44,
        lineHeight:0.64
    });

    return style;
}

// 렌더러용
export function shortTextStyle1(): PIXI.TextStyle {

    const style = new PIXI.TextStyle({
        align: "left",
        fill: "#ffffff",
        fontFamily: "TmoneyRoundWindExtraBold",
        fontWeight: "bold",
        fontSize:60,
        lineHeight:26
    });

    return style;
}

export function shortTextQuestionTextStyle(): any {
    const style = {
        "default": {
            fontFamily: "NanumGothicBold",
            fontSize: "60px",
            fill: "#191919",
            align: "left"
        },
        "current": {
            fill: "#191919"
        },
        "wrong": {
            fill: "#f84d4d"
        }
    }

    return style;
}

export function shortTextInputTextStyle(): TextInputOptions {

    const style: TextInputOptions = {

        input: {
            fontFamily: 'NanumGothicBold',
            fontSize: '60px',
            // padding: '1px',
            width: '1180px',
            color: '#191919',
        },
        box: {
            default: {fill: 0xffffff },
            focused: {fill: 0xffffff },
            disabled: {fill: 0x000000 }
        }
    }
    return style;
}

// 긴글 연습----------------------------------------------------------\
// 선택 화면 (왼쪽 스크롤용)
export function longTextStyle0(): PIXI.TextStyle {

    const style = new PIXI.TextStyle({
        align: "left",
        fill: "#333333",
        fontFamily: "TmoneyRoundWindExtraBold",
        fontWeight: "bold",
        fontSize: 44,
        lineHeight:0.64
    });

    return style;
}
// 선택 화면 (오른쪽 스크롤용)
export function longTextStyle1(): PIXI.TextStyle {

    const style = new PIXI.TextStyle({
        align: "left",
        fill: "#ffffff",
        fontFamily: "TmoneyRoundWindExtraBold",
        fontWeight: "bold",
        fontSize: 48,
        lineHeight:20
    });

    return style;
}

export function longTextBgStyle(): PIXI.TextStyle {

    const style = new PIXI.TextStyle({
        align: "left",
        fill: "#999999",
        fontFamily: "NanumGothicBold",
        fontWeight: "normal",
        fontSize: 50,
    });

    return style;
}

export function longTextQuestionTextStyle(): any {
    const style = {
        "default": {
            fontFamily: "NanumGothicBold",
            fontSize: "50px",
            fill: "#999999",
            align: "left"
        },
        "current": {
            fill: "#191919"
        },
        "wrong": {
            fill: "#f84d4d"
        },
        "stay":{
            fill: "#cfcfcf"
        }
    }

    return style;
}

// 타이핑 화면 (입력창)
export function longTextInputTextStyle(): TextInputOptions {

    const style: TextInputOptions = {

        input: {
            fontFamily: 'NanumGothic',
            fontSize: '50px',
            // padding: '1px',
            width: '1922px',
            color: '#ffffff',
            

        },
        box: {
            default: {fill: 0x000000 },
            focused: {fill: 0x117c8d },
            disabled: {fill: 0x000000 }
        }
    }
    return style;
}

// 타자 검정
export function examInputTextStyle(): TextInputOptions {

    const style: TextInputOptions = {

        input: {
            fontFamily: 'NanumGothic',
            fontSize: '50px',
            // padding: '1px',
            width: '1922px',
            color: '#ffffff',
            

        },
        box: {
            default: {fill: 0x000000 },
            focused: {fill: 0x514761 },
            disabled: {fill: 0x000000 }
        }
    }
    return style;
}



