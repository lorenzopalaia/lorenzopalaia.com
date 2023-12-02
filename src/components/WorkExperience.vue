<template>
  <div class="container mx-auto my-auto">
    <div class="flex flex-col mx-8">
      <article class="prose">
        <router-link to="/" class="no-underline">
          <h4 class="mt-16 text-primary">
            <font-awesome-icon icon="fa-solid fa-arrow-left" class="mr-2" />
            Lorenzo Palaia
          </h4>
        </router-link>
        <h1 class="mb-16">Work Experiences</h1>
      </article>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th class="table-cell">Period</th>
              <th class="table-cell">Company</th>
              <th class="table-cell">Role</th>
              <th class="hidden md:table-cell">Location</th>
              <th class="hidden md:table-cell">Technologies</th>
              <th class="hidden md:table-cell">Link</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="experience in workExperience" :key="experience">
              <td class="table-cell">{{ experience.date }}</td>
              <td class="table-cell">{{ experience.company }}</td>
              <td class="table-cell">{{ experience.role }}</td>
              <td class="hidden md:table-cell">{{ experience.location }}</td>
              <td class="hidden md:table-cell">
                <div
                  v-for="badge in experience.badges"
                  :key="badge"
                  class="badge badge-lg badge-secondary mr-2 mb-2"
                >
                  <p class="text-primary">{{ badge }}</p>
                </div>
              </td>
              <td class="hidden md:table-cell">
                <a :href="experience.link" target="_blank">
                  {{ experience.link }}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import personalInfo from "../assets/personalInfo.json";

export default {
  data: () => ({
    workExperience: personalInfo.workExperience,
  }),
};
</script>

<style></style>
