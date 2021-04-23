const Profile = require("../model/Profile");

module.exports = {
    async index(req,res){
        return res.render('profile', {profile: await Profile.get()})
    },
    
    async update(req,res){
        //req.body para pegar os dados
        const data = req.body

        //quantas semanas tem num ano: 52
        const weeksPerYear = 52

        //remover as semanas de ferias do ano, para pegar quantas semanas tem um mês
        const weekPerMonth = (weeksPerYear - data['vacation-per-year']) / 12

        //total de horas trabalhadas na semana
        const weekTotalHours = data['hours-per-day'] * data['days-per-week']
        
        //total de horas trabalhadas no mês
        const monthlyTotalHours = weekTotalHours * weekPerMonth

        //qual será o valor da minha hora
        const valueHour = data['monthly-budget'] / monthlyTotalHours

        const profile = Profile.get()

        await Profile.update({
            ...profile,
            ...req.body,
            "value-hour": valueHour
        })
    
        return res.redirect('/profile')
    }
}