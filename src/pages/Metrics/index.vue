<template>
  <div>
    <table>
      <tr v-for="metric in metrics">
        <td>{{metric.code}}</td>
        <td>{{metric.amounts}}</td>
        <td>{{metric.date}}</td>
        <td>
          <button @click="editMetric(metric)">Edit</button>
          <button @click="deleteMetric(metric)">Delete</button>
        </td>
      </tr>
    </table>
    <button @click="addMetric">Add</button>
  </div>
</template>

<script>
import BackendService from './BackendService';

export default {
  data() {
    return {
      metrics: [],
      backendService: new BackendService(CHALLENGE_API_KEY),
    };
  },
  created() {
    this.getMetrics();
  },
  methods: {
    async getMetrics() {
      try {
        this.metrics = await this.backendService.getMetrics();
      } catch (error) {
        console.error(error);
      }
    },
    async addMetric() {
      try {
        // code to add a metric
      } catch (error) {
        console.error(error);
      }
    },
    async editMetric(metric) {
      try {
        // code to edit a metric
      } catch (error) {
        console.error(error);
      }
    },
    async deleteMetric(metric) {
      try {
        // code to delete a metric
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
