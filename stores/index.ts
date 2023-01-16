import { defineStore } from 'pinia';
import { Metric } from '~/types/metric';
import BackendService from '../services/backend';

const backendService = new BackendService(CHALLENGE_API_KEY);

export const useStore = defineStore({
  id: 'metrics',
  state: () => {
    return {
      metrics: [] as Metric[],
    }
  },
  actions: {
    async fetchMetrics() {
      this.metrics = await backendService.getMetrics();
    },
    async addMetric(metric: Metric) {
      await backendService.addMetric(metric);
      this.metrics.push(metric);
    },
    async updateMetric( metric: Metric) {
      await backendService.updateMetric(metric);
      const index = this.metrics.findIndex(m => m.id === metric.id);
      if (index >= 0) {
        this.metrics[index] = metric;
      }
    },
    async deleteMetric( id: string) {
      await backendService.deleteMetric(id);
      const index = this.metrics.findIndex(m => m.id === id);
      if (index >= 0) {
        this.metrics.splice(index, 1);
      }
    },
  },
});
