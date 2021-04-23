const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  create(req, res) {
    return res.render("job");
  },

  async save(req, res) {

    Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      createdAt: Date.now(), //atribuindo data de hoje
    });

    return res.redirect("/");
  },

  async show(req, res) {
    const JobId = req.params.id; // pego os dados inseridos no URL depois do caminho
    const jobs = await Job.get();

    const job = jobs.find((job) => Number(job.id) === Number(JobId));

    if (!job) {
      return res.send("Job não encontrado!");
    }

    const profile = await Profile.get();

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },

  async update(req, res) {
    const jobId = req.params.id; // pego os dados inseridos no URL depois do caminho
    
    const updatedJob = {
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };

    Job.update(updatedJob, jobId);

    res.redirect("/job/" + jobId);
  },

  async delete(req, res) {
    const jobId = req.params.id; // pego os dados inseridos no URL depois do caminho

    await Job.delete(jobId);

    return res.redirect("/");
  },
};
