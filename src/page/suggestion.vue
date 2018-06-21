<template>
	<div class="container my-style">
		<div class="page-head">
			<div class="page-head-title">意见反馈</div>
			<div class="page-head-line"></div>
		</div>
		
		<div class="page-section">
			<div class="form-cells form-cells-title">请提供联系方式：</div>
			<div class="form-cells white">
				<input v-model="contact" id="contact-input" type="text" placeholder="电话、微信号或邮箱" />
			</div>
		</div>
		<div class="page-section">
			<div class="form-cells form-cells-title">请留下您的意见反馈：</div>
			<div class="form-cells white">
				<textarea v-model="suggestion" id="suggestion-textarea" placeholder="200字以内" maxlength="200"></textarea>
			</div>
		</div>
		
		<div @click="validate()" id="btn-submit">提交</div>
	</div>
</template>

<script>
import {Toast} from 'mint-ui'
import {saveSuggestion} from '../config/api'

export default {
	data(){
	    return{
	    	contact: '',
	    	suggestion: '',
	    	hasSubmited: false  //是否已提交
	    }
	},
	watch: {
		contact:function(newVal, oldVal){
			this.hasSubmited = false
		},
		suggestion:function(newVal, oldVal){
			this.hasSubmited = false
		}
	},
	mounted(){
		this.init()
	},
	methods:{
		init(){
			this.makeExpandingArea(document.getElementById('suggestion-textarea'))
		},
		
		// textarea 自适应高度
		makeExpandingArea(el) {
		    let setStyle = function(el) {
		        el.style.height = 'auto'
		        el.style.height = el.scrollHeight + 'px'
		    }
		    let delayedResize = function(el) {
		        window.setTimeout(function() {
		            setStyle(el)
		        }, 0)
		    }
		    if (el.addEventListener) {
		        el.addEventListener('input', function() {
		            setStyle(el)
		        }, false)
		        setStyle(el)
		    } else if (el.attachEvent) {
		        el.attachEvent('onpropertychange', function() {
		            setStyle(el)
		        })
		        setStyle(el)
		    }
		    //IE9
		    if (window.VBArray && window.addEventListener) {
		        el.attachEvent("onkeydown", function() {
		            let key = window.event.keyCode;
		            if (key == 8 || key == 46) delayedResize(el)
		        })
		        //处理粘贴
		        el.attachEvent("oncut", function() {
		            delayedResize(el)
		        })
		    }
		},
		
		validate(){
			if(document.querySelector('.mint-toast')){
				return
			}
			
			if(this.hasSubmited){
				Toast('请勿重复提交~')
				return
			}
			
			if(!this.contact){
				Toast('联系方式不能为空哦~')
				return
			}
			if(!this.suggestion){
				Toast('意见反馈不能为空哦~')
				return
			}
			
			this.submitSuggestion()
		},
		submitSuggestion(){
			saveSuggestion({
				"contact": this.contact,
				"content": this.suggestion
			}).then(res => {
				if(res.data.success){
					Toast('提交成功！')
					this.hasSubmited = true
				}else{
					Toast('提交失败~')
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	@import '../style/mixin';
	
	.container{
		background: $bg;
	}
	
	.page-head{
		padding: REM(60) REM(50) REM(80);
		text-align: center;
	}
	.page-head-title{
		width: 100%;
		padding: 0 0 REM(20);
		color: #bebebe;
		font-size: REM(32);
	}
	.page-head-line{
		margin: 0 auto;
		width: REM(200);
		height: 1px;
		background: #d8d8d8;
	}
	.page-section{
		width: 100%;
		margin-bottom: REM(60);
	}
	.form-cells{
		padding-left: REM(25);
		padding-right: REM(25);
		margin-top: REM(20);
		margin-bottom: REM(20);
		color: $textBlack;
		font-size: REM(28);
	}
	.form-cells-title{
		font-size: REM(36);
	}
	.white{
		background: $white;
	}
	
	#contact-input{
		width: 100%;
		line-height: REM(80);
		font-size: REM(30);
	}
	#suggestion-textarea{
		width: 100%;
		min-height: REM(140);
		margin-top: REM(20);
		margin-bottom: REM(20);
		font-size: REM(30);
	}
	#btn-submit{
		margin-left: REM(25);
		margin-right: REM(25);
		line-height: REM(90);
		background: #55cbc4;
		border-radius: REM(10);
		color: $white;
		font-size: REM(44);
		text-align: center;
	}
</style>