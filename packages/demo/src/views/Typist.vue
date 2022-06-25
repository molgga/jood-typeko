<template>
  <div class="typist-container">
    <div class="actions">
      <button class="action" @click="onStart">start</button>
      <button class="action" @click="onPause">pause</button>
      <button class="action" @click="onResume">resume</button>
    </div>
    <div class="input-area">
      <textarea class="input" v-model="source"></textarea>
    </div>
    <div class="options">
      <dl class="opt">
        <dt class="dt">입력 속도</dt>
        <dd class="dd">
          <input class="speed-put" type="number" :min="0" :max="state.max" v-model="state.min" /> ~
          <input class="speed-put" type="number" :min="state.min" :max="9000" v-model="state.max" />
        </dd>
      </dl>
    </div>
    <div class="output-area">
      <div class="count">{{ state.typingIndex }} / {{ state.typingTotal }}</div>
      <div class="output">{{ state.output }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { typingMatrix } from '@jood/typeko-core';
import { ManualTypist } from '@jood/typeko-typist';

export default defineComponent({
  setup() {
    const source = ref(`안녕하세요. 반갑습니다 😎
가끔 필요할때가 있어서 만들어 봅니다.

하하하 쓸 말이 없군요. 안뇽~`);

    const state = reactive({
      output: '',
      typingIndex: 0,
      typingTotal: 0,
      min: 40,
      max: 50,
    });

    const manual = new ManualTypist();
    // manual.addDelayByEqual('\n', 120);
    // manual.addDelayByEqual('.', 100);

    manual.observe().subscribe((evt) => {
      const { value, typingTotal, typingIndex } = evt;
      state.output = value;
      state.typingTotal = typingTotal;
      state.typingIndex = typingIndex;
    });

    const onStart = () => {
      manual.setSourceMatrix(typingMatrix(source.value));
      manual.setTypingSpeed(state.min, state.max);
      manual.start();
    };

    const onPause = () => {
      manual.pause();
    };

    const onResume = () => {
      manual.resume();
    };

    return {
      source,
      state,
      onStart,
      onPause,
      onResume,
    };
  },
});
</script>

<style lang="scss" scoped>
.typist-container {
  margin: 0 auto;
  padding: 10px 10px 60px 10px;
  max-width: 760px;
}
.input-area {
  padding: 10px;
  box-sizing: border-box;
  .input {
    display: block;
    padding: 10px;
    width: 100%;
    min-height: 90px;
    font-size: 14px;
    color: #333;
    box-sizing: border-box;
    border: 1px solid #ddd;
  }
}
.output-area {
  padding: 10px;
  word-break: break-all;
  border-top: 3px double #e0e0e0;
  .count {
    font-size: 16px;
    font-weight: bold;
    text-align: right;
  }
  .output {
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    white-space: pre-line;
  }
}
.options {
  margin-top: -20px;
  display: flex;
  justify-content: flex-end;
  .opt {
    display: flex;
    align-items: center;
    padding: 2px 12px;
    .dt {
      padding-right: 10px;
      font-size: 14px;
      font-weight: bold;
    }
    .dd {
      display: flex;
      align-items: center;
    }
    .speed-put {
      display: block;
      padding: 0;
      height: 32px;
      width: 80px;
      text-align: center;
      border: 1px solid #ddd;
      appearance: none;
    }
  }
}
.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  .action {
    margin: 2px;
    background-color: #ffffff;
    border: 1px solid rgb(209, 213, 219);
    border-radius: 0.5rem;
    box-sizing: border-box;
    color: #111827;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
    padding: 0.75rem 1rem;
    text-align: center;
    text-decoration: none #d1d5db solid;
    text-decoration-thickness: auto;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    &:hover {
      background-color: rgb(249, 250, 251);
    }
    &:focus {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
    &:focus-visible {
      box-shadow: none;
    }
  }
}
</style>
