import { ActionList, Badge, Button, DataTable, Popover, Stack, Thumbnail } from '@shopify/polaris'
import { MobileVerticalDotsMajor, ImagesMajor } from '@shopify/polaris-icons'
import { useState } from 'react'
function Table(props) {
  const { products, onEdit, onDelete } = props
  console.log('🚀 ~ file:  products', products)

  let rows = []

  if (products?.edges) {
    rows = products.edges.map((item, index) => [
      index + 1,
      <div style={{ maxWidth: 300, whiteSpace: 'normal' }}>{item.node.title}</div>,
      <Badge status={item.node.status === 'active' ? 'success' : ''}>
        {item.node.status.toUpperCase()}
      </Badge>,
      <div style={{ maxWidth: 300, whiteSpace: 'normal' }}>{item.node.vendor}</div>,
    ])
  }

  return (
    <DataTable
      headings={['No.', 'Product', 'Status', 'Advanced']}
      columnContentTypes={['text', 'text', 'text', 'text', 'text']}
      rows={rows}
    />
  )
}

export default Table
