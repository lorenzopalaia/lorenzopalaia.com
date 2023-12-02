<template>
  <div class="container mx-auto my-auto">
    <article class="prose">
      <router-link to="/" class="no-underline">
        <h4 class="mt-16 text-primary">
          <font-awesome-icon icon="fa-solid fa-arrow-left" class="mr-2" />
          Lorenzo Palaia
        </h4>
      </router-link>
      <h1 class="mb-16">Work Experiences</h1>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Company</th>
              <th>Role</th>
              <th>Location</th>
              <th>Technologies</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="experience in workExperience" :key="experience">
              <td>{{ experience.date }}</td>
              <td>{{ experience.company }}</td>
              <td>{{ experience.role }}</td>
              <td>{{ experience.location }}</td>
              <td>
                <div
                  v-for="badge in experience.badges"
                  :key="badge"
                  class="badge badge-lg badge-secondary mr-2 mb-8"
                >
                  <p class="text-primary">{{ badge }}</p>
                </div>
              </td>
              <td>
                <a :href="experience.link" target="_blank">
                  {{ experience.link }}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
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
