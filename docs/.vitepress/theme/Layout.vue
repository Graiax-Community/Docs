<script setup lang="ts">
import DefaultTheme from 'vitepress/theme-without-fonts'
import { useData } from 'vitepress'
import { nextTick, provide, ref } from 'vue'
import { useElementSize, useWindowSize } from '@vueuse/core'

const getStatusBarHeightRef = ref<HTMLDivElement>()
const { height: windowHeight } = useWindowSize()
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
  const statusBarHeight = viewHeight.value - windowHeight.value

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
  <DefaultTheme.Layout />
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
