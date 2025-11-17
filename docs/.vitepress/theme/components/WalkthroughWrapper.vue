<template>
  <div ref="container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { Walkthrough } from './Walkthrough'
import './Walkthrough.css'

const props = defineProps<{
  steps: any[]
  theme?: 'light' | 'dark' | 'auto'
  unifiedCode?: any
  minHeight?: string
  descriptionHeight?: string
}>()

const container = ref<HTMLDivElement>()
let root: Root | null = null

onMounted(() => {
  if (container.value) {
    root = createRoot(container.value)
    renderReact()
  }
})

onUnmounted(() => {
  root?.unmount()
})

watch(() => props, renderReact, { deep: true })

function renderReact() {
  if (root) {
    root.render(
      React.createElement(Walkthrough, {
        steps: props.steps,
        theme: props.theme || 'auto',
        unifiedCode: props.unifiedCode,
        minHeight: props.minHeight,
        descriptionHeight: props.descriptionHeight
      })
    )
  }
}
</script>