<template>
  <div id="app" class="app-main" @click="clicked">
    <transition name="fade" mode="out-in">
			<router-view v-if="isRouterAlive"></router-view>
		</transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  provide() {
    return {
      reload: this.reload
    }
  },
  data(){
    return {
      lTime: new Date().getTime(),
      cTime: new Date().getTime(),
      tOut: 30*60*1000,
      isRouterAlive: true
    }
  },
  mounted () {
    window.setInterval(this.tTime,1000);
  },
  methods: {
    clicked() {
      this.lTime = new Date().getTime()
    },
    tTime() {
      this.cTime = new Date().getTime()
      let token = sessionStorage.getItem('token')
      if(this.cTime-this.lTime > this.tOut) {
        this.$store.commit('$_removeStorage',token)
        this.$store.commit('clearAllPageTags');
        this.$router.push("/login");
      }
    },
    reload() {
      this.isRouterAlive = false;
      // setTimeout(() => {
      //   this.isRouterAlive = true
      // }, 200);
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  },
  created () {
    const token = sessionStorage.getItem('token')
    if(!token) {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
  @import "./styles/main.less";
</style>



<!--<template>
  <div id="app" class="app-main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
  @import "./styles/main.less";
</style>
