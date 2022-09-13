import { Card, Pagination, Stack } from '@shopify/polaris'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SubmitionApi from '../../apis/submition.js'
import AppHeader from '../../components/AppHeader/index.jsx'
import CreateForm from './CreateForm.jsx'
import Table from './Table'

function Products1(props) {
  const { actions, location, navigate } = props

  const [searchParams, setSearchParams] = useSearchParams()

  const [products, setProducts] = useState(null)
  const [created, setCreated] = useState(null)
  const [deleted, setDeleted] = useState(null)

  const getProducts1 = async (query) => {
    try {
      actions.showAppLoading()
      let res = await SubmitionApi.submit(query)

      console.log(res.data)
      setProducts(res.data)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  useEffect(() => {
    getProducts1(location.search)
  }, [location.search])

  if (created) {
    return (
      <CreateForm
        {...props}
        created={created}
        onDiscard={() => setCreated(null)}
        onSubmit={(formData) => handleSubmit(formData)}
      />
    )
  }

  return (
    <Stack vertical alignment="fill">
      <AppHeader
        {...props}
        title="Products"
        primaryActions={[
          {
            label: 'Add product',
            primary: true,
            onClick: () => setCreated({}),
          },
        ]}
        onBack={() => navigate('/')}
      />

      <Card vertical alignment>
        <Card.Section>
          <div>Total items: 100</div>
        </Card.Section>
        <Table
          products={products}
          onEdit={(item) => setCreated(item)}
          onDelete={(item) => setDeleted(item)}
        />
        {products?.edges.length > 0 && (
          <Card.Section>
            <Stack distribution="center">
              <Stack.Item>
                <Pagination
                  hasPrevious={products.pageInfo.hasPreviousPage}
                  onPrevious={() => setSearchParams({ pageInfo: products.pageInfo.startCursor })}
                  hasNext={products.pageInfo.hasNextPage}
                  onNext={() => setSearchParams({ pageInfo: products.pageInfo.endCursor })}
                />
              </Stack.Item>
            </Stack>
          </Card.Section>
        )}
      </Card>
    </Stack>
  )
}

export default Products1
