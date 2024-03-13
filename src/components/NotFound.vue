<template>
  <div
    class="container mx-auto my-auto h-screen flex items-center justify-center"
  >
    <div class="text-center">
      <article class="prose">
      <h1 class="text-6xl font-bold text-primary mb-4">404</h1>
      <p class="text-lg text-neutral-400 mb-8">Oops! Page not found.</p>
        <router-link to="/" class="no-underline">
          <h4 class="text-primary">
            <font-awesome-icon icon="fa-solid fa-arrow-left" class="mr-2" />
            Go back home
          </h4>
        </router-link>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.title = "Not Found | Lorenzo Palaia";
    window.scrollTo(0, 0, "smooth");
  },
};
</script>

<style></style>
