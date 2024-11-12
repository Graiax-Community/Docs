<script setup lang="ts">
import DefaultTheme from 'vitepress/theme-without-fonts'
import { useData } from 'vitepress'
import { useElementSize } from '@vueuse/core'
import { nextTick, provide, ref } from 'vue'

const getStatusBarHeightRef = ref<HTMLDivElement>()
const { height: viewHeight } = useElementSize(getStatusBarHeightRef)

const { isDark } = useData()

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  // 用于计算状态栏高度，不加的话在 Android 端 Chrome 和 Edge 动画会错位，Via 浏览器和 PC 端无影响
  const statusBarHeight = navigator.userAgent.includes('Android')
    ? viewHeight.value - innerHeight
    : 0

  const clipPath = [
    `circle(0px at ${x}px ${y + statusBarHeight}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y + statusBarHeight, innerHeight - y - statusBarHeight)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-top><slot name="doc-top"></slot></template>
    <template #doc-bottom><slot name="doc-bottom"></slot></template>
    <template #doc-footer-before><slot name="doc-footer-before"></slot></template>
    <template #doc-before><slot name="doc-before"></slot></template>
    <template #doc-after><slot name="doc-after"></slot></template>
    <template #sidebar-nav-before><slot name="sidebar-nav-before"></slot></template>
    <template #sidebar-nav-after><slot name="sidebar-nav-after"></slot></template>
    <template #aside-top><slot name="aside-top"></slot></template>
    <template #aside-bottom><slot name="aside-bottom"></slot></template>
    <template #aside-outline-before><slot name="aside-outline-before"></slot></template>
    <template #aside-outline-after><slot name="aside-outline-after"></slot></template>
    <template #aside-ads-before><slot name="aside-ads-before"></slot></template>
    <template #aside-ads-after><slot name="aside-ads-after"></slot></template>
    <template #home-hero-before><slot name="home-hero-before"></slot></template>
    <template #home-hero-info-before><slot name="home-hero-info-before"></slot></template>
    <template #home-hero-info><slot name="home-hero-info"></slot></template>
    <template #home-hero-info-after><slot name="home-hero-info-after"></slot></template>
    <template #home-hero-actions-after><slot name="home-hero-actions-after"></slot></template>
    <template #home-hero-image><slot name="home-hero-image"></slot></template>
    <template #home-hero-after><slot name="home-hero-after"></slot></template>
    <template #home-features-before><slot name="home-features-before"></slot></template>
    <template #home-features-after><slot name="home-features-after"></slot></template>
    <template #page-top><slot name="page-top"></slot></template>
    <template #page-bottom><slot name="page-bottom"></slot></template>
    <template #not-found><slot name="not-found"></slot></template>
    <template #layout-top><slot name="layout-top"></slot></template>
    <template #layout-bottom><slot name="layout-bottom"></slot></template>
    <template #nav-bar-title-before><slot name="nav-bar-title-before"></slot></template>
    <template #nav-bar-title-after><slot name="nav-bar-title-after"></slot></template>
    <template #nav-bar-content-before><slot name="nav-bar-content-before"></slot></template>
    <template #nav-bar-content-after><slot name="nav-bar-content-after"></slot></template>
    <template #nav-screen-content-before><slot name="nav-screen-content-before"></slot></template>
    <template #nav-screen-content-after><slot name="nav-screen-content-after"></slot></template>
  </DefaultTheme.Layout>
  <div id="get-status-bar-height" ref="getStatusBarHeightRef"></div>
</template>

<style>
#get-status-bar-height {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -999;
  width: 100vw;
  height: 100vh;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
  display: flex !important;
  justify-content: center;
  align-items: center;
}

.VPSwitchAppearance .check {
  transform: none !important;
  position: initial;
  box-shadow: initial;
}
</style>
