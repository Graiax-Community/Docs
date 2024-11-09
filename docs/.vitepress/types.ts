/// <reference types="vite/client" />
/// <reference types="fake-qq-ui/client" />

import Curtain from './components/Curtain.vue'
import GitRepo from './components/GitRepo.vue'
import Loading from './components/Loading.vue'
import Mermaid from './components/Mermaid'
import MoreInfo from './components/MoreInfo.vue'
import ProjectInfo from './components/ProjectInfo.vue'
import QWindow from './components/QWindow.vue'
import RubyCurtain from './components/RubyCurtain.vue'
import VolumeBar from './components/VolumeBar.vue'

declare module 'vue' {
  export interface GlobalComponents {
    Comment: typeof Comment
    Curtain: typeof Curtain
    GitRepo: typeof GitRepo
    Loading: typeof Loading
    Mermaid: typeof Mermaid
    MoreInfo: typeof MoreInfo
    ProjectInfo: typeof ProjectInfo
    QWindow: typeof QWindow
    RubyCurtain: typeof RubyCurtain
    VolumeBar: typeof VolumeBar
  }
}
