<template>
    <div class="table-tree-wrapper">
        <table class="table-tree-table">
            <thead>
                <tr>
                    <th v-if="isShowOprt !== 'none' && isShowOprt === 'start'">
                        操作
                    </th>
                    <th v-for="(tablekey, idx) in tablekeys" :key="idx" v-text="tablekeysDesc[tablekey]"></th>
                    <th v-if="isShowOprt !== 'none' && isShowOprt === 'end'">
                        操作
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, v_idx) in values" :key="v_idx" v-show="checkShow(value)">
                    <td v-show="isShowOprt !== 'none' && isShowOprt === 'start'" class="oprt">
                        <span class="oprtSpan" v-for="(item, e_idx) in oprtEvent" :key="e_idx" :style="{
                                backgroundImage: 'url(' + item.icon + ')',
                            }" @click.stop="item.event(value)"></span>
                    </td>
                    <td v-for="(tablekey, k_idx) in tablekeys" :key="k_idx" :style="getStyle(value.__level, k_idx)">
                        <span class="openOrClose" :class="value.__isShow ? 'open' : 'close'"
                            v-if="k_idx === 0 && value.__children" @click="
                                value.__isShow = !value.__isShow;
                                upShow(value);
                            "></span>
                        <span class="placeholder" v-else>&nbsp;</span>
                        <span v-if="k_idx === 0" class="icon" :class="value.__children ? 'dir' : 'file'"></span>
                        <span v-text="value[tablekey]"></span>
                    </td>
                    <td v-show="isShowOprt !== 'none' && isShowOprt === 'end'" class="oprt">
                        <span class="oprtSpan" v-for="(item, e_idx) in oprtEvent" :key="e_idx" :style="{
                                backgroundImage: 'url(' + item.icon + ')',
                            }" @click.stop="item.event(value)"></span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        tablekeys: {
            type: Array,
            required: true,
        },
        tablekeysDesc: {
            type: Object,
            required: true,
        },
        tablevalue: {
            type: Array,
            required: true,
        },
        isNotClose: {
            type: Boolean,
            default: false,
        },
        isShowOprt: {
            type: String,
            default: "none",
        },
        oprtEvent: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            values: [],
            showHandle: [],
            maxLevel: 0,
        };
    },
    watch: {
        tablevalue: {
            handler: function () {
                [this.values, this.showHandle] = this.getValues();
            },
            deep: true,
            immediate: true,
        },
    },
    computed: {},
    methods: {
        checkShow(item) {
            const { sParent, __index } = item;
            if (!sParent) {
                return true;
            }
            const pItem = this.showHandle.filter((show) => {
                return show.uniqueID === sParent;
            });
            let child = pItem[0];
            let children = pItem[0].children;
            for (let i = 0; i < __index.length; i++) {
                child = children[__index[i]];
                children = children[__index[i]].children;
            }
            return child.isClose;
        },
        upShow(item) {
            let itemChildren = item.children;
            function setClose(arr, flg, itemChildren) {
                arr.forEach((ele, idx) => {
                    const tr = itemChildren[idx];
                    ele.isClose = flg;
                    if (ele.children && ele.children.length > 0) {
                        setClose(ele.children, flg && tr.__isShow, tr.children);
                    }
                });
            }
            const { sParent, __index, __seq, __isShow } = item;
            if (!sParent) {
                setClose(
                    this.showHandle[__seq].children,
                    __isShow,
                    itemChildren
                );
                return;
            }
            const pItem = this.showHandle.filter((show) => {
                return show.uniqueID === sParent;
            });
            let children = pItem[0].children;
            for (let i = 0; i < __index.length; i++) {
                children = children[__index[i]].children;
            }
            setClose(children, __isShow, itemChildren);
        },
        getStyle(level, idx) {
            if (idx !== 0) {
                return {};
            }
            return {
                paddingLeft: 0.2 * (level - 1) + "rem",
            };
        },
        getValues() {
            const tablevalue = JSON.parse(JSON.stringify(this.tablevalue));
            const reArr = [];
            const showHandle = [];
            let _this = this;
            function setValue(reArr, cValueArr, level, pValue, showHandle) {
                if (_this.maxLevel < level) {
                    _this.maxLevel = level;
                }
                for (let idx = 0; idx < cValueArr.length; idx++) {
                    const cValue = cValueArr[idx];
                    // 生成结构
                    const show = {
                        isClose: _this.isNotClose,
                        children: [],
                    };
                    cValue.__isShow = _this.isNotClose;
                    // 为每个层级创建唯一表示
                    cValue.uniqueID = _this.gmtds.getRandomUniqueID();
                    show.uniqueID = cValue.uniqueID;
                    // 判断是否具有父级
                    if (!pValue) {
                        cValue.sParent = null;
                        cValue.__seq = idx;
                    } else {
                        cValue.sParent = pValue.sParent
                            ? pValue.sParent
                            : pValue.uniqueID;
                        if (!cValue.__index) {
                            cValue.__index = pValue.__index
                                ? JSON.parse(JSON.stringify(pValue.__index))
                                : [];
                        }
                        cValue.__index.push(idx);
                        show.isParent = cValue.sParent;
                        show.menuitemdesc = cValue.menuitemdesc;
                    }
                    show.__level = level;
                    showHandle.push(show);
                    // 添加层级--当前属于第几层级
                    cValue.__level = level;
                    reArr.push(cValue);
                    if (cValue.children && cValue.children.length > 0) {
                        // 添加是否可以打开标志位
                        cValue.__children = true;
                        let nextlevel = level + 1;
                        setValue(
                            reArr,
                            cValue.children,
                            nextlevel,
                            cValue,
                            show.children
                        );
                    }
                }
                return [reArr, showHandle];
            }
            return setValue(reArr, tablevalue, 1, null, showHandle);
        },
    },
};
</script>
<style lang="scss" scoped>
.table-tree-wrapper {
    & > .table-tree-table {
        border-collapse: collapse;
        width: 100%;
        & > thead {
            background-color: var(--third);
            & > tr {
                & > th {
                    text-align: left;
                    padding: 0.12rem 0.08rem;
                    border: none;
                    white-space: nowrap;
                }
                & > th:nth-child(2) {
                    padding: 0;
                }
            }
        }
        & > tbody {
            & > tr {
                line-height: 0.4rem;
                border-bottom: 0.01rem solid var(--first);
                & > td {
                    text-align: left;
                    white-space: nowrap;
                    padding: 0 0.08rem;
                    & > .oprtSpan {
                        display: inline-block;
                        background-position: center;
                        background-repeat: no-repeat;
                        width: 0.2rem;
                        height: 0.2rem;
                        margin-right: 0.05rem;
                        cursor: pointer;
                    }
                }
                & > td.oprt {
                    line-height: 0.1rem;
                }
                & > td:nth-child(2) {
                    display: flex;
                    align-items: center;
                    & > span.openOrClose {
                        text-align: center;
                        text-decoration: none;
                        cursor: pointer;
                        transition: color 0.3s;
                        display: inline-block;
                        width: 0.17rem;
                        height: 0.17rem;
                        color: inherit;
                        line-height: 0.13rem;
                        text-align: center;
                        background: #fff;
                        border: 0.01rem solid #e8e8e8;
                        border-radius: 0.02rem;
                        outline: none;
                        transition: all 0.3s;
                        user-select: none;
                    }
                    & > span.placeholder {
                        display: inline-block;
                        width: 0.2rem;
                    }
                    & > span.open::after {
                        content: "-";
                        line-height: initial;
                    }
                    & > span.close::after {
                        content: "+";
                        line-height: initial;
                    }
                    & > span.icon {
                        display: inline-block;
                        width: 0.2rem;
                        height: 0.18rem;
                    }
                    & > span.file {
                        background: url(../assets/file.png) no-repeat center;
                    }
                    & > span.dir {
                        background: url(../assets/dir.png) no-repeat center;
                    }
                }
            }
            & > tr:hover {
                border-bottom: 0.01rem solid var(--third);
            }
        }
    }
}
</style>