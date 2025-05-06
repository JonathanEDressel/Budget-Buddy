export default class UserProfile {
    Id = null;
    Name = '';
    // IncomePerPay = 0;
    Age = 0;
    // Salary = 0;
    PaycheckIncome = 0;
    PayPerYear = 12;
    RetirementAge = 65;
    LifeExpectancy = 85;
    
    //401(k) data
    PercentNeeded = 80;
    StartingBalance = 0;
    PercentDistrib = 0;
    PercentContrib = 0;
    PreRetireROR = 6;
    PostRetireROR = 4;


    constructor(data) {
        this.Id = data?.Id ?? null;
        this.Name = data?.Name ?? '';
        this.Age = data?.Age ?? 45;
        this.PaycheckIncome = data?.PaycheckIncome ?? 0;
        this.PayPerYear = data?.PayPerYear ?? 0;
        this.RetirementAge = data?.RetirementAge ?? 0;
        this.LifeExpectancy = data?.LifeExpectancy ?? 0;

        this.PercentNeeded = data?.PercentNeeded ?? 0;
        this.StartingBalance = data?.StartingBalance ?? 0;
        this.PercentContrib = data?.PercentContrib ?? 0;
        this.RetireContrib = data?.RetireContrib ?? 0;
        this.PreRetireROR = data?.PreRetireROR ?? 6;
        this.PostRetireROR = data?.PostRetireROR ?? 4;
    }

    dollarToInteger(data) {
        var value = data.toString();
        return parseInt(value.replace(/[$,]/g, ''), 10);
    }

    getAccumYears() {
        var res = this.RetirementAge - this.Age;
        if(res <= 0)
            return 'Not a valid entry';
        return res;
    }

    getRetirementYears() {
        var res = this.LifeExpectancy - this.RetirementAge;
        if (res <= 0)
            return 'Not a vlaid entry';
        return res;
    }

    getMonthlyIncome() {
        return (this.dollarToInteger(this.PayPerYear) * this.PaycheckIncome) / 12;
    }

    getAnnualIncome() {
        return this.PayPerYear * this.PaycheckIncome;
    }

    getMonthlyContribution() {
        var income = this.getMonthlyIncome();
        return income * this.PercentContrib;
    }

    getName() {
        return this.Name;
    }

    setName(newName) {
        this.Name = newName;
    }

    setId(newId) {
        this.Id = newId;
    }

    setEmail(newEmail) {
        this.Email = newEmail;
    }

    setAge(newAge) {
        this.Age = newAge;
    }

    setPayIncome(newIncome) {
        this.PaycheckIncome = newIncome;
    }

    setPPY(newPPY) {
        this.PayPerYear = newPPY;
    }

    setRetireAge(newRetAge) {
        this.RetirementAge = newRetAge;
    }

    setLifeExpect(newLifeExpect) {
        this.LifeExpectancy = newLifeExpect;
    }

    setPercentContrib(newPerContrib) {
        this.PercentConrtib = newPerContrib;
    }

    setPercentDistrib(newPercentDist) {
        this.PercentDistrib = newPercentDist;
    }
}