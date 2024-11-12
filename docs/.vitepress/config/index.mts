import { defineConfig } from 'vitepress'

import mdPlugin from './plugins'
import nav from './nav'
import sidebar from './sidebar'
import viteConfig from './vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',

  title: 'GraiaX 文档',
  description: 'Documentation by community of Graia Project.',

  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.png' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/mermaid@11.4.0/dist/mermaid.min.js' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    i18nRouting: true,
    logo: '/logo.svg',
    nav,
    sidebar,
    editLink: {
      pattern: 'https://github.com/GraiaCommunity/Docs/edit/remake/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/GraiaCommunity/Docs' }],
    footer: {
      message: 'MIT License',
      copyright: 'Copyright © 2024 Graia Community'
    },
    lastUpdatedText: '上次更新',
    algolia: {
      appId: 'VA229YZAO1',
      apiKey: '91fa3eb8adfd68b9adda9a7495c45944',
      indexName: 'graiax'
    },
    outlineTitle: '本页大纲',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    darkModeSwitchLabel: '黑暗模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部 ▲'
  },

  vite: viteConfig,

  markdown: {
    theme: {
      light: 'min-light',
      dark: 'one-dark-pro'
    },
    image: {
      lazyLoading: true
    },
    lineNumbers: true,
    config: mdPlugin
  },

  transformHead({ assets }) {
    // adjust the regex accordingly to match your font
    const HarmonySansFile = assets.find(() => /.+\.woff2/)
    if (HarmonySansFile) {
      return [
        [
          'link',
          {
            rel: 'preload',
            href: HarmonySansFile,
            as: 'font',
            type: 'font/woff2',
            crossorigin: ''
          }
        ]
      ]
    }
  }
})
