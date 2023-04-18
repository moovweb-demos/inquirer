// This file was added by edgio init.
// You should commit this file to source control.
import { Router, edgioRoutes } from '@edgio/core'
import transform from './transform'

export default new Router()
  // Here is an example where we cache api/* at the edge but prevent caching in the browser
  // .match('/api/:path*', {
  //   caching: {
  //     max_age: '1d',
  //     stale_while_revalidate: '1h',
  //     // bypass_client_cache: true,
  //     service_worker_max_age: '1d',
  //   },
  // })

  .match('/', ({ proxy }) => {
    proxy('origin', {
      transformResponse: transform
    })
  })


  // plugin enabling basic Edgio functionality
  .use(edgioRoutes)
