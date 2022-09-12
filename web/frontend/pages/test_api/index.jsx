import SubmitionApi from '../../apis/submition.js'

function TestApi() {
  const handleTestApi = async () => {
    try {
      const res = await SubmitionApi.submit()

      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return <button onClick={handleTestApi}>Test api</button>
}

export default TestApi
