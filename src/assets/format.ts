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
    gap: number;
    row: number;
    col: number;
}
declare interface FormatTypes {
    [key: string]: FormatItemTypes
}

// w(unit: 1mm = 0.1cm)
// h(unit: 1mm = 0.1cm)
export const format:FormatTypes = {
    'p1': {
        key: 'p1',
        name: '1吋證件照',
        desc: '駕照、行照、身障手冊',
        w: 28,
        h: 35,
        gap: 15,
        row: 2,
        col: 4,
    },
    'p2': {
        key: 'p2',
        name: '2吋大頭照',
        desc: '護照、身分證、台胞證、外僑居留證',
        w: 35,
        h: 45,
        gap: 12.5,
        row: 2,
        col: 3
    },
    'c2': {
        key: 'c2',
        name: '2吋半身照',
        desc: '健保卡、履歷照、學生證、國際駕照、巴氏量表',
        w: 42,
        h: 47,
        gap: 10,
        row: 2,
        col: 3
    }
}
