<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog
      as="div"
      class="relative z-40 md:hidden"
      @close="sidebarOpen = false"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel
            class="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col"
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex-shrink-0 px-4 flex items-center">
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                alt="Workflow"
              />
            </div>
            <div class="mt-5 flex-1 h-0 overflow-y-auto">
              <nav class="px-2 space-y-1">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group rounded-md py-2 px-2 flex items-center text-base font-medium',
                  ]"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      item.current
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      'mr-4 flex-shrink-0 h-6 w-6',
                    ]"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </a>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
        <div class="flex-shrink-0 w-14">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Static sidebar for desktop -->
  <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
      <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4">
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
            alt="Workflow"
          />
        </div>
        <nav class="mt-5 flex-1 px-2 bg-white space-y-1">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="{ name: item.to }"
            class="link"
          >
            <component :is="item.icon" class="link__icon" aria-hidden="true" />
            {{ item.name }}
          </router-link>
        </nav>
      </div>
      <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
        <a
          href="#"
          class="flex-shrink-0 w-full group block"
          @click.prevent="signOut"
        >
          Sign out
        </a>
      </div>
    </div>
  </div>
  <div class="md:ml-64 flex flex-col flex-1">
    <div
      class="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100"
    >
      <button
        type="button"
        class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Open sidebar</span>
        <MenuIcon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
    <main class="flex-1">
      <div class="py-6 px-6">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  FolderIcon,
  HomeIcon,
  MenuIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/vue/outline";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.js";
export default {
  components: {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
    FolderIcon,
    HomeIcon,
    MenuIcon,
    UsersIcon,
    XIcon,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const sidebarOpen = ref(false);

    const navigation = [
      { name: "Dashboard", to: "dashboard", icon: HomeIcon },
      {
        name: "Collections",
        to: "collections",
        icon: FolderIcon,
      },
      { name: "NFTs", to: "nfts", icon: UsersIcon },
    ];

    function signOut() {
      authStore.signOut();
      router.push({
        name: "sign-in",
      });
    }

    return { signOut, sidebarOpen, navigation };
  },
};
</script>

<style lang="postcss">
.link {
  @apply flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900;
}

.link.router-link-active {
  @apply bg-gray-100 text-gray-900;
}

.link__icon {
  @apply mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500;
}

.link.router-link-active .link__icon {
  @apply text-gray-500;
}
</style>
