import fetch from '@/utils/fetch'

//客户列表,is_pay_cnd:is_pay_cnd
export function customerList(params) {
    return fetch({
        url: '/customer/qryCustomerList?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&mobile_cnd='+params.mobile_cnd+'&user_name_cnd='
        +params.user_name_cnd+'&id_card_cnd='+params.id_card_cnd+'&bank_card_cnd='
        +params.bank_card_cnd+'&user_auth_cnd='+params.user_auth_cnd+'&is_pay_cnd='+params.is_pay_cnd+'&status_cnd='+params.status_cnd+'&source_cnd='+params.source_cnd+'&create_time_FROM_cnd='+params.create_time_FROM_cnd+'&create_time_TO_cnd='+params.create_time_TO_cnd
        +'&pay_time_FROM_cnd='+params.pay_time_FROM_cnd+'&pay_time_TO_cnd='+params.pay_time_TO_cnd,
        method: 'get',
        data: params
    })
}
//客户支付列表
export function qryCustomerMoneyAllSys(params) {
    return fetch({
        url: '/customer/qryCustomerMoneyAllSys?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&name_cnd='+params.name_cnd,
        method: 'post',
        data: params
    })
}
//客户来源
export function qrySourceAll(params) {
    return fetch({
        url: '/dataSource/qrySourceAll',
        method: 'get',
        data: params
    })
}

//业务统计
export function qryBusinessStatistics(params) {
    return fetch({
        url: '/customer/qryBusinessStatistics',
        method: 'get',
        data: params
    })
}
 
//客户汇总列表
export function qryCustomerMoneyAll(params) {
    return fetch({
        url: '/customer/qryCustomerMoneyAll?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&mobile_cnd='+params.mobile_cnd+'&user_name_cnd='
        +params.user_name_cnd+'&id_card_cnd='+params.id_card_cnd+'&bank_card_cnd='
        +params.bank_card_cnd+'&user_auth_cnd='+'&is_pay_cnd='+params.is_pay_cnd+params.user_auth_cnd+'&status_cnd='+params.status_cnd+'&source_cnd='+params.source_cnd+'&create_time_FROM_cnd='+params.create_time_FROM_cnd+'&create_time_TO_cnd='+params.create_time_TO_cnd
        +'&pay_time_FROM_cnd='+params.pay_time_FROM_cnd+'&pay_time_TO_cnd='+params.pay_time_TO_cnd,
        method: 'post',
        data: params
    })
}

//导出
export function exportCustomer(params) {
    return fetch({
        url: '/customer/exportCustomerList?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&mobile_cnd='+params.mobile_cnd+'&user_name_cnd='
        +params.user_name_cnd+'&id_card_cnd='+params.id_card_cnd+'&bank_card_cnd='
        +params.bank_card_cnd+'&is_pay_cnd='+params.is_pay_cnd+'&user_auth_cnd='+params.user_auth_cnd+'&status_cnd='+params.status_cnd+'&source_cnd='+params.source_cnd+'&create_time_FROM_cnd='+params.create_time_FROM_cnd+'&create_time_TO_cnd='+params.create_time_TO_cnd
        +'&pay_time_FROM_cnd='+params.pay_time_FROM_cnd+'&pay_time_TO_cnd='+params.pay_time_TO_cnd,
        method: 'get',
        data: params
    })
}
//禁用/恢复客户
export function updateCustomer(params) {
    return fetch({
        url: '/customer/updateCustomer?id='+params.id+'&status='+params.status,
        method: 'post',
        data: params
    })
}
//订单
export function updateCustomerOrder(params) {
    return fetch({
        url: '/customer/updateCustomerOrder?id='+params.id+'&orderStatus='+params.orderStatus,
        method: 'post',
        data: params
    })
}
//查看客户详情
export function qryCustomerById(params) {
    return fetch({
        url: '/customer/qryCustomerById/'+params.id,
        method: 'get',
        data: params
    })
}
//保存客户
export function saveCustomer(params) {
    return fetch({
        url: '/customer/updateCustomerById',
        method: 'post',
        data: params
    })
  }