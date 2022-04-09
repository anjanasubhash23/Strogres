import Job from "../../model/Job"

const initialState = {
    job: [],
    parseData: [],
    appJob: []
}

const JobHandler = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_JOB": {
            const newJob = new Job(
                action.data.id,
                action.data.jobPost,
                action.data.noOpening,
                action.data.jobDescription,
                action.data.skills,
                action.data.mode,
                action.data.type,
                action.data.lastdate,
                action.data.city,
                action.data.count
            )
            return {
                ...state,
                job: state.job.concat(newJob)

            }
        }

        case "FETCH_JOB": {
            return {
                ...state,
                job: action.data
            }
        }
        case "DELETE_JOB": {
            return {
                ...state,
                job: state.job.filter(x => x.id !== action.id)
            }
        }
        case "DISPLAY_JOB": {
            return {
                ...state,
                appJob: action.data
            }
        }
        case "RANKED_DATA": {
            const index = state.count.findIndex(x => x.id === action.data.id)
            var newdata =
                new Job(
                    action.data.id,
                    state.job[index].jobPost,
                    state.job[index].noOpening,
                    state.job[index].jobDescription,
                    state.job[index].skills,
                    state.job[index].mode,
                    state.job[index].type,
                    state.job[index].lastdate,
                    state.job[index].city,
                    action.data.count,
                    action.data.list
                )


            const updated = [...state.count]
            updated[index] = newdata
            return {
                job: updated
            }
        }

        default: return state

    }

}

export default JobHandler