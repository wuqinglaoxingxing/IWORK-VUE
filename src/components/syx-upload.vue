<template>
  <div class="syx-upload-wrapper">
    <input
      ref="syxUploadInput"
      class="syx-upload-input"
      type="text"
      name="fileName"
      v-model="fileName"
      @keydown="forbiddenInput($event)"
    />
    <span
      class="syx-upload-span"
      @click="importFile"
      @mousedown="preventFocus($event)"
    >
      <i class="syx-upload-i"></i>
    </span>
    <input
      type="file"
      ref="fileInput"
      @change="getFile"
      v-show="fileInputShow"
      :multiple="isMultiple"
    />
    <div
      class="syx-upload-multiple-wrapper"
      @mousedown="preventFocus($event)"
      v-show="isMultiple"
    >
      <ul class="syx-upload-multiple-ul">
        <li class="syx-upload-multiple-li">
          <span class="syx-upload-multiple-left">1111</span>
          <span class="syx-upload-multiple-right">X</span>
        </li>
        <li class="syx-upload-multiple-li">
          <span class="syx-upload-multiple-left">1111</span>
          <span class="syx-upload-multiple-right">X</span>
        </li>
        <li class="syx-upload-multiple-li">
          <span class="syx-upload-multiple-left">1111</span>
          <span class="syx-upload-multiple-right">X</span>
        </li>
        <li class="syx-upload-multiple-li">
          <span class="syx-upload-multiple-left">1111</span>
          <span class="syx-upload-multiple-right">X</span>
        </li>
        <li class="syx-upload-multiple-li">
          <span class="syx-upload-multiple-left">1111</span>
          <span class="syx-upload-multiple-right">X</span>
        </li>
        <li class="syx-upload-multiple-li">
          <span class="syx-upload-multiple-left">1111</span>
          <span class="syx-upload-multiple-right">X</span>
        </li>
        <li class="syx-upload-multiple-li">
          <span class="syx-upload-multiple-left">1111</span>
          <span class="syx-upload-multiple-right">X</span>
        </li>
        <li class="syx-upload-multiple-li">
          <span class="syx-upload-multiple-left">1111</span>
          <span class="syx-upload-multiple-right">X</span>
        </li>
        <li class="syx-upload-multiple-li">
          <span class="syx-upload-multiple-left">1111</span>
          <span class="syx-upload-multiple-right">X</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "SyxUpload",
  props: {
    isMultiple: {
      type: Boolean,
      default: true,
    },
    file: {},
  },
  data() {
    return {
      fileInputShow: false,
      // 文件上传
      fileResource: [],
    };
  },
  watch: {
    fileResource(n, o) {
      this.$parent[this.file] = n;
    },
  },
  computed: {
    fileName: function() {
      if (this.isMultiple) {
        let returnStr = [];
        if (this.fileResource instanceof File) {
          return this.fileResource.name;
        } else {
          this.fileResource.forEach((fileResource) => {
            returnStr.push(fileResource.name);
          });
          return returnStr.join(",");
        }
      } else {
        return this.fileResource.name;
      }
    },
  },
  methods: {
    // 元素点击,防止失去焦点操作
    // 阻止默认失去焦点事件
    preventFocus(e) {
      e.preventDefault();
    },
    // 文件禁止手动输入
    forbiddenInput(e) {
      e.preventDefault();
    },
    // 导入文件
    importFile() {
      let fileInput = this.$refs.fileInput;
      this.$refs.syxUploadInput.focus();
      fileInput.click();
    },
    // 获取文件
    getFile() {
      let fileInput = this.$refs.fileInput;
      if (this.isMultiple) {
        this.fileResource = [];
        this.fileResource = fileInput.files;
      } else {
        this.fileResource = {};
        let file = fileInput.files[0];
        this.fileResource = file;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.syx-upload-wrapper {
  position: relative;
  font-size: 14px;
  .syx-upload-input {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 32px;
    line-height: 1.5;
    text-indent: 5px;
    font-size: 14px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    background-color: #fff;
    background-image: none;
    cursor: text;
    transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out;
    outline: #57a3f3;
  }
  .syx-upload-input:hover,
  .syx-upload-input:focus {
    border-color: #57a3f3;
  }
  .syx-upload-span {
    position: absolute;
    display: block;
    right: 0;
    top: 0;
    height: 100%;
    width: 30px;
    cursor: pointer;
    .syx-upload-i {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url(../assets/upload.png) no-repeat;
      background-position: center;
    }
  }
  .syx-upload-multiple-wrapper {
    position: absolute;
    margin-top: 5px;
    width: 216px;
    height: 120px;
    border: 1px #cccccc solid;
    border-radius: 3px;
    box-shadow: #bbbbbb 0px 0px 20px 2px;
    z-index: 999;
    background: white;
    overflow: scroll;
    text-align: left;
    .syx-upload-multiple-ul {
      width: 100%;
      position: absolute;
      margin: 0;
      padding: 0px 0px;
      list-style: none;
      .syx-upload-multiple-li {
        width: 100%;
        position: relative;
        height: 25px;
        line-height: 25px;
        color: #666666;
        .syx-upload-multiple-left {
          position: absolute;
          left: 8px;
          cursor: default;
        }
        .syx-upload-multiple-right {
          position: absolute;
          right: 8px;
          cursor: pointer;
        }
      }
      .syx-upload-multiple-li:hover{
        background-color: #D4E7FA;
      }
    }
  }
}
</style>
