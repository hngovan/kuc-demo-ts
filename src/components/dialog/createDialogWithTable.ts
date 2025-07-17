import { Dialog, DialogProps, ReadOnlyTable } from 'kintone-ui-component'

export const createDialogWithTable = (resultTable: ReadOnlyTable) => {
  const dialogProps: DialogProps = {
    title: 'Search Result',
    content: resultTable
  }
  const result = new Dialog(dialogProps)
  result.open()
}
