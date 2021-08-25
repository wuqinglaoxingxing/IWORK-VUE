<template>
    <div class="iwork-upload-wrapper">
        <input ref="iworkUploadInput" class="iwork-upload-input" type="text" name="fileName" v-model="fileName"
            @keydown="forbiddenInput($event)" @focus="isOpen=true" @blur="isOpen=false" />
        <span v-if="!isHand" class="iwork-upload-span iwork-upload-not-hand-span" @click="importFile"
            @mousedown="preventFocus($event)">
            <i class="iwork-upload-upload"></i>
        </span>
        <span v-if="isHand" class="iwork-upload-span iwork-upload-hand-span" @mousedown="preventFocus($event)">
            <i class="iwork-upload-upload" @click="importFile"></i>
            <i class="iwork-upload-hand" @click="uploadNow"></i>
        </span>
        <input type="file" ref="fileInput" @change="getFile" v-show="fileInputShow" :multiple="isMultiple" />
        <div class="iwork-upload-multiple-wrapper" @mousedown="preventFocus($event)"
            v-show="isOpen&&isMultiple&&fileResource.length>1">
            <ul class="iwork-upload-multiple-ul">
                <li class="iwork-upload-multiple-li" v-for="(item,index) of fileResource" :key="index">
                    <span class="iwork-upload-multiple-left">{{item.name}}</span>
                    <span class="iwork-upload-multiple-right" @click.stop="delFileResourceOne(index)">X</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: "IworkUpload",
    props: {
        isMultiple: {
            type: Boolean,
            default: true,
        },
        isHand: {
            Boolean: Boolean,
            default: true,
        },
        file: {},
    },
    data() {
        return {
            fileInputShow: false,
            // 文件上传
            fileResource: [],
            // 多选文件列表显示标志
            isOpen: false,
        };
    },
    watch: {
        fileResource(n, o) {
            if (this.isMultiple && n instanceof FileList) {
                n = Array.prototype.slice.call(this.fileResource);
            }
            this.$parent[this.file] = n;
        },
    },
    computed: {
        fileName: function () {
            if (this.isMultiple) {
                let returnStr = [];
                if (this.fileResource instanceof File) {
                    return this.fileResource.name;
                } else {
                    Array.from(this.fileResource).forEach((fileResource) => {
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
            this.$refs.iworkUploadInput.focus();
            // 清除数据，让change事件触发
            fileInput.value = "";
            fileInput.click();
        },
        // 立即上传
        uploadNow() {
            this.$emit("upload", this.fileResource);
        },
        // 获取文件
        getFile() {
            let fileInput = this.$refs.fileInput;
            if (this.isMultiple) {
                if (!Array.isArray(this.fileResource)) {
                    this.fileResource = [];
                }
                Array.from(fileInput.files).forEach((file) => {
                    this.fileResource.push(file);
                });
            } else {
                this.fileResource = {};
                let file = fileInput.files[0];
                this.fileResource = file;
            }
        },
        // 删除多选的文件
        delFileResourceOne(fileIndex) {
            this.fileResource = Array.prototype.slice.call(this.fileResource);
            this.fileResource.splice(fileIndex, 1);
            // var  formData = new FormData();
            // for(var i=0;i<this.fileResource.length;i++){
            //   formData.append('file', this.fileResource[i], this.fileResource[i].name);
            // }
            // this.log(formData.get('file'))
        },
    },
};
</script>
<style lang="scss" scoped>
.iwork-upload-wrapper {
    position: relative;
    font-size: 14px;
    .iwork-upload-input {
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
    .iwork-upload-input:hover,
    .iwork-upload-input:focus {
        border-color: #57a3f3;
    }
    .iwork-upload-span {
        position: absolute;
        display: block;
        right: 0;
        top: 0;
        height: 100%;
    }
    .iwork-upload-not-hand-span {
        width: 30px;
        cursor: pointer;
        .iwork-upload-upload {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url(../assets/upload.png) no-repeat;
            background-position: center;
        }
    }
    .iwork-upload-hand-span {
        width: 60px;
        cursor: pointer;
        i {
            display: inline-block;
            width: 50%;
            height: 100%;
        }
        .iwork-upload-upload {
            background: url(../assets/upload.png) no-repeat;
            background-position: center;
        }
        .iwork-upload-hand {
            background: url(../assets/hand.png) no-repeat;
            background-position: center;
        }
    }
    .iwork-upload-multiple-wrapper {
        position: absolute;
        margin-top: 5px;
        width: 100%;
        height: 130px;
        border: 1px #cccccc solid;
        border-radius: 3px;
        box-shadow: #bbbbbb 0px 0px 20px 2px;
        z-index: 999;
        background: white;
        overflow: auto;
        text-align: left;
        .iwork-upload-multiple-ul {
            width: 100%;
            position: absolute;
            margin: 0;
            padding: 0px 0px;
            list-style: none;
            .iwork-upload-multiple-li {
                width: 100%;
                position: relative;
                height: 25px;
                line-height: 25px;
                color: #666666;
                .iwork-upload-multiple-left {
                    position: absolute;
                    left: 8px;
                    display: inline-block;
                    width: 80%;
                    height: 25px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    cursor: default;
                }
                .iwork-upload-multiple-right {
                    position: absolute;
                    right: 8px;
                    cursor: pointer;
                }
            }
            .iwork-upload-multiple-li:hover {
                background-color: #d4e7fa;
            }
            .iwork-upload-multiple-li:not(:last-child) {
                border-bottom: 1px #dcdee2 solid;
            }
        }
    }
}
</style>
