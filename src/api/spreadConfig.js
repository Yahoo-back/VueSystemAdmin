import fetch from '@/utils/fetch'

//推广配置列表
export function spreadConfigList(params) {
    return fetch({
        url: '/spreadConfig/qrySpreadConfigList?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&name_cnd='+params.name_cnd+'&url_cnd='
        +params.url_cnd+'&position_cnd='+params.position_cnd+'&status_cnd='
        +params.status_cnd+'&start_time_FROM_cnd='+params.start_time_FROM_cnd+'&start_time_TO_cnd='+params.start_time_TO_cnd+'&end_time_FROM_cnd='
        +params.end_time_FROM_cnd+'&end_time_TO_cnd='+params.end_time_TO_cnd,
        method: 'get',
        data: params
    })
}
 
//导出
export function exportSpreadConfig(params) {
    return fetch({
        url: '/spreadConfig/exportDictConfigList?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&name_cnd='+params.name_cnd+'&url_cnd='
        +params.url_cnd+'&position_cnd='+params.position_cnd+'&status_cnd='
        +params.status_cnd+'&start_time_FROM_cnd='+params.start_time_FROM_cnd+'&start_time_TO_cnd='+params.start_time_TO_cnd+'&end_time_FROM_cnd='
        +params.end_time_FROM_cnd+'&end_time_TO_cnd='+params.end_time_TO_cnd,
        method: 'get',
        data: params
    })
}
//根据id查看推广配置
export function qrySpreadConfigById(params) {
    return fetch({
        url: '/spreadConfig/qrySpreadConfigById/'+params.id,
        method: 'get',
        data: params
    })
}

//保存业务配置
export function saveSpreadConfig(params) {
    return fetch({
        url: '/spreadConfig/saveSpreadConfig',
        method: 'post',
        data: params
    })
}


//修改业务配置
export function updateSpreadConfig(params) {
    return fetch({
        url: '/spreadConfig/updateSpreadConfig?id='+params.id+'&status='+params.status,
        method: 'post',
        data: params
    })
  }