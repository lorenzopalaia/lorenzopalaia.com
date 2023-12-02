<template>
  <div class="container mx-auto my-auto">
    <div class="flex flex-col md:flex-row mx-8">
      <div class="md:w-1/2">
        <article class="prose mx-4" style="position: sticky; top: 4rem">
          <!-- info -->
          <h1 class="mb-4 mt-16">{{ info.name }}</h1>
          <h4 class="mt-0 mb-4">{{ info.title }}</h4>
          <p>{{ info.description }}</p>

          <!-- nav -->
          <!--
          <div class="group mt-2" v-for="item in nav" :key="item">
            <hr
              class="inline-flex w-8 group-hover:w-16 mt-0 mb-1 mr-2 rounded bg-gray-500 group-hover:bg-neutral-300 transition ease-in-out duration-500"
              :class="{ 'bg-neutral-300': activeSection === item, 'bg-gray-500': activeSection !== item }"
            />
            <a
              :href="`#${item}`"
              class="no-underline uppercase text-gray-500 group-hover:text-neutral-300"
              :class="{ 'text-white': activeSection === item, 'text-gray-500': activeSection !== item }"
              @click="updateActiveSection(item)"
            >{{ item.name }}</a>
          </div>
          -->

          <!-- socials -->
          <div class="mt-8">
            <font-awesome-icon
              icon="fa-brands fa-github"
              size="2xl"
              class="mr-4 text-gray-500 hover:text-neutral-300 cursor-pointer"
              @click="redirectToExternalLink(info.socials.github)"
            />
            <font-awesome-icon
              icon="fa-brands fa-linkedin"
              size="2xl"
              class="mr-4 text-gray-500 hover:text-neutral-300 cursor-pointer"
              @click="redirectToExternalLink(info.socials.linkedin)"
            />
            <font-awesome-icon
              icon="fa-solid fa-envelope"
              size="2xl"
              class="mr-4 text-gray-500 hover:text-neutral-300 cursor-pointer"
              @click="redirectToExternalLink(`mailto:${info.socials.mail}`)"
            />
          </div>

        </article>
      </div>
      <div class="md:w-1/2">
        <article class="prose">
          <!-- about -->
          <section id="about">
            <p class="mb-32 mx-4 md:mt-16 mt-8">{{ about }}</p>
          </section>

          <!-- work experience -->
          <section id="workExperience">
            <div class="group">
              <div
                class="flex group-hover:opacity-50 hover:bg-white/5 hover:!opacity-100 mb-8 rounded-md group/inside hover:border-t border-white/10 transition ease-in-out duration-250"
                :class="work.url ? 'cursor-pointer' : ''"
                v-for="work in workExperience"
                :key="work"
                @click="redirectToExternalLink(work.url)"
              >
                <div class="w-1/4 mx-4">
                  <p class="uppercase">{{ work.date }}</p>
                </div>
                <div class="w-3/4 mx-4">
                  <h4 class="group-hover/inside:text-primary">
                    {{ work.company }}
                    <font-awesome-icon
                      icon="fa-solid fa-arrow-right"
                      class="ml-2 group-hover/inside:ml-3"
                      v-if="work.url"
                    />
                  </h4>
                  <p
                    v-for="description in work.description"
                    :key="description"
                  >
                    {{ description }}
                  </p>
                  <div
                    v-for="badge in work.badges"
                    :key="badge"
                    class="badge badge-lg badge-secondary mr-2 mb-8"
                  >
                    <p class="text-primary">{{ badge }}</p>
                  </div>
                </div>
              </div>
            </div>
            <router-link
              to="/work-experience"
              class="no-underline"
            >
              <h4 class="mb-32 mx-4 group hover:underline decoration-primary">
                View All Work Experiences
                <font-awesome-icon
                  icon="fa-solid fa-arrow-right"
                  class="ml-2 group-hover:ml-3"
                />
              </h4>
            </router-link>
          </section>

          <!-- projects -->
          <section id="projects">
            <div class="group">
              <div
                class="flex flex-col lg:flex-row group-hover:opacity-50 hover:bg-white/5 hover:!opacity-100 mb-8 rounded-md group/inside hover:border-t border-white/10 transition ease-in-out duration-250"
                :class="project.url ? 'cursor-pointer' : ''"
                v-for="project in latest_projects"
                :key="project"
                @click="redirectToExternalLink(project.html_url)"
              >
                <div class="mx-4 order-2 lg:order-1 lg:w-1/4">
                  <img
                    :src="`https://raw.githubusercontent.com/lorenzopalaia/${project.name}/main/repo_assets/preview.png`"
                    alt="Project Preview"
                    class="mt-4 rounded"
                    style="border: 3px solid rgba(255, 255, 255, 0.075)"
                  />
                </div>
                <div class="w-3/4 mx-4 order-1">
                  <h4 class="group-hover/inside:text-primary lg:order-2">
                    {{ project.name.replace(/-/g, " ") }}
                    <font-awesome-icon
                      icon="fa-solid fa-arrow-right"
                      class="ml-2 group-hover/inside:ml-3"
                    />
                  </h4>
                  <p>{{ project.description }}</p>
                  <p>
                    <font-awesome-icon icon="fa-solid fa-star" class="mr-1" />
                    {{ project.stargazers_count }}
                  </p>
                  <div
                    v-for="language in project.languages"
                    :key="language"
                    class="badge badge-lg badge-secondary mr-2 mb-8"
                  >
                    <p class="text-primary">{{ language }}</p>
                  </div>
                </div>
              </div>
            </div>
            <router-link
              to="/projects"
              class="no-underline"
            >
              <h4 class="mb-32 mx-4 group hover:underline decoration-primary">
                View All Projects
                <font-awesome-icon
                  icon="fa-solid fa-arrow-right"
                  class="ml-2 group-hover:ml-3"
                />
              </h4>
            </router-link>
          </section>

          <!-- education -->
          <section id="education">
            <div class="group">
              <div
                class="flex group-hover:opacity-50 hover:bg-white/5 hover:!opacity-100 mb-8 rounded-md group/inside hover:border-t border-white/10 transition ease-in-out duration-250"
                :class="degree.url ? 'cursor-pointer' : ''"
                v-for="degree in education"
                :key="degree"
                @click="redirectToExternalLink(degree.url)"
              >
                <div class="w-1/4 mx-4">
                  <p class="uppercase">{{ degree.date }}</p>
                </div>
                <div class="w-3/4 mx-4">
                  <h4 class="group-hover/inside:text-primary">
                    {{ degree.degree }}
                    <font-awesome-icon
                      icon="fa-solid fa-arrow-right"
                      class="ml-2 group-hover/inside:ml-3"
                      v-if="degree.url"
                    />
                  </h4>
                  <p
                    v-for="description in degree.description"
                    :key="description"
                  >
                    {{ description }}
                  </p>
                </div>
              </div>
            </div>
            <router-link
              to="/education"
              class="no-underline"
            >
              <h4 class="mb-32 mx-4 group hover:underline decoration-primary">
                View All Education
                <font-awesome-icon
                  icon="fa-solid fa-arrow-right"
                  class="ml-2 group-hover:ml-3"
                />
              </h4>
            </router-link>
          </section>

          <!-- extra activities -->
          <section id="extraActivities">
            <div class="group">
              <div
                class="flex group-hover:opacity-50 hover:bg-white/5 hover:!opacity-100 mb-8 rounded-md group/inside hover:border-t border-white/10 transition ease-in-out duration-250"
                :class="activity.url ? 'cursor-pointer' : ''"
                v-for="activity in extraActivities"
                :key="activity"
                @click="redirectToExternalLink(activity.url)"
              >
                <div class="w-1/4 mx-4">
                  <p class="uppercase">{{ activity.date }}</p>
                </div>
                <div class="w-3/4 mx-4">
                  <h4 class="group-hover/inside:text-primary">
                    {{ activity.name }}
                    <font-awesome-icon
                      icon="fa-solid fa-arrow-right"
                      class="ml-2 group-hover/inside:ml-3"
                      v-if="activity.url"
                    />
                  </h4>
                  <p
                    v-for="description in activity.description"
                    :key="description"
                  >
                    {{ description }}
                  </p>
                  <div
                    v-for="badge in activity.badges"
                    :key="badge"
                    class="badge badge-lg badge-secondary mr-2 mb-8"
                  >
                    <p class="text-primary">{{ badge }}</p>
                  </div>
                </div>
              </div>
            </div>
              <router-link
                to="/extra-activities"
                class="no-underline"
              >
              <h4 class="mb-32 mx-4 group hover:underline decoration-primary">
                View All Extra Activities
                <font-awesome-icon
                  icon="fa-solid fa-arrow-right"
                  class="ml-2 group-hover:ml-3"
                />
              </h4>
            </router-link>
          </section>

          <!-- skills -->
          <section id="skills">
            <div
              class="flex flex-col lg:flex-row mb-8"
              v-for="skill in skills"
              :key="skill"
            >
              <div class="w-1/4 mx-4">
                <p class="uppercase mt-0 mb-0">{{ skill.name }}</p>
              </div>
              <div class="w-3/4 mx-4">
                <progress
                  class="progress progress-primary"
                  :value="skill.value"
                  max="100"
                ></progress>
              </div>
            </div>
          </section>

          <!-- languages -->
          <section id="languages">
            <div class="mt-16"></div>
            <div
              class="flex flex-col lg:flex-row mb-8"
              v-for="language in languages"
              :key="language"
            >
              <div class="w-1/4 mx-4">
                <p class="uppercase mt-0 mb-0">{{ language.name }}</p>
              </div>
              <div class="w-3/4 mx-4">
                <progress
                  class="progress progress-primary"
                  :value="language.value"
                  max="100"
                ></progress>
              </div>
            </div>
          </section>

          <!-- footer -->
          <p class="mt-32 mb-16 mx-4">{{ info.footer }}</p>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import personalInfo from "../assets/personalInfo.json";

export default {
  data: () => ({
    info: personalInfo.info,
    about: personalInfo.about,
    workExperience: personalInfo.workExperience,
    education: personalInfo.education,
    extraActivities: personalInfo.extraActivities,
    skills: personalInfo.skills,
    languages: personalInfo.languages,
    projects: [],
    /*
    nav: [
      { name: "About", id: "about" },
      { name: "Work Experience", id: "workExperience" },
      { name: "Projects", id: "projects" },
      { name: "Education", id: "education" },
      { name: "Extra Activities", id: "extraActivities" },
      { name: "Skills", id: "skills" },
      { name: "Languages", id: "languages" },
    ],
    */
    //activeSection: "",
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
      //console.log(data);
      this.projects = data;
    },
    redirectToExternalLink(url) {
      if (url) window.open(url, "_blank");
    },
    /*
    updateActiveSection(section) {
      this.activeSection = section;
      localStorage.setItem('activeSection', section);
    },
    */
  },

  async mounted() {
    await this.getRepos();
  },

  created() {
    document.title = this.info.name;
  },

  computed: {
    // view of repos with only the first 3 entries
    latest_projects() {
      return this.projects.slice(0, 3);
    },
  },
};
</script>

<style scoped></style>
