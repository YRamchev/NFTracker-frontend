<template>
  <DashboardLayout>
    <div class="px-4 sm:px-6 md:px-0 mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
    </div>
    <router-link
      :to="{ name: 'collections-create' }"
      class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      v-if="!collections.length"
    >
      <FolderIcon class="mx-auto h-12 w-12 text-gray-400" />

      <p class="mt-2 block text-sm font-medium text-gray-900">
        You don't have any collections created.
      </p>
      <p class="mt-2 block text-sm font-medium text-gray-900">
        Click here to create a new one.
      </p>
    </router-link>

    <DashboardTable
      v-else
      :collection="collection"
      v-for="(collection, index) in collections"
      :class="{ 'mt-12': index > 0 }"
      :key="collection.id"
    />
  </DashboardLayout>
</template>

<script>
import DashboardLayout from "../layouts/DashboardLayout.vue";
import { ref } from "vue";
import axios from "axios";
import { FolderIcon } from "@heroicons/vue/outline";
import { useAuthStore } from "../stores/auth.js";
import DashboardTable from "../components/DashboardTable.vue";
export default {
  components: {
    DashboardLayout,
    FolderIcon,
    DashboardTable,
  },
  setup() {
    const collections = ref([]);

    (async () => {
      const { user } = useAuthStore();

      const { data } = await axios.get(`/collections?user=${user.id}`);
      console.log(data);
      collections.value = data;
    })();

    return {
      collections,
    };
  },
};
</script>
