export default{
    w: 2560,
    h: 1600,
    dis:0,
    KorEngMode: true,

    strWebDns:"Null",  // 웹서버 DNS
    strUserID:"Null", // 사용자 ID
    strName:"Null", // 사용자 명
    strGrade:"Null" // 사용자 현재 학년

    /*
    mode: "base",
    KorList: [
        {label:"base" , flag: false},
        {label:"leftup" , flag: false},
        {label:"index" , flag: false},
        {label:"rightup" , flag: false},
        {label:"leftdown" , flag: false},
        {label:"rightdown" , flag: false},
        {label:"leftdouble" , flag: false},
        {label:"rightdouble" , flag: false},
    ],
    EngList: [
        {label:"base" , flag: false},
        {label:"leftup" , flag: false},
        {label:"index" , flag: false},
        {label:"rightup" , flag: false},
        {label:"doubledown" , flag: false},
        {label:"all" , flag: false},
    ],
    */
}

export function shuffleArray(a: Array<any>) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function addComma( n: number | string ): string {
    
    const len = String(n).length;

    if(len < 4) return String(n);

    const rest = len % 3;
    const share = Math.floor(len / 3);

    let numStr = "";
    if( rest != 0 ) numStr += String(n).substr(0, rest) + ",";

    let stV = rest;

    for(let i = 0; i < share; i++) {

        numStr += String(n).substr(stV, 3);
        if( i != share - 1) numStr += ",";
        stV += 3;
    }

    return numStr;
}

export function addZero( num: number, maxLength = 3 ): string {
    const castStr = String(num);
    let compStr = "";

    if( castStr.length < maxLength ) {
        const len = maxLength - castStr.length;
        for(let i=0; i < len; i++) {
            compStr += "0";
        }
    }

    compStr += castStr;
    return compStr;
}