const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {
  async index(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    //total de horas por dia de cada JOB em progresso
    let jobTotalHours = 0

    //map eu consigo retornar em uma variavel/constante o foreach não, map retorna um novo array com as coisas alteradas ou as mesma coisas caso nao tenha alteração
    const updatedJobs = jobs.map((job) => {
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      //somo as quantidades do status expecifica.
      statusCount[status] += 1;

      //total de horas por dia de cada JOB em progresso
      jobTotalHours = status == "progress" ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    //quant. de horas que quero trabalhar
    //                  -
    //quant. de horas/dias de cada job em progress
    const freeHours = profile["hours-per-day"] - jobTotalHours;

    return res.render("index", {
      jobs: updatedJobs,
      profile: profile,
      statusCount: statusCount,
      freeHours: freeHours,
    });
  },
};
