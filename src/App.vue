<template>
    <div id="app" ref="app">
        <div id="appCase" ref="appCase">
        <canvas id="canvas" ref="canvas"></canvas>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TypeingApp } from './com/TypeingApp';
import Config from './Utill/Config';
import { isIOS, isMobilePlatform } from "./Utill/Platform";

let app = null;


@Component({
  components: {
  },
})

export default class App extends Vue {

    public show: boolean;

  async mounted(){
       
        app = new TypeingApp( (this.$refs.canvas) as HTMLCanvasElement);

        this.calcScreen()
        window.addEventListener('resize',()=>{
            this.calcScreen()
        }) 
  }

    private calcScreen(){
        const app =  document.getElementById('app');
        app.setAttribute('style', 'width:100%; height:100%;');

        const canvas = document.getElementById('appCase');
            const w = app.clientWidth;
		const h = app.clientHeight;
            const currentRatio = w/h;

            const  scale = Config.w/Config.h ;
            if(currentRatio>scale){
                    canvas.setAttribute('style',`width: ${h*scale}px; height: ${h}px;`) 
                }else{
                    canvas.setAttribute('style',`width: ${w}px; height: ${w/ scale}px;`)
                }
    }
}
</script>

<style scoped>
body{
    overflow: hidden;
}
#app {
    overflow: hidden;
    position: fixed;
    top:0; left:0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.8);
    
}
#appCase{
    overflow: hidden;
    position:absolute;
    top:50%;
    left:50%;

    width:100%;
    transform:translate(-50%,-50%);
}


</style>
