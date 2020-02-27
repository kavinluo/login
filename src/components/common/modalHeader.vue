<template>
<div>
    <div v-model="content" :id="content.id" ref="headerId" slot="header" class="header" >{{content.title}}</div>
</div>
</template>
<script>
  //import $ from "jquery";
  const Event = {
    addHandler: function (oElement, sEvent, fnHandler) {
      oElement.addEventListener ? oElement.addEventListener(sEvent, fnHandler, false) : oElement.attachEvent("on" + sEvent, fnHandler)
    },
    removeHandler: function (oElement, sEvent, fnHandler) {
      oElement.removeEventListener ? oElement.removeEventListener(sEvent, fnHandler, false) : oElement.detachEvent("on" + sEvent, fnHandler)
    }
  }
  export default{
    props:["content"],
    data(){
      return{

      }
    },
    mounted(){
      let headerId = this.$refs.headerId;
      //let par = $(headerId).parents(".ivu-modal-content")
      let par = headerId.parentElement.parentElement
      this.startDrag(headerId,par);
    },
    methods:{
      startDrag(bar, target, callback){
        let d = document;
        let getCss = function(o,key){
          return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
        }
        let params={
          left: 0,
          top: 0,
          currentX: 0,
          currentY: 0,
          flag: false
        }
        if(getCss(target, "left") !== "auto"){
          params.left = getCss(target, "left");
        }
        if(getCss(target, "top") !== "auto"){
          params.top = getCss(target, "top");
        }
        //o是移动对象
        bar.onmousedown = function(event){
          params.flag = true;
          if(!event){
            event = window.event;
            //防止IE文字选中
            bar.onselectstart = function(){
              return false;
            }
          }
          var e = event;
          params.currentX = e.clientX;
          params.currentY = e.clientY;
        };

        let fnHandlerUp = function(){
          params.flag = false;
          if(getCss(target, "left") !== "auto"){
            params.left = getCss(target, "left");
          }
          if(getCss(target, "top") !== "auto"){
            params.top = getCss(target, "top");
          }
        };
        Event.addHandler(d, "mouseup", fnHandlerUp);

        let fnHandlerMove = function(event){
          var e = event ? event: window.event;
          if(params.flag){
            var nowX = e.clientX, nowY = e.clientY;
            var disX = nowX - params.currentX, disY = nowY - params.currentY;
            if(parseInt(params.left) + disX<630){
              target.style.left = parseInt(params.left) + disX + "px";
            }
            if(parseInt(params.top) + disY >-100){
              target.style.top = parseInt(params.top) + disY + "px";
            }
          }

          if (typeof callback == "function") {
            callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
          }
        }
        Event.addHandler(d, "mousemove", fnHandlerMove);
      }
    }
  }
</script>
