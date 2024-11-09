<template>
  <q-window title="转发的合并消息">
    <q-text name="爷">
      以图搜图
      <br />
      <img alt="涩图" style="margin-top: 5px" src="/images/guide/ero_pic_1.webp" />
    </q-text>
    <q-text is-bot name="EroEroBot" avatar="/avatar/ero.webp">
      <chat-quote name="爷">以图搜图</chat-quote>正在搜索，请稍后
    </q-text>
    <q-forward
      is-bot
      name="EroEroBot"
      avatar="/avatar/ero.webp"
      title="群聊"
      :contents="['爷: 相似度：96.87% ...', '爷: 相似度：95.54% ...', '爷: 相似度：87.62% ...']"
      counts="3"
    ></q-forward>
  </q-window>
</template>
