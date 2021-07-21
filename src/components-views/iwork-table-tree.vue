<template>
    <div>
        <iworkTableTree
            :tablekeys="tablekeys"
            :tablekeysDesc="tablekeysDesc"
            :tablevalue="tablevalue"
        ></iworkTableTree>
    </div>
</template>

<script>
import iworkTableTree from "@/components/iwork-table-tree.vue";
import tree from './tree';
export default {
    components: {
        iworkTableTree,
    },
    data() {
        return {
            tablevalue: [],
            tablekeys: [
                "menuitemndesc",
                // "menuitemnbr",
                // "isonlinedesc",
                "__istramenudesc",
                "menuitemdesc",
                "menuitemlevnbr",
                "menuitemseqnbr",
                // "template",
                // "parentmenuitemnbr",
            ],
            tablekeysDesc: {
                menuitemndesc: "菜单名称",
                menuitemnbr: "菜单ID",
                __level:"层级",
                sParent:"父级",
                isonlinedesc: "应用菜单/是否显示",
                __istramenudesc: "菜单类型",
                menuitemdesc: "菜单名称",
                menuitemlevnbr: "菜单层级",
                menuitemseqnbr: "菜单排序",
                parentmenuitemnbr: "父级菜单ID",
                template: "模板路径",
            },
        };
    },
    created() {
        this.tablevalue = tree
    },
};
</script>

<style>
</style>