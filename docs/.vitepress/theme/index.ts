// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'
import { h } from 'vue'

import DocAfter from './DocAfter.vue'
import NotFound from './NotFound.vue'

import { FakeQQUI } from 'fake-qq-ui'

import Curtain from '../components/Curtain.vue'
import GitRepo from '../components/GitRepo.vue'
import Loading from '../components/Loading.vue'
import Mermaid from '../components/Mermaid'
import MoreInfo from '../components/MoreInfo.vue'
import ProjectInfo from '../components/ProjectInfo.vue'
import QWindow from '../components/QWindow.vue'
import RubyCurtain from '../components/RubyCurtain.vue'
import VolumeBar from '../components/VolumeBar.vue'

import '../styles/index.scss'
import 'fake-qq-ui/styles/style.css'
import 'fake-qq-ui/styles/light.scss'
import 'fake-qq-ui/styles/dark.scss'

import './fonts/HarmonyOS_Sans_SC.ttf?subsets'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(DocAfter),
      'not-found': () => h(NotFound)
    })
  },
  enhanceApp({ app }) {
    app.component('Curtain', Curtain)
    app.component('GitRepo', GitRepo)
    app.component('Loading', Loading)
    app.component('MoreInfo', MoreInfo)
    app.component('ProjectInfo', ProjectInfo)
    app.component('RubyCurtain', RubyCurtain)
    app.component('VolumeBar', VolumeBar)
    app.component('Mermaid', Mermaid)
    app.component('QWindow', QWindow)
    app.use(FakeQQUI)
  }
} satisfies Theme
