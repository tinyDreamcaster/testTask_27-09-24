import html2pdf from 'html2pdf.js'
import printJS from 'print-js'

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  CButton,
  CCloseButton,
  CSidebar,
  CSidebarHeader,
} from '@coreui/react-pro'

interface ComponentProps {
  data: any
  id: string
  signature: boolean
  textarea: boolean
}

const PrintDownloadButtons: React.FC<ComponentProps> = ({
  data,
  id,
  signature,
  textarea,
}) => {
  const DownloadFile = async (actionType: string) => {
    let signSection
    let info
    if (signature) {
      signSection = data.current.getElementsByClassName('sign-section')
      signSection[0].style.display = 'block'
    }

    if (textarea) {
      info = data.current.getElementsByClassName('commentsInfo')
      info[0].style.display = 'none'
    }

    const downloadButtons =
      data.current.getElementsByClassName('downloadButtons')

    downloadButtons[0].style.display = 'none'
    switch (actionType) {
      case 'download':
        await html2pdf(data.current)
        break
      case 'print':
        printJS({
          printable: id,
          type: 'html',
          style:
            '.modal-header { color: red; width: 100px; } .modal-body { width:100% }',
          css: ['my_stylesheet_1', 'my_stylesheet_2.css'],
          scanStyles: false,
        })

        break
      default:
        break
    }
    if (signature) {
      signSection[0].style.display = 'none'
    }

    if (textarea) {
      info[0].style.display = 'block'
    }

    downloadButtons[0].style.display = 'flex'
  }

  return (
    <div
      className="downloadButtons"
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        paddingTop: '1rem',
      }}
    >
      <CButton
        style={{
          padding: '0.5rem 2rem',
        }}
        onClick={() => DownloadFile('print')}
        color="primary"
      >
        Печать
      </CButton>
      <CButton
        style={{
          padding: '0.5rem 2rem',
        }}
        onClick={() => DownloadFile('download')}
        color="primary"
      >
        Скачать
      </CButton>
    </div>
  )
}

export default React.memo(PrintDownloadButtons)
