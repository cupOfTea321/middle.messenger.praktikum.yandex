// const routes = [
//     { path: '/', component: authPage },
//     { path: '/about', component: About },
//     { path: '/contacts', component: Contacts }
// ]
//
// const router = () => {
//     const path = location.pathname
//     const route = routes.find(route => route.path === path)
//
//     if (route) {
//         const component = new route.component()
//         component.render()
//     } else {
//         const notFound = new NotFound()
//         notFound.render()
//     }
// }
//
// window.addEventListener('popstate', router)
//
// document.addEventListener('DOMContentLoaded', () => {
//     document.body.addEventListener('click', e => {
//         if (e.target.getAttribute('data-link')) {
//             e.preventDefault()
//             const path = e.target.getAttribute('href')
//             history.pushState(null, null, path)
//             router()
//         }
//     })
// })
//
// router()
