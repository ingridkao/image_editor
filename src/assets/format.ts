// 一般4X6 
// 定義為15.2X10.2長寬比1.5
// 實際ibon紙材
// 量測為14.8X10 長寬比1.48
// export const aspectRatio = 1.5
export const aspectRatio:number = 1.48

export const printW = 140

export type FormatItemTypes = {
    key: string;
    name: string;
    desc: string;
    w: number;
    h: number;
}
declare interface FormatTypes {
    [key: string]: FormatItemTypes
}

// w(unit: 1px)
// h(unit: 1px)
export const format:FormatTypes = {
    'p1': {
        key: 'p1',
        name: '商品列表圖',
        desc: '418*333',
        w: 418,
        h: 333
    },
    'p2': {
        key: 'p2',
        name: '商品內容-商品圖',
        desc: '575*549',
        w: 575,
        h: 549
    }
}

export const watermark = {
    'h': {
        key: '/D23-01940_1300X1656_h.png',
        name: '垂直',
        w: 1300,
        h: 1656
    },
    'v': {
        key: '/D23-01940_1656X890_v.png',
        name: '水平',
        w: 1656,
        h: 890
    }
}

export const position = {
    'left-top': {
        name: 'left-top',
    },
    'center-top': {
        name: 'center-top',
    },
    'right-top': {
        name: 'right-top',
    },
    'left-middle': {
        name: 'left-middle',
    },
    'center-middle': {
        name: 'center-middle',
    },
    'right-middle': {
        name: 'right-middle',
    },
    'left-bottom': {
        name: 'left-bottom',
    },
    'center-bottom': {
        name: 'center-bottom',
    },
    'right-bottom': {
        name: 'right-bottom',
    },
}