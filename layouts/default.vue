<template>
  <div class="layout">
    <div class="navigation">
      <nav>
        <NuxtLink to="/">Главная</NuxtLink>
        <NuxtLink to="/settings">Настройки</NuxtLink>
      </nav>
    </div>
    <slot />
  </div>
</template>

<style lang="scss">
@use "sass:map";
@use "~/assets/stylesheet/vars";
body {
  .layout {
    height: 100vh;
  }
}
.navigation {
  nav {
    font-size: 25px;
    font-weight: 900;
    letter-spacing: 0.13rem;
    padding: 35px;
  }

  nav a {
    padding-inline: 15px;
    &:hover {
      color: map.get(vars.$colors, "button-primary-default");
    }
  }
}
</style>
