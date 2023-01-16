/* 액션 타입 정의 - 액션 타입은 주로 대문자로 작성 */
const LOGIN_INFO = 'login/LOGIN_INFO';

/* 액션 생성함수 만들기 */
export const loginInfo = () => ({ type: LOGIN_INFO });

/* 초기 상태 선언 */
const initialState = {
    id: '',
    user: '',
    email: ''
};


/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function login(state = initialState, action) {

    switch (action.type) {
        case LOGIN_INFO:
            return {
                ...state,
                id: action.id,
                user: action.user,
                email: action.email
            };
        default:
            return state;
    }
}
