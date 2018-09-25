import Vue from "vue";
import "./theme/element-#00B29F/index.css";

import { Container, Row, Col, Main } from "element-ui";

const app = new Vue({
  el: "#app",
  components: {
    "el-container": Container,
    "el-row": Row,
    "el-col": Col,
    "el-main": Main,
    converter: () => import("./converter.vue")
  },
  template: `
  <el-container>
    <el-main>
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <converter></converter>
      </el-col>
    </el-row>
    </el-main>
  </el-container>
  `
});
