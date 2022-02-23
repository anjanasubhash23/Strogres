import Job from "../../model/Job"

const initialState = {
    job: []
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
                action.data.mode
            )
            return {
                ...state,
                job: state.job.concat(newJob)

            }
        }
        default: return state

    }

}

export default JobHandler