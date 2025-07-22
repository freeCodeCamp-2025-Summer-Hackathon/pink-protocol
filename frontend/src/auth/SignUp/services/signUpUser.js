import { apiClient } from '../../../_lib/apiClient.js'

export const signUpUser = (payload) =>
  apiClient
    .post('/users', payload, {
      validateStatus: (s) => [200, 404, 422].includes(s),
    })
    .then(({ data, status }) => ({ data, httpCode: status }))
