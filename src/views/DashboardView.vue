<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <NftTable :group="group" v-for="group in nftGroups" :key="group.id" />
  </div>
</template>

<script>
import NftTable from "../components/NftTable.vue";
import { ref } from "vue";
import axios from "axios";
export default {
  components: {
    NftTable,
  },
  setup() {
    const nftGroups = ref([]);

    (async () => {
      const { data } = await axios.get("/groups?populate=*");
      nftGroups.value = data.data;
    })();

    return {
      nftGroups,
    };
  },
};
</script>
