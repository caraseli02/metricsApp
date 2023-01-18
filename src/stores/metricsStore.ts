import { acceptHMRUpdate, defineStore } from 'pinia';
import { Metric } from '~/types/metric';
import {BackendService} from '../../services/backend';

const backendService = new BackendService(import.meta.env.CHALLENGE_API_KEY as string);

export const useMetricsStore = defineStore({
  id: 'metrics',
  state: () => {
    return {
      items: [] as Metric[],
      newItem: {} as Metric,
      showMetricDialog: false,
      submitted: false,
      deleteProductDialog: false,
      loading: false,
    }
  },
  actions: {
    async fetchMetrics() {
      this.loading = true
      const initialState = await backendService.getMetrics();
      this.items = JSON.parse(JSON.stringify(initialState));
      this.loading = false
    },
    async addMetric() {
      this.loading = true
      if(this.newItem){
      await backendService.addMetric(this.newItem).then((resolve) => {
        if(resolve){
          this.items.push(this.newItem as Metric);
        }
      })
      this.loading = false
    }

    },
    async updateMetric( metric: Metric, index: number) {
      this.loading = true
      await backendService.updateMetric(metric).then((resolve) => {
        if (index >= 0 && resolve) {
          this.items[index] = metric;
        }
      })
      this.loading = false
    },
    async deleteMetric( id: string) {
      this.loading = true
      await backendService.deleteMetric(id).then((resolve) => {
        if(resolve){
          const index = this.items.findIndex(m => m.id === id);
          if (index >= 0) {
            this.items.splice(index, 1);
          }
        }
      })
      this.loading = false;
    },
  },
  getters: {
    itemsLength: (state) => state.items.length,
  },

});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMetricsStore, import.meta.hot));
}
