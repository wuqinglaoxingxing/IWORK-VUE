/***
 * 该指令处理下拉框
 * 数据格式支持数组和对象
 * v-iwork-select.type.mutif.remote="{model:key,list:list}"
 * 参数说明：
 *      type：表示数据类型 数组还是对象 arr/obj
 *      mutif：表示是否为多选  rSelect/mSelect
 *      remote: 执行异步形式  sync/async
 *      model: 表示收入框双向绑定的值
 *      list：数据列表，对象或数组集合
 */
import "./iwork-select.scss"
export default {
    bind:function(el,binding){
        const modifiers =  binding.modifiers
        // 对数据内容进行解析
        // 数组还是对象
        el.$isArr = modifiers.arr?true:false
        el.$simgleSelect = modifiers.rSelect?true:false
        el.$isSync = modifiers.sync?true:false
        el.$model = binding.value.model
        el.$list = binding.value.list
    },
    inserted: function (el,binding) {
        let open = function(el){
            // 获取输入框位置
            const {bottom,height,left, top,width} = el.getBoundingClientRect()
            const ul = document.createElement("ul")
            ul.classList.add("iwork-select")
            // 设置ul的宽度
            ul.style.width = width + "px"
            ul.style.left = left + "px"
            ul.style.top = top + height + 3  + "px"
            // 是数组还是对象
            if(el.$isArr){

            }else{
                const list = el.$list
                Object.keys(list).forEach(key=>{
                    const li = document.createElement("li")
                    li.innerText = `${key} - ${list[key]}`
                    ul.appendChild(li)
                })
                document.body.appendChild(ul)
            }
            

        }
        // 给input绑定事件用于下拉框
        el.addEventListener("keydown",function(e){
            // 表示打开下拉框
            if(e.keyCode === 32){
                e.preventDefault();
                open(el)
                return
            }
        })

        el.addEventListener("keyup",function(e){
            console.log(this.$bModel,this.$model);
        })

        el.addEventListener("keypress",function(e){
            this.$bModel = this.$model
        })


    },
    update(el,binding) {
        const modifiers =  binding.modifiers
        // 对数据内容进行解析
        // 数组还是对象
        el.$isArr = modifiers.arr?true:false
        el.$simgleSelect = modifiers.rSelect?true:false
        el.$isSync = modifiers.sync?true:false
        el.$model = binding.value.model
        el.$list = binding.value.list
    },
}