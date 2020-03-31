import fetch from '@/utils/fetch'

//业务配置列表
export function configList(params) {
    return fetch({
        url: '/dictConfig/qryDictConfigList?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&data_type='+params.data_type+'&data_type_cnd='
        +params.data_type_cnd+'&item_value_cnd='+params.item_value_cnd+'&is_use_cnd='
        +params.is_use_cnd,
        method: 'get',
        data: params
    })
}
 
//导出
export function exportConfig(params) {
    return fetch({
        url: '/dictConfig/exportDictConfigList?'+'&data_type='+params.data_type+'&data_type_cnd='
        +params.data_type_cnd+'&item_value_cnd='+params.item_value_cnd+'&is_use_cnd='
        +params.is_use_cnd,
        method: 'get',
        data: params
    })
}
//根据data_type查询字段表
export function qryDataType(params) {
    return fetch({
        url: '/dictConfig/qryDictByDataType?data_type='+params.data_type,
        method: 'get',
        data: params
    })
}
//根据id获取业务配置查看
export function dicInfo(params) {
    return fetch({
        url: '/dictConfig/qryDictById/'+params.id,
        method: 'get',
        data: params
    })
}

//业务配置-配置参数
export function qryDictByShow(params) {
    return fetch({
        url: '/dictConfig/qryDictByShow',
        method: 'get',
        data: params
    })
}

//新增申请条件保存，编辑配置参数保存
export function saveConfig(params) {
    return fetch({
        url: '/dictConfig/saveConfig',
        method: 'post',
        data: params
    })
}

//保存业务配置2
export function saveConfigDict(params) {
    return fetch({
        url: '/dictConfig/saveConfigDict',
        method: 'post',
        data: params
    })
}

//修改业务配置
export function updateConfigDict(params) {
    return fetch({
        url: '/dictConfig/updateConfigDict?id='+params.id+'&status='+params.status,
        method: 'post',
        data: params
    })
  }