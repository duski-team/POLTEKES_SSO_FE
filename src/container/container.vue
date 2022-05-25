<template>
  <div>
    <Header />
    <div class="body">
      <main class="main">
        <div class="container-fluid">
          <transition name="fade" mode="out-in">
            <router-view :key="$route.path"></router-view>
          </transition>
        </div>
      </main>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
  data() {},
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
