<template>
  <div>
    <!-- display metrics here -->
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
  },
};
</script>
