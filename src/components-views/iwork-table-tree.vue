<template>
    <div>
        <iworkTableTree :tablekeys="tablekeys" :tablekeysDesc="tablekeysDesc" :tablevalue="tablevalue"
            :isNotClose="isNotClose" :isShowOprt="isShowOprt" :oprtEvent="oprtEvent" :isSelection="isSelection"></iworkTableTree>
    </div>
</template>

<script>
import iworkTableTree from "@/components/iwork-table-tree.vue";
import tree from "./tree";
export default {
    components: {
        iworkTableTree,
    },
    data() {
        return {
            tablevalue: [],
            tablekeys: [
                "menuitemndesc",
                "__istramenudesc",
                "menuitemdesc",
                "menuitemlevnbr",
            ],
            tablekeysDesc: {
                menuitemndesc: "菜单名称",
                __istramenudesc: "菜单类型",
                menuitemdesc: "菜单名称",
                menuitemlevnbr: "菜单层级",
            },
            isNotClose: false,
            isShowOprt: "end", //none,start,end
            isSelection:true, //具有勾选框
            oprtEvent: [
                {
                    name: "新增",
                    icon: require("../assets/addM.png"),
                    event: function (item) {
                        console.log("add", item);
                    },
                },
                {
                    name: "修改",
                    icon: require("../assets/editM.png"),
                    event: function (item) {
                        console.log("edit", item);
                    },
                },
                {
                    name: "删除",
                    icon: require("../assets/deleteM.png"),
                    event: function (item) {
                        console.log("delete", item);
                    },
                },
            ],
        };
    },
    created() {
        function get(arr) {
            arr.forEach((a) => {
                a.selected = Math.random()>.5?true:false
                a.children = a.children&&get(a.children)
            });
            return arr
        }
        this.tablevalue = get(tree);
        debugger
        // import("./tree").then(data=>{
        //     this.tablevalue = data.default
        // })
    },
};
</script>

<style>
</style>