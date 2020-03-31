const getters = {
  sidebar: state => state.app.sidebar,
  userInfo: state => state.user.userInfo,
  permission_routers: state =>state.app.routers,
  getStorage: state => state.token,
  // activeName: state => state.app.activeName
}
export default getters
