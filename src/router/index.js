import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import WorkExperienceView from '../views/WorkExperienceView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import EducationView from '../views/EducationView.vue';
import ExtraActivitiesView from '../views/ExtraActivitiesView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const history = createWebHistory(import.meta.env.BASE_URL);

const router = createRouter({
  history: history,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/work-experience',
      name: 'work-experience',
      component: WorkExperienceView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
    },
    {
      path: '/education',
      name: 'education',
      component: EducationView,
    },
    {
      path: '/extra-activities',
      name: 'extra-activities',
      component: ExtraActivitiesView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFoundView,
    },
  ],
});

export default router;
