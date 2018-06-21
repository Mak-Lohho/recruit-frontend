<!--招聘需求图表-->
<template>
	<div class="chart-container">
		<div id="demandChart"></div>
		<div class="chart-title">
			<p class="main-text">各区招聘需求</p>
			<p class="sub-text">点击色块或类目名，查看具体数值</p>
		</div>
		<div v-if="!showChart" class="none-pie">暂无数据</div>
	</div>
</template>

<script>
export default {
	data(){
	    return{
	    	showChart: false
	    }
	},
	mounted(){
		
	},
	methods:{
		drawChart(districts, demandDatas){
			if(demandDatas.length){
				this.showChart = true
			}
			
			let tempArr = []
			for(let i = 0; i < districts.length; i++){
				//招聘需求为0的行政区不列入图表显示
				if(!parseInt(demandDatas[i])){
					continue
				}
				tempArr.push({
					"value": parseInt(demandDatas[i]),
					"name": districts[i]
				})
			}
			
	        // 基于准备好的dom，初始化echarts实例
	        let myChart = this.$echarts.init(document.getElementById('demandChart'))
	        // 绘制图表
	        myChart.setOption({
	            tooltip: {
	            	trigger: 'item',
        			formatter: "{b} : {d}%"
	            },
	            series: [{
	                name: '数量',
	                type: 'pie',
	                radius : '55%',
            		center: ['50%', '60%'],
	                data: tempArr
	            }],
	            itemStyle: {
				    // 阴影的大小
				    shadowBlur: 20,
				    // 阴影水平方向上的偏移
				    shadowOffsetX: 0,
				    // 阴影垂直方向上的偏移
				    shadowOffsetY: 0,
				    // 阴影颜色
				    shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
	        })
	    }
    }
}
</script>

<style lang="scss" scoped>
	@import '../style/mixin';
	
	#demandChart{
		width: 100%;
		height: REM(700);
		margin: 0 auto;
	}
</style>