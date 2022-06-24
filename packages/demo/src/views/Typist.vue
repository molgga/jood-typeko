<template>
  <div>
    <div>
      <button @click="onStart">start</button>
    </div>
    <div class="output">{{ output }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { typingMatrix } from '@jood/typeko-core';
import { ManualTypist } from '@jood/typeko-typist';

export default defineComponent({
  setup() {
    const output = ref('');
    const manual = new ManualTypist();
    manual.setSourceMatrix(
      typingMatrix(`안녕하세요. 반값습니다.
가끔 필요할때가 있어서 만들었습니다.
감사합니다~😎
by @jood/typeko`)
    );
    manual.setTypingSpeed(30, 60);
    manual.addDelayByEqual(' ', 100);

    manual.observe().subscribe((evt) => {
      const { value } = evt;
      output.value = value;
    });

    const onStart = () => {
      manual.start();
    };

    return {
      output,
      onStart,
    };
  },
});
</script>

<style lang="scss" scoped>
.output {
  white-space: pre-line;
}
</style>
