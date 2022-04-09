class Job {
    constructor(id, jobPost, noOpening, jobDescription, skills, mode, type, lastdate, city, count, rank) {
        this.id = id
        this.jobPost = jobPost
        this.noOpening = noOpening
        this.jobDescription = jobDescription
        this.skills = skills
        this.mode = mode
        this.type = type
        this.lastdate = lastdate
        this.city = city
        this.count = count
        this.rank = rank
    }
}

export default Job