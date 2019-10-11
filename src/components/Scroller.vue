<template>
  <div class="scroll" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'scroller'
  export default{
    name:'Scroller',
    mounted(){
      const scroll = new BScroll(this.$refs.wrapper,{
        tap:true,
        probeType:1
      });
      // console.log(this) //此处this指 VueComponent(本组件)
      this.scroll = scroll;  //局部scroll挂载到全局组件上
      scroll.on('scroll',(pos)=>{
        this.handleToScroll(pos)
      });
      scroll.on('touchEnd',(pos)=>{
        this.handleToTouchEnd(pos)
      })
    },
    methods:{
      toScrollTop(y){
        this.scroll.scrollTo(0,y)
      }
    }
  }
</script>

<style scoped>
  .scroll{
    height: 100%;
  }
</style>
