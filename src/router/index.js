import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import WorkExperienceView from '../views/WorkExperienceView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import EducationView from '../views/EducationView.vue';
import ExtraActivitiesView from '../views/ExtraActivitiesView.vue';

const router = createRouter({
  history: createWebHashHistory(),
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
  ],
});

export default router;
