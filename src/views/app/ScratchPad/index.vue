
<template>
  <div class="blockly-app">
    <BlocklyComponent class="blockly2" :options="options" ref="foo"></BlocklyComponent>
    <!-- <p id="code">
      <button v-on:click="showCode()">Show JavaScript</button>
      <pre v-html="code"></pre>
    </p> -->
  </div>
</template>


<script>

import BlocklyComponent from '../../../components/Blockly/BlocklyComponent.vue'
import './prompt';

import BlocklyJS from 'blockly/javascript';

export default {
  components: {
    BlocklyComponent
  },
  data(){
    return {
      code: '',
      options: {
        media: 'media/',
        grid:
          {
            spacing: 25,
            length: 3,
            colour: '#ccc',
            snap: true
          },
        toolbox:
        `<xml>
          <category name="Logic" colour="%{BKY_LOGIC_HUE}">
            <block type="controls_if"></block>
            <block type="logic_compare"></block>
            <block type="logic_operation"></block>
            <block type="logic_negate"></block>
            <block type="logic_boolean"></block>
          </category>
          <category name="Loops" colour="%{BKY_LOOPS_HUE}">
            <block type="controls_repeat_ext">
              <value name="TIMES">
                <block type="math_number">
                  <field name="NUM">10</field>
                </block>
              </value>
            </block>
            <block type="controls_whileUntil"></block>
          </category>
          <category name="Math" colour="%{BKY_MATH_HUE}">
            <block type="math_number">
              <field name="NUM">123</field>
            </block>
            <block type="math_arithmetic"></block>
            <block type="math_single"></block>
          </category>
          <category name="Text" colour="%{BKY_TEXTS_HUE}">
            <block type="text"></block>
            <block type="text_length"></block>
            <block type="text_print"></block>
          </category>
          <category name="Variables" custom="VARIABLE" colour="%{BKY_VARIABLES_HUE}">
            </category>
        </xml>`
      }
    }
  },
  methods: {
    showCode() {
      this.code = BlocklyJS.workspaceToCode(this.$refs["foo"].workspace);
    }
  }
}
</script>



<style>
/* #app-blockly {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: red;
} */


.code {
  position: relative;
  width:100%;
  height: 100px;
  margin: 0;
  background-color: beige;
  margin-bottom: 10px;
}

/* #blockly1 {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 50%;
} */

.blockly2 {
  position: relative;
  top:0;
  width: 100%;
  height:500px;
}
</style>
