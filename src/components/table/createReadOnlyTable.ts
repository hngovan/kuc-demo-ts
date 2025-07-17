import { Record } from '@kintone/rest-api-client/lib/src/client/types'
import { ReadOnlyTable, ReadOnlyTableProps } from 'kintone-ui-component'

export const createReadOnlyTable = (records: Record[]) => {
  const formattedData = records.map((record) => {
    const formattedRecord: any = {}
    for (const [field, value] of Object.entries(record)) {
      formattedRecord[field] = value?.value ?? null
    }
    return formattedRecord
  })

  const initialTableData: ReadOnlyTableProps = {
    columns: [
      {
        title: 'ID',
        field: '$id'
      },
      {
        title: 'Product',
        field: 'product'
      },
      {
        title: 'Price',
        field: 'price'
      }
    ],
    data: formattedData,
    id: 'kuc-searchbox-readonly-table',
    visible: true,
    pagination: true,
    rowsPerPage: 5
  }

  const table = new ReadOnlyTable(initialTableData)
  return table
}
