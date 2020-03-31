import fetch from '@/utils/fetch'

//产品访问数据统计列表
export function qryDataProductListBy1(params) {
    return fetch({
        url: '/dataProduct/qryDataProductListBy1?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&product_name_cnd='+params.product_name_cnd
        +'&visit_time_FROM_cnd='+params.visit_time_FROM_cnd
        +'&visit_time_TO_cnd='+params.visit_time_TO_cnd,
        method: 'get',
        data: params
    })
}
//产品访问数据统计列表2
export function qryDataProductListBy2(params) {
    return fetch({
        url: '/dataProduct/qryDataProductListBy2?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&product_name_cnd='+params.product_name_cnd
        +'&visit_time_FROM_cnd='+params.visit_time_FROM_cnd
        +'&visit_time_TO_cnd='+params.visit_time_TO_cnd,
        method: 'get',
        data: params
    })
}

//产品访问统计图--产品来源
export function qryProductListAll(params) {
    return fetch({
        url: '/product/qryProductListAll?',
        method: 'get',
        data: params
    })
}
//产品访问统计图
export function qryDataEchartsProductById(params) {
    return fetch({
        url: '/dataProduct/qryDataEchartsProductById?'+'productId='+params.productId+'&daysFrom='+params.daysFrom+'&daysTo='+params.daysTo,
        method: 'get',
        data: params
    })
}


//导出产品访问数据统计
export function exportDataProductList(params) {
    return fetch({
        url: '/dataProduct/exportDataProductList?'+'&product_name_cnd='+params.product_name_cnd
        +'&visit_time_FROM_cnd='+params.visit_time_FROM_cnd
        +'&visit_time_TO_cnd='+params.visit_time_TO_cnd,
        method: 'get',
        data: params
    })
}

//点击来源数据统计1
export function qryDataSourceSum(params) {
    return fetch({
        url: '/dataSource/qryDataSourceSum?'+'source_cnd='+params.source_cnd+'&visit_time_FROM_cnd='+params.visit_time_FROM_cnd+'&visit_time_TO_cnd='+params.visit_time_TO_cnd,
        method: 'get',
        data: params
    })
}
//点击来源数据统计2
export function qryDataSourceList(params) {
    return fetch({
        url: '/dataSource/qryDataSourceList?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&source_cnd='+params.source_cnd+'&visit_time_FROM_cnd='+params.visit_time_FROM_cnd+'&visit_time_TO_cnd='+params.visit_time_TO_cnd,
        method: 'get',
        data: params
    })
}
//点击来源统计图
export function qryDataEchartsSourceBySource(params) {
    return fetch({
        url: '/dataSource/qryDataEchartsSourceBySource?'+'source='+params.source+'&daysFrom='+params.daysFrom+'&daysTo='+params.daysTo,
        method: 'get',
        data: params
    })
}

//点击来源统计图产品来源
export function qrySourceAll(params) {
    return fetch({
        url: '/dataSource/qrySourceAll',
        method: 'get',
        data: params
    })
}


//财务统计
//列表
export function qryDataFinanceReportList(params) {
    return fetch({
        url: '/dataReport/qryDataFinanceReportList?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&source_cnd='+params.source_cnd+'&visit_time_FROM_cnd='+params.visit_time_FROM_cnd+'&visit_time_TO_cnd	='+params.visit_time_TO_cnd	,
        method: 'get',
        data: params
    })
}
