<!--
 Author: I Love Study <1450069615@qq.com>
 Co-Author: Redlnn <w731347477@gmail.com>
-->

<script setup lang="ts">
interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: '你知道的太多了'
})
</script>

<template>
  <span :title="title" class="heimu" tabindex="-1">
    <slot></slot>
  </span>
</template>
