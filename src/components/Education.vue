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
        <h1 class="mb-16">Education</h1>
      </article>
      <table class="table">
        <thead class="sticky top-0 backdrop-blur">
          <tr class="border-b-neutral-800">
            <th class="text-neutral-200 font-bold table-cell">Period</th>
            <th class="text-neutral-200 font-bold table-cell">Degree</th>
            <th class="text-neutral-200 font-bold table-cell">School</th>
            <th class="text-neutral-200 font-bold hidden lg:table-cell">
              Location
            </th>
            <th class="text-neutral-200 font-bold hidden md:table-cell">
              Link
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="edu in education"
            :key="edu"
            class="border-b-neutral-800"
          >
            <td class="text-neutral-400 font-light table-cell">
              {{ edu.date }}
            </td>
            <td class="text-neutral-200 font-bold table-cell">
              {{ edu.degree }}
            </td>
            <td class="text-neutral-400 font-light table-cell">
              {{ edu.school }}
            </td>
            <td class="text-neutral-400 font-light hidden lg:table-cell">
              {{ edu.location }}
            </td>
            <td class="text-neutral-400 font-light hidden md:table-cell group">
              <a
                :href="edu.url"
                target="_blank"
                class="group-hover:text-primary transition duration-250 ease-in-out"
              >
                {{ edu.url.replace(/^(https?:\/\/)?(www\.)?/i, '') }}
                <font-awesome-icon
                  v-if="edu.url"
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
    education: personalInfo.education,
  }),

  mounted() {
    document.title = "Education | Lorenzo Palaia";
    window.scrollTo(0, 0, "smooth");
  },
};
</script>

<style></style>
