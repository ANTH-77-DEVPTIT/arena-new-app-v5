import apiCaller from '../helpers/apiCaller'

const SubmitionApi = {
  submit: async (query) => {
    return await apiCaller(`/api/submition${query || ''}`)
  },
}

export default SubmitionApi
