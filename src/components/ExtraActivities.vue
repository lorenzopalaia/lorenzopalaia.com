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
        <h1 class="mb-16">Extra Activities</h1>
      </article>
      <table class="table">
        <thead class="sticky top-0 backdrop-blur">
          <tr class="border-b-neutral-800">
            <th class="text-neutral-200 font-bold table-cell">Period</th>
            <th class="text-neutral-200 font-bold table-cell">Activty</th>
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
            v-for="activity in extraActivities"
            :key="activity"
            class="border-b-neutral-800"
          >
            <td class="text-neutral-400 font-light table-cell">
              {{ activity.date }}
            </td>
            <td class="text-neutral-200 font-bold table-cell">
              {{ activity.name }}
            </td>
            <td class="text-neutral-400 font-light table-cell">
              {{ activity.role }}
            </td>
            <td class="text-neutral-400 font-light hidden lg:table-cell">
              {{ activity.location }}
            </td>
            <td class="hidden lg:table-cell">
              <div
                v-for="badge in activity.badges"
                :key="badge"
                class="badge badge-lg badge-secondary m-1"
              >
                <p class="text-primary font-light">{{ badge }}</p>
              </div>
            </td>
            <td class="text-neutral-400 font-light hidden md:table-cell group">
              <a
                :href="activity.url"
                target="_blank"
                class="group-hover:text-primary transition duration-250 ease-in-out"
              >
                {{ activity.url.replace(/^(https?:\/\/)?(www\.)?/i, "") }}
                <font-awesome-icon
                  v-if="activity.url"
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
    extraActivities: personalInfo.extraActivities,
  }),

  mounted() {
    document.title = "Extra Activities | Lorenzo Palaia";
    window.scrollTo(0, 0, "smooth");
  },
};
</script>

<style></style>
