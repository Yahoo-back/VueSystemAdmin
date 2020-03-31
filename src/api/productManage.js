import fetch from '@/utils/fetch'

//商品列表
export function productList(params) {
    return fetch({
        url: '/product/qryProductList?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&name_cnd='+params.name_cnd+'&is_hot_cnd='
        +params.is_hot_cnd+'&classify_cnd='+params.classify_cnd+'&position_cnd='
        +params.position_cnd+'&status_cnd='+params.status_cnd+'&create_time_FROM_cnd='+params.create_time_FROM_cnd+'&create_time_TO_cnd='+params.create_time_TO_cnd,
        method: 'get',
        data: params
    })
}
//商品类型
export function qryProductClassifyAll(params) {
    return fetch({
        url: '/product/qryProductClassifyAll',
        method: 'get',
        data: params
    })
}
 
//商品详情/1.可授信额度 2.申请条件 3.申请资料
export function qryDictByDataType(params) {
    return fetch({
        url: '/dictConfig/qryDictByDataType?data_type='+params.data_type,
        method: 'get',
        data: params
    })
}
//导出
export function exportProduct(params) {
    return fetch({
        url: '/product/exportProductList?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&name_cnd='+params.name_cnd+'&is_hot_cnd='
        +params.is_hot_cnd+'&classify_cnd='+params.classify_cnd+'&position_cnd='
        +params.position_cnd+'&status_cnd='+params.status_cnd+'&create_time_FROM_cnd='+params.create_time_FROM_cnd+'&create_time_TO_cnd='+params.create_time_TO_cnd,
        method: 'get',
        data: params
    })
}
//置顶
export function topPosition(params) {
    return fetch({
        url: '/product/topPosition?id='+params.id,
        method: 'post',
        data: params
    })
}
//取消置顶/置尾
export function canclePosition(params) {
    return fetch({
        url: '/product/cancelPosition?id='+params.id,
        method: 'post',
        data: params
    })
}

//置尾
export function basePosition(params) {
    return fetch({
        url: '/product/basePosition?id='+params.id,
        method: 'post',
        data: params
    })
}

//上下架/删除
export function updateProduct(params) {
    return fetch({
        url: '/product/updateProduct?id='+params.id+'&status='+params.status,
        method: 'post',
        data: params
    })
}

//查看商品详情
export function qryProductById(params) {
    return fetch({
        url: '/product/qryProductById/'+params.id,
        method: 'get',
        data: params
    })
}

//保存商品
export function saveProduct(params) {
    return fetch({
        url: '/product/saveProduct',
        method: 'post',
        data: params
    })
}

  //上传图片
  export function upload(params) {
    return fetch({
        url: '/main/upload',
        credentials: 'include',
        method: 'post',
        data:params,
    })
}



//商品访问管理接口
//商品访问管理列表
export function qryProductVisitManageList(params) {
    return fetch({
        url: '/productVisitManage/qryProductVisitManageList?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&name_cnd='+params.name_cnd+'&create_time_FROM_cnd='
        +params.create_time_FROM_cnd+'&create_time_TO_cnd='+params.create_time_TO_cnd,
        method: 'get',
        data: params
    })
}
//开启/关闭
export function updateProductVisitManage(params) {
    return fetch({
        url: '/productVisitManage/updateProductVisitManage?id='+params.id+'&status='+params.status,
        method: 'post',
        data: params
    })
}

//保存访问商品
export function saveProductVisitManage(params) {
    return fetch({
        url: '/productVisitManage/saveProductVisitManage',
        method: 'post',
        data: params
    })
}

//新增商品--获取所有商品
export function qryVisitProductListAll(params) {
    return fetch({
        url: '/productVisitManage/qryVisitProductListAll',
        method: 'get',
        data: params
    })
}

//查看商品今日已访问次数
export function qryProductVisitCount(params) {
    return fetch({
        url: '/productVisitManage/qryProductVisitCount/'+params.id,
        method: 'get',
        data: params
    })
}