const initialState = {
    userid: null,
    token: null,
    userData: null
}

export const UserHandler = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_USER": {
            return {
                uid: action.uid,
                token: action.token
            }
        }
        case 'REGISTER_COMPANY': {
            return {
                ...state,
                uid: action.uid,
                token: action.token
            }
        }
        case 'REGISTER_APPLICANT': {
            return {
                ...state,
                uid: action.uid,
                token: action.token
            }
        }

        default: return state
    }
}