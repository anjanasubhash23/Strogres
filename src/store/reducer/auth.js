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
        case "FETCH_COMPANY": {
            return {
                ...state,
                userData: {
                    id: action.data[0].id,
                    name: action.data[0].companyname,
                    about: action.data[0].about,
                    email: action.data[0].email,
                    hrname: action.data[0].hrname
                }
            }
        }
        case "FETCH_APPLICANT": {
            return {
                ...state,
                userData: {
                    id: action.data[0].id,
                    name: action.data[0].firstname,
                    lastname: action.data[0].lastname,
                    email: action.data[0].email,
                    city: action.data[0].city,
                    job: action.data[0].job,
                    url: action.data[0].url
                }
            }
        }
        case "LOGOUT": {
            return state
        }
        default: return state
    }
}