const initialState = {
    parseData: [],
    count: [],
    applied: [],
    userData: null
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
        case "UPDATE_STATUS": {
            const index = state.count.findIndex(x => x.id === action.data.id)
            var newdata;
            if (action.data.type) {
                newdata = {
                    id: action.data.id,
                    url: state.count[index].url,
                    parsedata: state.count[index].parsedata,
                    jobid: state.count[index].jobid,
                    estatus: true,
                    status: state.count[index].status
                }
            }
            else {
                newdata = {
                    id: action.data.id,
                    url: state.count[index].url,
                    parsedata: state.count[index].parsedata,
                    jobid: state.count[index].jobid,
                    estatus: state.count[index].estatus,
                    status: action.data.status
                }



            }
            const updated = [...state.count]
            updated[index] = newdata
            return {
                ...state,
                count: updated
            }
        }
        case "APPLY_DATA": {
            return {
                ...state,
                applied: state.count.concat(action.data)
            }
        }
        case "FETCH_INFO": {
            return {
                ...state,
                userData: action.data
            }
        }
        case "SPECIFIC_DATA": {
            return {
                ...state,
                count: state.count.concat(action.data)
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