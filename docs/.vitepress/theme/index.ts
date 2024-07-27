// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'

import Layout from './Layout.vue'

import Mermaid from '../mdEnhance/components/Mermaid'

import ChatFile from '../components/FakeQQ/ChatFile.vue'
import ChatImg from '../components/FakeQQ/ChatImg.vue'
import ChatMsg from '../components/FakeQQ/ChatMsg.vue'
import ChatQuote from '../components/FakeQQ/ChatQuote.vue'
import ChatToast from '../components/FakeQQ/ChatToast.vue'
import ChatVoice from '../components/FakeQQ/ChatVoice.vue'
import ChatWindow from '../components/FakeQQ/ChatWindow.vue'
import ForwardChat from '../components/FakeQQ/ForwardChat.vue'

import Curtain from '../components/Curtain.vue'
import GitRepo from '../components/GitRepo.vue'
import Loading from '../components/Loading.vue'
import MoreInfo from '../components/MoreInfo.vue'
import ProjectInfo from '../components/ProjectInfo.vue'
import RubyCurtain from '../components/RubyCurtain.vue'
import VolumeBar from '../components/VolumeBar.vue'

import { css } from './fonts/HarmonyOS_Sans_SC.ttf?subsets'
import '../styles/index.scss'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('ChatFile', ChatFile)
    app.component('ChatImg', ChatImg)
    app.component('ChatMsg', ChatMsg)
    app.component('ChatQuote', ChatQuote)
    app.component('ChatToast', ChatToast)
    app.component('ChatVoice', ChatVoice)
    app.component('ChatWindow', ChatWindow)
    app.component('ForwardChat', ForwardChat)

    app.component('Curtain', Curtain)
    app.component('GitRepo', GitRepo)
    app.component('Loading', Loading)
    app.component('MoreInfo', MoreInfo)
    app.component('ProjectInfo', ProjectInfo)
    app.component('RubyCurtain', RubyCurtain)
    app.component('VolumeBar', VolumeBar)

    app.component('Mermaid', Mermaid)
  }
} satisfies Theme
