<!--首页-->
<template>
	<div class="container my-style" v-bind:class="{'hidden-y': showAbout}">
		<div class="top-bar">
			<p @click="showPicker()" class="text-city">{{city}}</p>
			<form action="">
				<input v-model="searchKey" ref="searchInput" id="keyword-input" type="search" placeholder="请输入职业，如：Java" />
			</form>
		</div>
		<mt-popup
			class="full-width"
			v-model="cityPickerVisible"
			position="bottom">
			<div class="btn-bar-picker clear">
				<span @click="hidePicker()" id="btn-confirm-picker">完成</span>
			</div>
			<mt-picker
				:slots="slots"
				@change="onValuesChange">
			</mt-picker>
		</mt-popup>
		<mt-popup
			class="search-result"
			v-model="searchResultVisible"
			position="right">
			<div v-if="searchResult.length">
				<p class="search-exist-title">
					<i id="search-exist-icon" class="mint-toast-icon mintui mintui-search"></i>
					匹配到{{searchResult.length}}个结果（{{city}}市）：
				</p>
				<ul>
					<li v-for="(industry, index) in searchResult" @click="toGetAnalyse(industry)" class="search-exist-li">{{industry}}</li>
				</ul>
			</div>
			<div v-else class="search-none">
				<div class="flex-all">
					<i id="search-none-icon" class="mint-toast-icon mintui mintui-field-warning"></i>
				</div>
				<p class="search-none-text">暂无结果，<span class="search-none-text-link" @click="returnIndex()">返回</span></p>
			</div>
		</mt-popup>
		
		<div v-if="showAbout" id="about">
			<img src="../../static/img/logo.png" alt="" class="logo" />
			<div class="about-content">
				<p class="text">茫茫求职路上，你是否会对职业规划迷失了方向？想了解行业的发展趋势却无从下手？</p>
				<p class="text">"职研"就是你的助手，能从海量的招聘信息中，筛选出有价值的数据。</p>
				<p class="text">(欢迎在意见反馈区留言，我们将为你提供更良好的使用体验)</p>
			</div>
		</div>
		<template v-else>
			<chartDemand ref="chartDemand"></chartDemand>
			<chartSalary ref="chartSalary"></chartSalary>
			<chartEducation ref="chartEducation"></chartEducation>
			<chartExperience ref="chartExperience"></chartExperience>
			<chartWelfare ref="chartWelfare"></chartWelfare>
		</template>
		
		<div @click="toSuggestion()" id="btn-suggestion"></div>
	</div>
</template>

<script>
import chartDemand from '../components/chartDemand.vue'
import chartSalary from '../components/chartSalary.vue'
import chartEducation from '../components/chartEducation'
import chartExperience from '../components/chartExperience'
import chartWelfare from '../components/chartWelfare'
	
import {getCities, matchIndustry, getAnalyse} from '../config/api'

