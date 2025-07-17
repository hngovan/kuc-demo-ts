import { Button, Text, TextProps, ButtonProps, Notification } from 'kintone-ui-component'
import { getAllRecords } from './api/product'
// import { createReadOnlyTable } from './components/table/createReadOnlyTable'
// import { createDialogWithTable } from './components/dialog/createDialogWithTable'
import './assets/css/main.css'

kintone.events.on('app.record.index.show', (event) => {
  // Prevent components duplication bug
  if (document.getElementById('kuc-searchbox-text')) {
    return event
  }

  const header = kintone.app.getHeaderMenuSpaceElement()
  const app = kintone.app.getId()

  if (!header) {
    throw new Error('Header element not found')
  }

  const textProps: TextProps = {
    id: 'kuc-searchbox-text',
    placeholder: 'Search for products'
  }

  const buttonProps: ButtonProps = {
    id: 'kuc-searchbox-button',
    text: 'Search',
    type: 'submit'
  }

  const text = new Text(textProps)
  const button = new Button(buttonProps)

  button.addEventListener('click', async (clickEvent) => {
    const keyword = text.value.trim()
    const errorMessage = 'Please enter a value.'

    // Hide the error message
    text.error = ''
    if (!keyword) {
      // Show the error message
      text.error = errorMessage
    } else {
      try {
        const apiResult = await getAllRecords(keyword, app)

        if (apiResult.length === 0) {
          const info = new Notification({
            text: 'No records',
            type: 'info'
          })
          info.open()
        }

        const records = apiResult.map((record) => {
          return {
            ...record,
            $id: {
              type: record.$id.type,
              value: `<a href=/k/${app}/show#record=${record.$id.value}>${record.$id.value}</a>`
            }
          }
        })

        const idView = event.viewId
        // f9342 = field 'product'
        const q = encodeURIComponent(`f9342 like "${keyword}"`)
        const url = `?view=${idView}&q=${encodeURIComponent(`f9342 like "${keyword}"`)}`
        window.location.replace(url)

        // const resultTable = createReadOnlyTable(records)
        // createDialogWithTable(resultTable)
      } catch (error: any) {
        let errmsg = 'An error occurred while retrieving the record.'
        if (error.message !== undefined) {
          errmsg += ' ' + error.message
        }
        const alert = new Notification({
          text: errmsg
        })
        alert.open() // Show ale
      }
    }
  })
  header.appendChild(text)
  header.appendChild(button)

  return event
})
