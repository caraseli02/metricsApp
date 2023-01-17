import { defineStore } from 'pinia';
import { Metric } from '~/types/metric';
import {BackendService} from '../../services/backend';

const backendService = new BackendService(import.meta.env.CHALLENGE_API_KEY as string);

export const useMetricsStore = defineStore({
  id: 'metrics',
  state: () => {
    return {
      items: [] as Metric[],
    }
  },
  actions: {
    async fetchMetrics() {
      this.items = await backendService.getMetrics();
    },
    async addMetric(metric: Metric) {
      this.items.push(metric);
    },
    async updateMetric( metric: Metric) {
      await backendService.updateMetric(metric);
      const index = this.items.findIndex(m => m.id === metric.id);
      if (index >= 0) {
        this.items[index] = metric;
      }
    },
    async deleteMetric( id: string) {
      await backendService.deleteMetric(id);
      const index = this.items.findIndex(m => m.id === id);
      if (index >= 0) {
        this.items.splice(index, 1);
      }
    },
  },
});