export default {
	data(){
	    return{
	    	showAbout: true,  //是否显示简介页
	    	city: '广州',
	    	tempCity: '',
	    	cityPickerVisible: false,
	    	toLookForward: '更多城市，敬请期待...',
	    	slots: [{
	    		values: [],
	    		className: 'slot1'
	    	}],
	    	searchKey: '',
	    	searchKey2: '',
	    	searchResultVisible: false,
	    	searchResult: [],
	    	districts: [],  //记录区名
	    	demandDatas: [],  //各区招聘需求
	    	salaryHighestDatas: [],  //各区最高薪酬
	    	salaryLowestDatas: [],  //各区最低薪酬
	    	salaryAverageDatas: [],  //各区平均薪酬
	    	educationDatas: [],  //学历要求
	    	experienceDatas: [],  //工作经验要求
	    	welfareDatas: [],  //福利待遇热词
	    }
	},
	components:{
		chartDemand,
		chartSalary,
		chartEducation,
		chartExperience,
		chartWelfare
	},
	watch: {
		cityPickerVisible:function(newVal, oldVal){
			let self = this
			
			if(newVal){
				return
			}
			if(!self.city){
				return
			}
			if(!self.searchKey2){
				return
			}
			
			setTimeout(function(){
				self.toGetAnalyse(self.searchKey2)
			}, 500)
		}
	},
	mounted(){
		this.init()
	},
	methods:{
		init(){
		  	let self = this
		  	
		  	//获取城市名
		  	getCities().then(res => {
		  		let tempValues = res.data.cities
		  		tempValues.push(self.toLookForward)
		  		self.slots.values = tempValues
		  		self.$set(self.slots[0], 'values', tempValues)
		  		self.$set(self.slots[0], 'defaultIndex', 3)
		    })
		  	
		  	//监听输入框
		  	this.$refs.searchInput.addEventListener('keypress', function(e){
		        let keycode = e.keyCode
		        if(keycode=='13') {
		        	e.preventDefault()
		        	if(!self.searchKey){
		        		return
		        	}
		        	//请求匹配行业接口
		        	self.$refs.searchInput.blur()
		        	self.toMatchIndustry()
		        }
	    	})
    	},
	    showPicker(){
	    	this.cityPickerVisible = true
	    },
	    hidePicker(){
	    	this.cityPickerVisible = false
	    	this.city = this.tempCity
	    },
	    onValuesChange(picker, values){
	    	if(values[0] == this.toLookForward){
	    		setTimeout(function(){
	    			picker.setValues(['成都'])
					return
	    		}, 300)
			}else{
				if(values.length){
		    		this.tempCity = values[0]
		    	}
			}
	    },
	    returnIndex(){
	    	this.searchResultVisible = false
	    },
	    toMatchIndustry(){
	    	//请求匹配行业接口
	    	matchIndustry({
		    	"keyword": this.searchKey
		    }).then(res => {
		    	this.searchResultVisible = true
		    	this.searchResult = res.data.industries
		    })
	    },
	    toGetAnalyse(keyword){
	    	this.showAbout = false
	    	
	    	//请求分析结果接口
	    	getAnalyse({
	    		"city": this.city,
		    	"keyword": keyword
		    }).then(res => {
		    	this.searchResultVisible = false
		    	this.searchKey = keyword
		    	this.searchKey2 = keyword
		    	
		    	this.districts = res.data.districts
		    	
		    	//各区招聘需求
		    	this.demandDatas = res.data.demand
		    	this.$refs.chartDemand.drawChart(this.districts, this.demandDatas)
		    	
		    	//各区薪酬
		    	this.salaryLowestDatas = res.data.salaryLowest
		    	this.salaryAverageDatas = res.data.salaryAverage
		    	this.salaryHighestDatas = res.data.salaryHighest
		    	this.$refs.chartSalary.drawChart(this.districts, this.salaryLowestDatas, this.salaryAverageDatas, this.salaryHighestDatas)
		    	
		    	//学历要求
		    	this.educationDatas = res.data.education
		    	this.$refs.chartEducation.drawChart(this.educationDatas)
		    	
		    	//工作经验要求
		    	this.experienceDatas = res.data.experience
		    	this.$refs.chartExperience.drawChart(this.experienceDatas)
		    	
		    	//福利待遇
		    	this.welfareDatas = res.data.welfare
		    	this.$refs.chartWelfare.drawChart(this.welfareDatas)
		    })
	    },
	    toSuggestion(){
	    	this.$router.push('/suggestion')
	    }
	}
}
</script>

<style lang="scss" scoped>
	@import '../style/mixin';
	.container{
		height: 100%;
	}
	.hidden-y{
		overflow-y: hidden;
	}
  
	.top-bar{
  		position: relative;
  		width: 100%;
		height: REM(100);
		background: #55cbc4;
		border-bottom: 1rpx solid #55cbc4;
		color: #61687c;
		font-size: REM(30);
		line-height: REM(100);
		.text-city{
			position: relative;
			display: inline-block;
			width: REM(170);
			height: 100%;
			text-align: center;
			color: $textMain;
			&:after{
				content: "";
				position: absolute;
				display: block;
				width: 0;
				height: 0;
				right: 0;
				top: REM(47);
				border: REM(10) solid transparent;
				border-top-color: $textMain;
			}
		}
		#keyword-input{
			display: inline-block;
			position:absolute;
			width: REM(470);
			height: REM(60);
			padding: 0 REM(20);
			top: REM(20);
			right: REM(20);
			background: #ffffff;
			border-radius: REM(30);
		}
	}
	.btn-bar-picker{
		font-size: 0;
		#btn-confirm-picker{
			float: right;
			padding: REM(20);
			color: $green;
			font-size: REM(40);
			text-align: right;
		}
	}
	.search-result{
	  	width: 100%;
	  	height: 100%;
	  	background: $white;
	  	overflow-y: scroll;
	  	.search-exist-title{
	  		color: $green;
	  		padding: REM(20);
	  		background: $bg;
	  		font-size: REM(40);
	  	}
	  	.search-exist-li{
	  		padding: REM(30) REM(20);
	  		font-size: REM(30);
	  		color: $textGrey;
	  		border-bottom: 1px solid $bg;
	  	}
	  	.search-none{
	  		padding-top: REM(250);
	  		.search-none-text{
	  			color: $textGrey;
	  			font-size: REM(30);
	  			text-align: center;
	  			.search-none-text-link{
	  				color: $textLink;
	  			}
	  		}
	  	}
	}
	#about{
		width: 100%;
		background: $bg;
		.logo{
			display: block;
			width: REM(199*2);
			height: REM(93*2);
			margin: REM(100) auto REM(50);
		}
		.about-content{
			padding: REM(25) REM(50);
			.text{
				color: $textBlack;
				font-size: REM(28);
				text-indent: 2em;
				line-height: 2;
			}
		}
	}
	#btn-suggestion{
		position: fixed;
		width: REM(100);
		height: REM(100);
		bottom: REM(50);
		right: REM(20);
		background: url(../../static/img/btn_suggestion.png) 0 0 no-repeat;
		background-size: 100% 100%;
		z-index: 2;
	}
</style>