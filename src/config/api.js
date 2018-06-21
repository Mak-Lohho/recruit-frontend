import { fetch } from "./fetch"; //引用fetch.js

let api = ''
if (process.env.NODE_ENV == 'development') {  //本地调试环境
	api = '/api'
}else if(process.env.NODE_ENV == 'test'){  //外部测试环境
	
}else if(process.env.NODE_ENV == 'production'){  //线上环境
	
}

//获取城市名
export function getCities(data) {
  return fetch({
   	url: api + '/recruit/getCities',
   	method: 'get',
   	params: data
  })
}

//获取匹配到的行业
export function matchIndustry(data) {
  return fetch({
	url: api + '/recruit/matchIndustry',
    method: 'post',
    data: data
  })
}

//获取行业分析结果
export function getAnalyse(data) {
  return fetch({
	url: api + '/recruit/getAnalyse',
    method: 'post',
    data: data
  })
}

//提交意见反馈
export function saveSuggestion(data) {
  return fetch({
	url: api + '/recruit/saveSuggestion',
    method: 'post',
    data: data
  })
}