<template>
  <div id="app">
		<transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data(){
    return{
      
    }
  },
  mounted(){
    
  },
  methods: {
    init(){
      
    }
  }
}
</script>

<style lang="scss">
  @import './style/mixin';
  @import './style/common';
  @import './style/icon/iconfont.css';

  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
  
  html, body{
  	height: 100%;
  }
  body{
	  overflow-x: hidden;
	  background: $bg;
  }
  #app{
	  width: 100%;
	  height: 100%;
  }
  
  /*覆盖mint-ui自带样式*/
  .my-style{
  	.v-modal{
  		pointer-events: none;
  	}
  	#search-exist-icon{
  		color: $green;
  		display: inline-block;
  	}
  	#search-none-icon{
  		font-size: REM(150);
  		color: $green;
  	}
  }
  
  /*共用样式*/
  .chart-container{
  	position: relative;
  	margin-bottom: REM(80);
  	.chart-title{
  		position: relative;
  		text-align: center;
  		.main-text{
  			margin-bottom: REM(10);
  			color: #000000;
  			font-size: REM(40);
  			font-weight: 600;
  		}
  		.sub-text{
  			color: #c7c7c7;
  			font-size: REM(28);
  		}
  	}
  	.none-pie{
	  	position: absolute;
	  	display: block;
	  	width: REM(300);
	  	height: REM(300);
	  	top: 50%;
	  	left: 50%;
	  	margin-top: REM(-100);
	  	margin-left: REM(-150);
	  	background: #ececec;
	  	border-radius: 50%;
	  	box-shadow: 10px 10px 30px #dbdada;
	  	color: #c7c7c7;
	  	font-size: REM(40);
	  	text-align: center;
	  	line-height: REM(300);
	  }
	  .none-bar{
	  	position: absolute;
	  	width: REM(600);
	  	height: REM(400);
	  	top: 50%;
	  	left: 50%;
	  	margin-top: REM(-150);
	  	margin-left: REM(-300);
	  	border-left: 1px solid #c7c7c7;
	  	border-bottom: 1px solid #c7c7c7;
	  	.x-axis{
	  		position: absolute;
	  		right: REM(-50);
	  		bottom: REM(-20);
	  		color: #c7c7c7;
	  		font-size: REM(30);
	  	}
	  	.y-axis{
	  		position: absolute;
	  		top: REM(-50);
	  		left: REM(-40);
	  		color: #c7c7c7;
	  		font-size: REM(30);
	  	}
	  	.none-text{
	  		font-size: REM(40);
	  		color: #c7c7c7;
	  		text-align: center;
	  		line-height: REM(400);
	  	}
	  }
  }
</style>
