import fetch from '@/utils/fetch'

//商务合作列表
export function businessList(params) {
    return fetch({
        url: '/businessCustomer/qryBusinessCustomerList?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&name_cnd='+params.name_cnd+'&mobile_cnd='
        +params.mobile_cnd+'&create_time_FROM_cnd='+params.create_time_FROM_cnd+'&create_time_TO_cnd='+params.create_time_TO_cnd,
        method: 'get',
        data: params
    })
}

//导出
export function exportBusiness(params) {
    return fetch({
        url: '/businessCustomer/exportBusinessCustomerList?'+'name_cnd='+params.name_cnd+'&mobile_cnd='
        +params.mobile_cnd+'&create_time_FROM_cnd='+params.create_time_FROM_cnd+'&create_time_TO_cnd='+params.create_time_TO_cnd,
        method: 'get',
        data: params
    })
}