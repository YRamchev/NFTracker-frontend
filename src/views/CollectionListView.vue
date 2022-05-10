<template>
  <DashboardLayout>
    <div class="sm:flex sm:items-center mb-6">
      <div class="sm:flex-auto px-4 sm:px-6 md:px-0">
        <h1 class="text-2xl font-semibold text-gray-900">Your Collections</h1>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <router-link
          :to="{ name: 'collections-create' }"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          <PlusSmIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add collection
        </router-link>
      </div>
    </div>
    <CollectionsTable :collections="collections" />
  </DashboardLayout>
</template>

<script>
import DashboardLayout from "../layouts/DashboardLayout.vue";
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "../stores/auth.js";
import CollectionsTable from "../components/CollectionsTable.vue";
import { PlusSmIcon } from "@heroicons/vue/solid";

export default {
  components: { PlusSmIcon, DashboardLayout, CollectionsTable },
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
