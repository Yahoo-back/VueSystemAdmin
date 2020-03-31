import fetch from '@/utils/fetch'

//客户列表
export function qryRefund(params) {
    return fetch({
        url: '/refund/qryRefund?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&mobile_cnd='+params.mobile_cnd+'&id_card_cnd='+params.id_card_cnd,
        method: 'get',
        data: params
    })
}
//查看客户详情
export function qryRefundAttachById(params) {
    return fetch({
        url: '/refund/qryRefundAttachById/'+params.id,
        method: 'get',
        data: params
    })
}
//跟单
export function updateOrderAuditStatus(params) {
    return fetch({
        url: '/refund/updateOrderAuditStatus?id='+params.id+'&status='+params.status,
        method: 'post',
        data: params
    })
}

//我的客户列表
//客户列表
export function qryMyRefund(params) {
    return fetch({
        url: '/refund/qryMyRefund?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&mobile_cnd='+params.mobile_cnd+'&id_card_cnd='+params.id_card_cnd,
        method: 'get',
        data: params
    })
}

//退款列表
//列表
export function qryRefundList(params) {
    return fetch({
        url: '/refund/qryRefundList?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&mobile_cnd='+params.mobile_cnd+'&id_card_cnd='+params.id_card_cnd,
        method: 'get',
        data: params
    })
}
//退款
export function thirdPay(params) {
    return fetch({
        url: '/pay/thirdPay?'+'id='+params.id+'&money='+params.money+'&status='+params.status+'&type='+params.type,
        method: 'post',
        data: params
    })
  }
// 我的客户列表
  //退款/驳回
export function saveRefund(params) {
    return fetch({
        url: '/refund/saveRefund',
        method: 'post',
        data: params
    })
  }

//客服业绩统计
//列表
export function listStatistics(params) {
    return fetch({
        url: '/refund/listStatistics?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&user_name_cnd='+params.user_name_cnd+'&visit_time_FROM_cnd='+params.visit_time_FROM_cnd+'&visit_time_TO_cnd='+params.visit_time_TO_cnd,
        method: 'get',
        data: params
    })
}

//邮件退款列表
//列表
export function mailRefundList(params) {
    return fetch({
        url: '/refund/mailRefundList?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&mobile_cnd='+params.mobile_cnd+'&id_card_cnd='+params.id_card_cnd+'&bank_card_cnd='+params.bank_card_cnd+'&request_no_cnd='+params.request_no_cnd+'&user_name_cnd='+params.user_name_cnd,
        method: 'get',
        data: params
    })
}


//会员列表
export function qryVipUserList(params) {
    return fetch({
        url: '/refund/qryVipUserList?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&mobile_cnd='+params.mobile_cnd+'&id_card_cnd='+params.id_card_cnd+'&bank_card_cnd='+params.bank_card_cnd+'&vip_card_cnd='+params.vip_card_cnd,
        method: 'get',
        data: params
    })
}