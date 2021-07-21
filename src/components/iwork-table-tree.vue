<template>
    <div class="table-tree-wrapper">
        <table class="table-tree-table">
            <thead>
                <tr>
                    <th
                        v-for="(tablekey, idx) in tablekeys"
                        :key="idx"
                        v-text="tablekeysDesc[tablekey]"
                    ></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, v_idx) in values" :key="v_idx" v-show="checkShow(value)">
                    <td v-for="(tablekey, k_idx) in tablekeys" :key="k_idx" :style="getStyle(value.__level,k_idx)">
                        <span
                            class="openOrClose"
                            :class="value.__isShow ? 'open' : 'close'"
                            v-if="k_idx === 0 && value.__children"
                            @click="value.__isShow = !value.__isShow;upShow(value) "
                        ></span>
                        <span class="placeholder" v-else>&nbsp;</span>
                        <span
                            v-if="k_idx === 0"
                            class="icon"
                            :class="value.__children? 'dir' : 'file'"
                        ></span>
                        <span v-text="value[tablekey]"></span>
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
    },
    data(){
        return {
            values:[],
            showHandle:[],
            maxLevel:0
        }
    },
    created(){
        [this.values,this.showHandle] = this.getValues()
    },
    computed:{
        levelArr:function(){
            let flg = true
            let level = 1
            let reValue = {}
            while(flg){
                reValue[level] = this.values.filter(value=>{
                    return value.__level===level
                })
                level++
                if(level>this.maxLevel){
                    break;
                }
            }
            return reValue
        }
    },
    methods:{
        checkShow(item){
            const {sParent,__index} = item
            if(!sParent){
                return true
            }
            const pItem = this.showHandle.filter(show=>{
               return show.uniqueID===sParent
            })
            let child = pItem[0]
            let children  = pItem[0].children
            for(let i=0;i<__index.length;i++){
                child = children[__index[i]]
                children = children[__index[i]].children
            }
            return child.isClose
        },
        getTrByUniqueIDAndLevel(id,level){
            return this.levelArr[level].filter(value=>{
                return value.uniqueID === id
            })
        },
        upShow(item){
            let _this = this
            function setClose(arr,flg){
                arr.forEach(ele=>{
                    const {uniqueID,__level} = ele
                    const trs = _this.getTrByUniqueIDAndLevel(uniqueID,__level)
                    ele.isClose = flg
                    if(ele.children&&ele.children.length>0){
                        setClose(ele.children,flg&&trs[0].__isShow)
                    }
                })
            }
            const {sParent,__index,__seq,__isShow} = item
            if(!sParent){
                setClose(this.showHandle[__seq].children,__isShow)
                return
            }
            const pItem = this.showHandle.filter(show=>{
               return show.uniqueID===sParent
            })
            let children  = pItem[0].children
            for(let i=0;i<__index.length;i++){
                children = children[__index[i]].children
            }
            setClose(children,__isShow)
        },
        getStyle(level,idx){
            if(idx!==0){
                return {}
            }
            return {
                paddingLeft:.2*(level-1)+"rem"
            }
            
        },
        getValues () {
            const tablevalue = JSON.parse(JSON.stringify(this.tablevalue))
            const reArr = []
            const showHandle = []
            let _this = this
            function setValue(reArr, cValueArr, level, pValue,showHandle) {
                if(_this.maxLevel<level){
                    _this.maxLevel = level
                }
                for (let idx = 0; idx < cValueArr.length; idx++) {
                    const cValue = cValueArr[idx];
                    // 生成结构
                    const show = {
                        isClose:true,
                        children:[]
                    }
                    cValue.__isShow = true
                    // 为每个层级创建唯一表示
                    cValue.uniqueID = _this.gmtds.getRandomUniqueID()
                    show.uniqueID = cValue.uniqueID
                    // 判断是否具有父级
                    if(!pValue){
                        cValue.sParent = null
                        cValue.__seq = idx
                    }else{
                        cValue.sParent = pValue.sParent?pValue.sParent:pValue.uniqueID
                        if(!cValue.__index){
                            cValue.__index = pValue.__index?JSON.parse(JSON.stringify(pValue.__index)):[]
                        }
                        cValue.__index.push(idx)
                        show.isParent = cValue.sParent
                        show.menuitemdesc = cValue.menuitemdesc 
                    }
                    show.__level = level;
                    showHandle.push(show)
                    // 添加层级--当前属于第几层级
                    cValue.__level = level;
                    reArr.push(cValue);
                    if (cValue.children && cValue.children.length > 0) {
                        // 添加是否可以打开标志位
                        cValue.__children = true
                        let nextlevel = level+1;
                        setValue(reArr, cValue.children, nextlevel, cValue,show.children);
                    }
                }
                return [reArr,showHandle];
            }
            return setValue(reArr, tablevalue, 1, null,showHandle)
        },
    }
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
                    padding: 12px 8px;
                    border: none;
                    white-space: nowrap;
                }
            }
        }
        & > tbody {
            & > tr {
                line-height: 0.4rem;
                border-bottom: 0.01rem solid var(--third);
                & > td {
                    white-space: nowrap;
                }
                & > td:nth-child(1) {
                    text-align: left;
                    display: flex;
                    align-items: center;
                    & > span.openOrClose{
                        text-align: center;
                        text-decoration: none;
                        cursor: pointer;
                        transition: color .3s;
                        display: inline-block;
                        width: .17rem;
                        height: .17rem;
                        color: inherit;
                        line-height: .13rem;
                        text-align: center;
                        background: #fff;
                        border: .01rem solid #e8e8e8;
                        border-radius: .02rem;
                        outline: none;
                        transition: all .3s;
                        user-select: none;
                    }
                    & > span.placeholder {
                        display: inline-block;
                        width: 0.2rem;
                    }
                    & >span.open::after{
                        content: "-";
                        line-height: initial;

                    }
                    & >span.close::after{
                        content: "+";
                        line-height: initial;

                    }
                    & > span.icon {
                        display: inline-block;
                        width: 0.2rem;
                        height: .18rem;
                    }
                    & > span.file {
                        background: url(../assets/file.png)no-repeat  center;
                    }
                    & > span.dir {
                        background: url(../assets/dir.png)no-repeat  center;
                    }
                }
            }
        }
    }
}
</style>