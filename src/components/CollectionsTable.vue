<template>
  <div
    class="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg"
  >
    <table class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
          ></th>
          <th
            scope="col"
            class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
          >
            Name
          </th>
          <th
            scope="col"
            class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
          >
            Currency
          </th>
          <th
            scope="col"
            class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
          ></th>
          <th
            scope="col"
            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          ></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <tr
          v-for="(collection, index) in [...collections].reverse()"
          :key="index"
        >
          <td
            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 w-1"
          >
            {{ index + 1 }}
          </td>
          <td
            class="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:table-cell"
          >
            {{ collection.name }}
          </td>
          <td
            class="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-900 lg:table-cell"
          >
            {{ collection.currency.toUpperCase() }}
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-1">
            <button
              type="button"
              class="inline-flex items-center px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit
            </button>
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-1">
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["collections"],
};
</script>
