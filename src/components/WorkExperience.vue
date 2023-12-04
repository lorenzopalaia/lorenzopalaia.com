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
        <h1 class="mb-16">Work Experience</h1>
      </article>
      <table class="table">
        <thead class="sticky top-0 backdrop-blur">
          <tr class="border-b-neutral-800">
            <th class="text-neutral-200 font-bold table-cell">Period</th>
            <th class="text-neutral-200 font-bold table-cell">Company</th>
            <th class="text-neutral-200 font-bold table-cell">Role</th>
            <th class="text-neutral-200 font-bold hidden lg:table-cell">
              Location
            </th>
            <th class="text-neutral-200 font-bold hidden lg:table-cell">
              Technologies
            </th>
            <th class="text-neutral-200 font-bold hidden md:table-cell">
              Link
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="experience in workExperience"
            :key="experience"
            class="border-b-neutral-800"
          >
            <td class="text-neutral-400 font-light table-cell">
              {{ experience.date }}
            </td>
            <td class="text-neutral-200 font-bold table-cell">
              {{ experience.company }}
            </td>
            <td class="text-neutral-400 font-light table-cell">
              {{ experience.role }}
            </td>
            <td class="text-neutral-400 font-light hidden lg:table-cell">
              {{ experience.location }}
            </td>
            <td class="hidden lg:table-cell">
              <div
                v-for="badge in experience.badges"
                :key="badge"
                class="badge badge-lg badge-secondary m-1"
              >
                <p class="text-primary font-light">{{ badge }}</p>
              </div>
            </td>
            <td class="text-neutral-400 font-light hidden md:table-cell group">
              <a
                :href="experience.url"
                target="_blank"
                class="group-hover:text-primary transition duration-250 ease-in-out"
              >
                {{ experience.url.replace(/^(https?:\/\/)?(www\.)?/i, "") }}
                <font-awesome-icon
                  v-if="experience.url"
                  icon="fa-solid fa-arrow-right"
                  class="ml-2"
                />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import personalInfo from "../assets/personalInfo.json";

export default {
  data: () => ({
    workExperience: personalInfo.workExperience,
  }),

  mounted() {
    document.title = "Work Experience | Lorenzo Palaia";
    window.scrollTo(0, 0);
  },
};
</script>

<style></style>
