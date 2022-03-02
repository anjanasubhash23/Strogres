const initialState = {
    parseData: [],
    count: [],
    applied: []
}

const ApplicantHandler = (state = initialState, action) => {
    switch (action.type) {
        case "RESUME_DATA": {
            console.log("runingg.......")
            console.log(action.data)
            return {
                ...state,
                parseData: state.parseData.concat(action.data)
            }
        }
        case "FETCH_DATA": {
            return {
                ...state,
                count: action.data
            }
        }
        case "APPLY_DATA": {
            return {
                ...state,
                applied: action.data
            }
        }
        case "FETCH_APPLIED_DATA": {
            return {
                ...state,
                applied: action.data
            }
        }
        default: return state
    }

}

export default ApplicantHandler