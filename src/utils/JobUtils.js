module.exports = {
    remainingDays(job) {
      //ajuste no jobs
      //Calculo de tempo restante
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

      const createdDate = new Date(job.createdAt);

      // Fico sabendo qual o dia do vencimento
      const dueDay = createdDate.getDate() + Number(remainingDays);

      // fico sabendo qual a data futura
      const dueDateInMs = createdDate.setDate(dueDay);

      //dfierenca do dia atual com o dia do vencimento do projeto
      const timeDiffInMs = dueDateInMs - Date.now();

      //transformar dia em milliseconds
      const DayInMs = 1000 * 60 * 60 * 24;

      //Dias restantes em milliseconds
      const DayDiff = Math.ceil(timeDiffInMs / DayInMs);

      return DayDiff;
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"],
  }