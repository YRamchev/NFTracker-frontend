<template>
  <Disclosure as="nav" class="bg-white" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="-ml-2 mr-2 flex items-center md:hidden"></div>
          <div class="flex-shrink-0 flex items-center">
            <router-link :to="{ name: 'home' }">
              <img
                class="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow" />
              <img
                class="hidden lg:block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                alt="Workflow"
            /></router-link>
          </div>
        </div>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <router-link
            :to="{ name: 'sign-in' }"
            class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Sign in
          </router-link>
          <router-link
            :to="{ name: 'sign-up' }"
            class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Sign up
          </router-link>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script setup>
import { Disclosure } from "@headlessui/vue";
</script>
