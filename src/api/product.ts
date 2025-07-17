import { KintoneRestAPIClient } from '@kintone/rest-api-client'

export const getAllRecords = (keyword: string, appId: number) => {
  const client = new KintoneRestAPIClient()
  const body = {
    app: appId,
    // fields: ['$id', 'product', 'price'],
    condition: `product like "${keyword}" or price like "${keyword}"`,
    orderBy: 'Created_datetime desc'
  }

  return client.record.getAllRecords<any>(body)
}
