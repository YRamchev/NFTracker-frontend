<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <VAlert v-model="alert" dismissible v-if="!nftGroups.length">
      Click that button to make me go away
    </VAlert>
    <NftTable
      v-else
      :group="group"
      v-for="(group, index) in nftGroups"
      :class="{ 'mt-12': index > 0 }"
      :key="group.id"
    />
  </div>
</template>

<script>
import NftTable from "../components/NftTable.vue";
import { ref } from "vue";
import axios from "axios";
import { VAlert } from "vuetensils/src/components";
export default {
  components: {
    NftTable,
    VAlert,
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
