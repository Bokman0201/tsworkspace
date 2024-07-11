import { atom } from "recoil";


export const selectedDateState = atom({
    key: "selectedDateState",
    default: (() => {
        const today = new Date();
        return {
            year: today.getFullYear(),
            month: String(today.getMonth() + 1).padStart(2, '0'), // 월은 0부터 시작하므로 1을 더한 후 두 자리로 맞춤
            day: String(today.getDate()).padStart(2, '0') // 일도 두 자리로 맞춤
        };
    })()
});

export const selectedTimeState = atom({
    key:'selectedTimeState',
    default:null
})

