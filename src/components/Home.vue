<template>
  <div class="container mx-auto my-auto">
    <div class="flex flex-col md:flex-row mx-8">
      <div class="md:w-1/2">
        <article class="prose mx-4" style="position: sticky; top: 4rem">
          <!-- info -->
          <h1 class="mb-4 mt-16">{{ info.name }}</h1>
          <h2 class="mt-0 mb-4 font-thin">{{ info.title }}</h2>
          <p class="font-light">{{ info.description }}</p>

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
          <section id="about" class="mb-32 mx-4 md:mt-16 mt-8">
            <p v-for="line in about" :key="line" class="font-light">{{ line }}</p>
            <a :href="info.socials.cal" target="_blank" class="no-underline">
              <p class="mb-32 group hover:underline decoration-primary">
                Book a Call
                <font-awesome-icon
                  icon="fa-solid fa-arrow-right"
                  class="ml-2 group-hover:ml-3"
                />
              </p>
            </a>
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
                <div class="w-1/4 mx-4" v-if="work.show">
                  <p class="uppercase font-light text-neutral-400 text-sm mt-6">{{ work.date }}</p>
                </div>
                <div class="w-3/4 mx-4" v-if="work.show">
                  <p class="group-hover/inside:text-primary text-neutral-300 font-normal mb-0">
                    {{ work.company }}
                    <font-awesome-icon
                      icon="fa-solid fa-arrow-right"
                      class="ml-2 group-hover/inside:ml-3"
                      v-if="work.url"
                    />
                  </p>
                  <p class="font-light text-neutral-400 mt-0">{{ work.role }}</p>
                  <p
                    v-for="description in work.description"
                    :key="description"
                    class="font-extralight"
                  >
                    {{ description }}
                  </p>
                  <div
                    v-for="badge in work.badges"
                    :key="badge"
                    class="badge badge-lg badge-secondary mr-2 mb-8"
                  >
                    <p class="text-primary font-light">{{ badge }}</p>
                  </div>
                </div>
              </div>
            </div>
            <router-link
              to="/work-experience"
              class="no-underline"
            >
              <p class="mb-32 mx-4 group hover:underline decoration-primary">
                View All Work Experiences
                <font-awesome-icon
                  icon="fa-solid fa-arrow-right"
                  class="ml-2 group-hover:ml-3"
                />
              </p>
            </router-link>
          </section>

          <!-- projects -->
          <section id="projects">
            <div v-if="projects && projects.length === 0">
              <div v-for="times in showedProjects.length" :key="times" class="skeleton w-full h-48 mb-8 opacity-50"></div>
            </div>
            <div v-else class="group">
              <div
                class="flex flex-col lg:flex-row group-hover:opacity-50 hover:bg-white/5 hover:!opacity-100 mb-8 rounded-md group/inside hover:border-t border-white/10 transition ease-in-out duration-250"

                :class="project.url ? 'cursor-pointer' : ''"
                v-for="project in projects"
                :key="project"
                @click="redirectToExternalLink(project.html_url)"
              >
                <div class="mx-4 order-2 lg:order-1 lg:w-1/4">
                  <img
                    :src="`https://raw.githubusercontent.com/lorenzopalaia/${project.name}/main/repo_assets/preview.png`"
                    alt="Project Preview"
                    class="lg:mt-6 mt-0 rounded"
                    style="border: 3px solid rgba(255, 255, 255, 0.075)"
                  />
                </div>
                <div class="w-3/4 mx-4 order-1">
                  <p class="group-hover/inside:text-primary lg:order-2 text-neutral-300 font-normal mb-0">
                    {{ project.name.replace(/-/g, " ") }}
                    <font-awesome-icon
                      icon="fa-solid fa-arrow-right"
                      class="ml-2 group-hover/inside:ml-3"
                    />
                  </p>
                  <p class="font-extralight">{{ project.description }}</p>
                  <p class="text-neutral-500">
                    <font-awesome-icon icon="fa-solid fa-star" class="mr-1" />
                    {{ project.stargazers_count }}
                  </p>
                  <div
                    v-for="language in project.languages"
                    :key="language"
                    class="badge badge-lg badge-secondary mr-2 mb-8"
                  >
                    <p class="text-primary font-light">{{ language }}</p>
                  </div>
                </div>
              </div>
            </div>
            <router-link
              to="/projects"
              class="no-underline"
            >
              <p class="mb-32 mx-4 group hover:underline decoration-primary">
                View All Projects
                <font-awesome-icon
                  icon="fa-solid fa-arrow-right"
                  class="ml-2 group-hover:ml-3"
                />
              </p>
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
                <div class="w-1/4 mx-4" v-if="degree.show">
                  <p class="uppercase font-light text-neutral-400 text-sm mt-6">{{ degree.date }}</p>
                </div>
                <div class="w-3/4 mx-4" v-if="degree.show">
                  <p class="group-hover/inside:text-primary text-neutral-300 font-normal mb-0">
                    {{ degree.degree }}
                    <font-awesome-icon
                      icon="fa-solid fa-arrow-right"
                      class="ml-2 group-hover/inside:ml-3"
                      v-if="degree.url"
                    />
                  </p>
                  <p class="font-light text-neutral-400 mt-0">{{ degree.school }}</p>
                  <p
                    v-for="description in degree.description"
                    :key="description"
                    class="font-extralight"
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
              <p class="mb-32 mx-4 group hover:underline decoration-primary">
                View All Education
                <font-awesome-icon
                  icon="fa-solid fa-arrow-right"
                  class="ml-2 group-hover:ml-3"
                />
              </p>
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
                <div class="w-1/4 mx-4" v-if="activity.show">
                  <p class="uppercase font-light text-neutral-400 text-sm mt-6">{{ activity.date }}</p>
                </div>
                <div class="w-3/4 mx-4" v-if="activity.show">
                  <p class="group-hover/inside:text-primary text-neutral-300 font-normal mb-0">
                    {{ activity.name }}
                    <font-awesome-icon
                      icon="fa-solid fa-arrow-right"
                      class="ml-2 group-hover/inside:ml-3"
                      v-if="activity.url"
                    />
                  </p>
                  <p class="font-light text-neutral-400 mt-0">{{ activity.role }}</p>
                  <p
                    v-for="description in activity.description"
                    :key="description"
                    class="font-extralight"
                  >
                    {{ description }}
                  </p>
                  <div
                    v-for="badge in activity.badges"
                    :key="badge"
                    class="badge badge-lg badge-secondary mr-2 mb-8"
                  >
                    <p class="text-primary font-light">{{ badge }}</p>
                  </div>
                </div>
              </div>
            </div>
              <router-link
                to="/extra-activities"
                class="no-underline"
              >
              <p class="mb-32 mx-4 group hover:underline decoration-primary">
                View All Extra Activities
                <font-awesome-icon
                  icon="fa-solid fa-arrow-right"
                  class="ml-2 group-hover:ml-3"
                />
              </p>
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
                <p class="uppercase font-light text-neutral-400 text-sm mt-1 mb-0">{{ skill.name }}</p>
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
                <p class="uppercase ont-light text-neutral-400 text-sm mt-1 mb-0">{{ language.name }}</p>
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
          <p class="mt-32 mb-16 mx-4 font-light">{{ footer }}</p>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import personalInfo from "../assets/personalInfo.json";
import { fetchRepos, redirectToExternalLink } from "../utils/api.js";

export default {
  data: () => ({
    info: personalInfo.info,
    about: personalInfo.about,
    workExperience: personalInfo.workExperience,
    education: personalInfo.education,
    extraActivities: personalInfo.extraActivities,
    skills: personalInfo.skills,
    languages: personalInfo.languages,
    footer: personalInfo.footer,
    showedProjects: personalInfo.showedProjects,
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
    async getReposAndFilter(username) {
      const data = await fetchRepos(username);
      this.projects = data.filter((repo) => this.showedProjects.includes(repo.name));
    },
    redirectToExternalLink,
    /*
    updateActiveSection(section) {
      this.activeSection = section;
      localStorage.setItem('activeSection', section);
    },
    */
  },

  async mounted() {
    document.title = "Lorenzo Palaia | Software Engineer";
    window.scrollTo(0, 0, "smooth");
    await this.getReposAndFilter("lorenzopalaia");
  },
};
</script>

<style scoped></style>
