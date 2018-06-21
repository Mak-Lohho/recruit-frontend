<!--福利待遇热词-->
<template>
	<div class="chart-container">
		<div id="welfareChart"></div>
		<div class="chart-title">
			<p class="main-text">福利待遇热词</p>
			<p class="sub-text">点击热词查看具体数值</p>
		</div>
		<div v-if="!showChart" class="none-pie">暂无数据</div>
	</div>
</template>

<script>
require('echarts-wordcloud')

export default {
	data(){
	    return{
	    	showChart: false
	    }
	},
	mounted(){
		
	},
	methods:{
		drawChart(welfareDatas){
			//随机字体颜色
			let createRandomItemStyle = function() {
			    return {
			        normal: {
			            color: 'rgb(' + [
			                Math.round(Math.random() * 160),
			                Math.round(Math.random() * 160),
			                Math.round(Math.random() * 160)
			            ].join(',') + ')'
			        }
			    };
			}
			
			if(welfareDatas.type.length && welfareDatas.values.length){
				this.showChart = true
			}
			
			let tempArr = []
			for(let i = 0; i < welfareDatas.values.length; i++){
				tempArr.push({
					"value": parseInt(welfareDatas.values[i]),
					"name": welfareDatas.type[i],
//					"itemStyle": createRandomItemStyle()
				})
			}
			
	        // 基于准备好的dom，初始化echarts实例
	        let myChart = this.$echarts.init(document.getElementById('welfareChart'))
	        // 绘制图表
	        myChart.setOption({
	            tooltip: {
			        show: true
			    },
	            series: [{
	                name: '福利热词',
	                type: 'wordCloud',
	                shape: 'circle',
	                width: '90%',
	                height: '90%',
	                sizeRange: [12, 40],
            		rotationRange: [-90, 90],
            		textStyle: {
			            normal: {
			                fontFamily: 'sans-serif',
			                fontWeight: 'bold',
			                // Color can be a callback function or a color string
			                color: function () {
			                    // Random color
			                    return 'rgb(' + [
			                        Math.round(Math.random() * 160),
			                        Math.round(Math.random() * 160),
			                        Math.round(Math.random() * 160)
			                    ].join(',') + ')';
			                }
			            },
			            emphasis: {
			                shadowBlur: 10,
			                shadowColor: '#333'
			            }
			        },
	                data: tempArr
	            }]
	        })
	    }
    }
}
</script>

<style lang="scss" scoped>
	@import '../style/mixin';
	
	#welfareChart{
		width: 100%;
		height: REM(700);
		margin: 0 auto;
	}
</style>