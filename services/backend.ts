export class Metric{
	id: string;
	code: string;
	amounts: number[] | null;
	date: Date;

    constructor(id:string, code: string, amounts: number[] | null, date: Date) {
        this.id = id;
        this.code = code;
        this.amounts = amounts;
        this.date = date;
    }
}

export function generateId() {
  return Math.random().toString(36).substr(2, 3);
}

const metrics : Metric[] = [
    new Metric(generateId(), "Alpha", [123,23], new Date(2011,10,30)),
    new Metric(generateId(), "Beta", null, new Date(2022,2,28)),
    new Metric(generateId(), "Gamma", [0,1,2,3], new Date(2023,1,3)),
    new Metric(generateId(), "Delta", [23,0,100], new Date(2013,5,4)),
    new Metric(generateId(), "Epsilon", [0], new Date(2020,2,8)),
    new Metric(generateId(), "Zeta", [15,2,54,3,1,3,6,32], new Date(2021,2,3)),
];

const CHALLENGE_API_KEY = import.meta.env.CHALLENGE_API_KEY

export class BackendService {
	apiKey : string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async getMetrics(): Promise<Metric[]> {
        await this.delay(1000);
        if(this.apiKey !== CHALLENGE_API_KEY) { return Promise.reject("API Key is not valid!"); }
        return Promise.resolve(metrics);
    }

    async getMetric(id: string): Promise<Metric | undefined> {
        await this.delay(1000);
        if(this.apiKey !== CHALLENGE_API_KEY) { return Promise.reject("API Key is not valid!"); }
        return Promise.resolve(metrics.find(m => m.id === id));
    }

    async addMetric(metric: Metric): Promise<boolean> {
        await this.delay(1000);
        if(this.apiKey !== CHALLENGE_API_KEY) { return Promise.reject("API Key is not valid!"); }
        metrics.push(metric);
        console.log(metrics);

        return Promise.resolve(true);
    }

    async updateMetric(metric: Metric): Promise<boolean> {
        await this.delay(1000);
        if(this.apiKey !== CHALLENGE_API_KEY) { return Promise.reject("API Key is not valid!"); }
        const index = metrics.findIndex(m => m.id === metric.id);
        if (index >= 0) {
            metrics[index] = metric;
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    async deleteMetric(id: string): Promise<boolean> {
        await this.delay(1000);
        if(this.apiKey !== CHALLENGE_API_KEY) { return Promise.reject("API Key is not valid!"); }
        const index = metrics.findIndex(m => m.id === id);
        if (index >= 0) {
            metrics.splice(index, 1);
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    async delay(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}
