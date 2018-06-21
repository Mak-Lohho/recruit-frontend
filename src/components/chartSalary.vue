<!--各区薪酬图表-->
<template>
	<div class="chart-container">
		<div id="salaryChart"></div>
		<div class="chart-title">
			<p class="main-text">各区薪酬</p>
			<p class="sub-text">点击色块，查看具体数值</p>
		</div>
		<div v-if="!showChart" class="none-bar">
			<span class="x-axis">区</span>
			<span class="y-axis">薪酬(k)</span>
			<p class="none-text">暂无数据</p>
		</div>
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
		drawChart(districts, chartSalaryLowest, chartSalaryAverage, chartSalaryHighest){
			if(chartSalaryLowest.length){
				this.showChart = true
			}
			
			let tempDistricts = []
			let tempSalaryLowest = []
			let tempSalaryAverage = []
			let tempSalaryHighest = []
			for(let i = 0; i < districts.length; i++){
				//薪酬为0的行政区不列入图表显示
				if(chartSalaryLowest[i] == '0k'){
					continue
				}
				tempDistricts.push(districts[i])
				tempSalaryLowest.push(parseFloat(chartSalaryLowest[i].replace('k', '')))
				tempSalaryAverage.push(parseFloat(chartSalaryAverage[i].replace('k', '')))
				tempSalaryHighest.push(parseFloat(chartSalaryHighest[i].replace('k', '')))
			}
			
	        // 基于准备好的dom，初始化echarts实例
	        let myChart = this.$echarts.init(document.getElementById('salaryChart'))
	        // 绘制图表
	        myChart.setOption({
	            tooltip: {
	            	trigger: 'axis',
        			formatter: "{b}<br>{a0} : {c0}k<br>{a1} : {c1}k<br>{a2} : {c2}k",
        			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        },
	            },
	            xAxis: {
		            name: '区',
		            type: 'category',
		            data: tempDistricts,
		            axisLabel: {  
						interval: 0,
//						rotate: 60  //x轴区名旋转角度
						formatter:function(value){  //x轴区名纵向显示
                           return value.split("").join("\n");  
                    	}
					}
			    },
			    yAxis: {
			    	name: '薪酬(k)',
			        type : 'value'
			    },
	            grid: {
	            	bottom: 80
	            },
			    legend: {
			        data: ['最低薪酬', '平均薪酬','最高薪酬'],
			        bottom: 5
			    },
	            series: [{
	                name: '最低薪酬',
	                type: 'bar',
	                data: tempSalaryLowest
	            }, {
	                name: '平均薪酬',
	                type: 'bar',
	                data: tempSalaryAverage
	            }, {
	                name: '最高薪酬',
	                type: 'bar',
	                data: tempSalaryHighest
	            }]
	        })
	    }
    }
}
</script>

<style lang="scss" scoped>
	@import '../style/mixin';
	
	#salaryChart{
		width: 100%;
		height: REM(800);
		margin: 0 auto;
	}
</style>