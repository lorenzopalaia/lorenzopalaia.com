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
        <h1 class="mb-16">Projects</h1>
      </article>
      <div v-if="projects && projects.length === 0">
        <div class="skeleton w-full h-48 mb-8 opacity-50"></div>
      </div>
      <table v-else class="table">
        <thead class="sticky top-0 backdrop-blur">
          <tr class="border-b-neutral-800">
            <th class="text-neutral-200 font-bold table-cell">Updated</th>
            <th class="text-neutral-200 font-bold hidden lg:table-cell">
              Started
            </th>
            <th class="text-neutral-200 font-bold table-cell">Project</th>
            <th class="text-neutral-200 font-bold hidden md:table-cell">
              Technologies
            </th>
            <th class="text-neutral-200 font-bold hidden xl:table-cell">
              Link
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="project in projects"
            :key="project"
            class="border-b-neutral-800"
          >
            <td class="text-neutral-400 font-light table-cell">
              {{
                new Date(project.pushed_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })
              }}
            </td>
            <td class="text-neutral-400 font-light hidden lg:table-cell">
              {{ new Date(project.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              }) }}
            </td>
            <td class="text-neutral-200 font-bold table-cell">
              {{ project.name.replace(/-/g, " ") }}
            </td>
            <td class="hidden xl:table-cell">
              <div
                v-for="language in project.languages"
                :key="language"
                class="badge badge-lg badge-secondary m-1"
              >
                <p class="text-primary">{{ language }}</p>
              </div>
            </td>
            <td class="text-neutral-400 font-light hidden md:table-cell group">
              <a
                :href="project.html_url"
                target="_blank"
                class="group-hover:text-primary transition duration-250 ease-in-out"
              >
                {{ project.html_url.replace(/^(https?:\/\/)?(www\.)?/i, "") }}
                <font-awesome-icon
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
export default {
  data: () => ({
    projects: [],
  }),

  methods: {
    async getRepos() {
      const response = await fetch(
        "https://api.github.com/users/lorenzopalaia/repos"
      );
      const data = await response.json();
      data.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
      for (let i = 0; i < data.length; i++) {
        const response = await fetch(data[i].languages_url);
        const languages = await response.json();
        data[i].languages = Object.keys(languages);
      }
      console.log(data);
      this.projects = data;
    },
    redirectToExternalLink(url) {
      if (url) window.open(url, "_blank");
    },
  },

  mounted() {
    document.title = "Projects | Lorenzo Palaia";
    window.scrollTo(0, 0, "smooth");
    this.getRepos();
  },
};
</script>

<style></style>
