import Job from "../../model/Job"

const initialState = {
    job: [],
    parseData: []
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
                action.data.city
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

        default: return state

    }

}

export default JobHandler