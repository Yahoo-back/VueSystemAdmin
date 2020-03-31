import fetch from '@/utils/fetch'
//渠道注册
//查询渠道注册所有员工
export function qryUserListByType(params) {
    return fetch({
        url: '/qudao/qryUserListByType?'+'user_code_cnd='+params.user_code_cnd+'&identity_card_cnd='+params.identity_card_cnd
        +'&user_name_cnd='+params.user_name_cnd+'&sex_cnd='+params.sex_cnd+'&status_cnd='+params.status_cnd
        +'&pageSize='+params.pageSize+'&pageNum='+params.pageNum,
        method: 'get',
        data: params
    })
}
//保存或更新渠道
export function saveUserQudao(params) {
    return fetch({
        url: '/qudao/saveUserQudao',
        method: 'post',
        data: params
    })
}

//渠道统计
//渠道统计列表
export function qryQuDaoDataSourceList(params) {
    return fetch({
        url: '/qudao/qryQuDaoDataSourceList?'+'source_cnd='+params.source_cnd+'&visit_time_FROM_cnd='+params.visit_time_FROM_cnd
        +'&visit_time_TO_cnd='+params.visit_time_TO_cnd+'&pageSize='+params.pageSize+'&pageNum='+params.pageNum,
        method: 'get',
        data: params
    })
}

//渠道统计总列表
export function qryQuDaoDataSourceSum(params) {
    return fetch({
        url: '/qudao/qryQuDaoDataSourceSum?'+'source_cnd='+params.source_cnd+'&visit_time_FROM_cnd='+params.visit_time_FROM_cnd
        +'&visit_time_TO_cnd='+params.visit_time_TO_cnd,
        method: 'get',
        data: params
    })
}

//渠道缩量
//渠道缩量列表
export function qryQuDaoSl(params) {
    return fetch({
        url: '/qudao/qryQuDaoSl?'+'source_cnd='+params.source_cnd+'&visit_time_FROM_cnd='+params.visit_time_FROM_cnd
        +'&visit_time_TO_cnd='+params.visit_time_TO_cnd+'&pageSize='+params.pageSize+'&pageNum='+params.pageNum,
        method: 'get',
        data: params
    })
}
//渠道来源
export function qrySourceAll(params) {
    return fetch({
        url: '/dataSource/qrySourceAll',
        method: 'get',
        data: params
    })
}
//渠道来源
export function qryMySourceAll(params) {
    return fetch({
        url: '/dataSource/qryMySourceAll',
        method: 'get',
        data: params
    })
}
//渠道缩量查看
export function qrySourceByLgnId(params) {
    return fetch({
        url: '/qudao/qrySourceByLgnId/'+params.id,
        method: 'get',
        data: params
    })
}
//保存或更新渠道缩量
export function saveQdaoSlList(params) {
    return fetch({
        url: '/qudao/saveQdaoSlList',
        method: 'post',
        data: params
    })
}

//我的渠道
export function qryMyChannelList(params) {
    return fetch({
        url: '/qudao/qryMyChannelList?'+'source_cnd='+params.source_cnd+'&visit_time_FROM_cnd='+params.visit_time_FROM_cnd
        +'&visit_time_TO_cnd='+params.visit_time_TO_cnd+'&pageSize='+params.pageSize+'&pageNum='+params.pageNum,
        method: 'get',
        data: params
    })
}



//菜单项管理
//查询所有菜单
export function qryAllMeuns(params) {
    return fetch({
        url: '/meun/qryAllMeuns',
        method: 'post',
        data: params
    })
}
//删除菜单
export function deleteMuen(params) {
    return fetch({
        url: '/meun/deleteMuen?'+'meunId='+params.meunId,
        method: 'post',
        data: params
    })
}
//保存菜单
export function saveMuen(params) {
    return fetch({
        url: '/meun/saveMuen',
        method: 'post',
        data: params
    })
}
//根据id查询菜单
export function qryMeun(params) {
    return fetch({
        url: '/meun/qryMeun/'+params.meunId,
        method: 'get',
        data: params
    })
}



//角色管理
//保存角色下的菜单
export function allocationMeuns(params) {
    return fetch({
        url: '/roles/allocationMeuns?'+'roleId='+params.roleId+'&meunId='+params.meunId,
        method: 'post',
        data: params
    })
}
//保存员工分配的角色
export function allocationRoles(params) {
    return fetch({
        url: '/roles/allocationRoles?'+'roleId='+params.roleId+'&roleId_cnd='+params.roleId_cnd,
        method: 'post',
        data: params
    })
}
//删除角色
export function deleteRoles(params) {
    return fetch({
        url: '/roles/deleteRoles?'+'id='+params.id,
        method: 'post',
        data: params
    })
}
//根据角色查询菜单
export function qryRoleMenu(params) {
    return fetch({
        url: '/roles/qryMeunsByRole/'+params.roleId,
        method: 'get',
        data: params
    })
}
//查询所有角色
export function qryRoles(params) {
    return fetch({
        url: '/roles/qryRoles?'+'pageSize='+params.pageSize+'&pageNum='+params.pageNum+'&roleId_cnd='+params.roleId_cnd+'&roleName_cnd='
        +params.roleName_cnd+'&roleCode_cnd='+params.roleCode_cnd,
        method: 'get',
        data: params
    })
}
//查询员工所属角色
export function qryUserRole(params) {
    return fetch({
        url: '/roles/qryUserRole?'+'userCode='+params.userCode,
        method: 'get',
        data: params
    })
}
//保存角色
export function saveRoles(params) {
    return fetch({
        url: '/roles/saveRoles',
        method: 'post',
        data: params
    })
}


//员工管理
//根据登录id查询员工
export function qryUserByLgnId(params) {
    return fetch({
        url: '/admin/qryUserByLgnId/' + params.userId,
        method: 'get',
        data:params
    })
}
//查询所有员工
export function qryUserList(params) {
    return fetch({
        url: '/admin/qryUserList?'+'user_code_cnd='+params.user_code_cnd+'&identity_card_cnd='+params.identity_card_cnd
        +'&user_name_cnd='+params.user_name_cnd+'&sex_cnd='+params.sex_cnd+'&status_cnd='+params.status_cnd
        +'&pageSize='+params.pageSize+'&pageNum='+params.pageNum,
        method: 'post',
        data: params
    })
}
//重置员工密码
export function resetPassword(params) {
    return fetch({
        url: '/admin/resetPassword?'+'id='+params.id,
        method: 'post',
        data: params
    })
}
//保存或更新员工
export function saveUser(params) {
    return fetch({
        url: '/admin/saveUser',
        method: 'post',
        data: params
    })
}
//更改员工状态
export function updateUserStatus(params) {
    return fetch({
        url: '/admin/updateUserStatus?'+'id='+params.id+'&status='+params.status,
        method: 'post',
        data: params
    })
}