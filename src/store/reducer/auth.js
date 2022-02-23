const initialState = {
    userid: null,
    token: null,
    userData: null,
    admin: null
}

export const UserHandler = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_USER": {
            return {
                userid: action.uid,
                token: action.token,
                admin: action.admin
            }
        }
        case 'REGISTER_COMPANY': {
            return {
                ...state,
                userid: action.uid,
                token: action.token
            }
        }
        case 'REGISTER_APPLICANT': {
            return {
                ...state,
                userid: action.uid,
                token: action.token
            }
        }
        case "LOGOUT": {
            return state
        }
        default: return state
    }
}