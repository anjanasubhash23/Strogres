class Job {
    constructor(id, jobPost, noOpening, jobDescription, skills, mode, type, lastdate, city) {
        this.id = id
        this.jobPost = jobPost
        this.noOpening = noOpening
        this.jobDescription = jobDescription
        this.skills = skills
        this.mode = mode
        this.type = type
        this.lastdate = lastdate
        this.city = city
    }
}

export default Job