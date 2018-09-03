<template>
  <div id="app">
    <keep-alive exclude="Commit">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
</style>
