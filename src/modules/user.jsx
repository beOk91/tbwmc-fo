/* 액션 타입 정의 - 액션 타입은 주로 대문자로 작성 */
const USER_INFO = 'user/USER_INFO';

/* 액션 생성함수 만들기 */
export const userInfo = () => ({ type: USER_INFO });

/* 초기 상태 선언 */
const initialState = {
    id: '',
    name: ''
};


/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function user(state = initialState, action) {

    switch (action.type) {
        case USER_INFO:
            return {
                ...state,
                id: action.id,
                name: action.name
            };
        default:
            return state;
    }
}
