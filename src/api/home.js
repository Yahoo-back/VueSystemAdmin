export function homePage() {
    return fetch({
        url: '/main/homePage',
        method: 'get',
        params: {}
    })
  }