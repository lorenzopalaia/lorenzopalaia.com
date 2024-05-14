<template>
  <div class="container mx-auto my-auto h-screen">
    <div class="flex flex-col mx-8">
      <article class="prose">
        <router-link to="/" class="no-underline">
          <h4 class="mt-16 text-primary">
            <font-awesome-icon icon="fa-solid fa-arrow-left" class="mr-2" />
            Lorenzo Palaia
          </h4>
        </router-link>
        <h1 class="mb-16">Milestones</h1>
      </article>
      <div
        class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-16"
      >
        <div
          class="flex flex-col"
          v-for="milestone in milestones"
          :key="milestone.img"
        >
          <div class="text-center group">
            <div class="avatar">
              <div
                v-if="milestones && milestones.length === 0"
                class="skeleton w-24 h-24 rounded-full"
              ></div>
              <div v-else class="w-24 h-24 rounded-full">
                <img
                  :src="milestone.img"
                  class="scale-[1.75] group-hover:animate-pulse"
                />
              </div>
            </div>
            <p class="font-bold group-hover:text-primary">
              {{ milestone.name }}
            </p>
            <p>{{ milestone.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import milestones from "../assets/milestones.json";

export default {
  data: () => ({
    milestones: milestones.milestones,
  }),

  mounted() {
    document.title = "Milestones | Lorenzo Palaia";
    window.scrollTo(0, 0, "smooth");
  },
};
</script>

<style></style>
