<template>
  <div class="home">
    <div>
      <div v-for="(spec, index) in state.testList" :key="index" class="test-box">
        <div class="tit">{{ spec.title }}</div>
        <div class="source atr">
          <div class="stit">source:</div>
          <div class="stx">{{ spec.source }}</div>
        </div>
        <div class="result atr">
          <div class="stit">result:</div>
          <div class="stx">{{ JSON.stringify(spec.result, null, 2) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { separateChar, separateString, typingMatrix, typingChar } from '@jood/typeko-core';

export default defineComponent({
  setup() {
    const testSourceChar = ['푸', '밟', '꿍', '의', '왜'];
    const testSourceString = ['안녕하세요! Hello 라면을 끓이다.'];

    const state = reactive({
      testList: [],
    });

    testSourceChar.forEach((v) => {
      state.testList.push({ title: 'separateChar', source: v, result: separateChar(v) });
      state.testList.push({ title: 'typingChar', source: v, result: typingChar(v) });
    });

    testSourceString.forEach((v) => {
      state.testList.push({ title: 'separateString', source: v, result: separateString(v) });
      state.testList.push({ title: 'typingMatrix', source: v, result: typingMatrix(v) });
    });

    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
.test-box {
  margin: 10px;
  padding: 10px;
  font-size: 0.9rem;
  border: 1px solid #f0f0f0;
  .tit {
    padding-bottom: 10px;
    font-weight: bold;
    font-size: 2rem;
  }
  .atr {
    margin-top: 5px;
    padding: 3px 5px;
    border-radius: 5px;
    background: #f9f9f9;
    .stit {
      font-weight: bold;
      font-size: 1.2rem;
    }
    .stx {
      margin-top: 5px;
    }
  }
}
</style>
