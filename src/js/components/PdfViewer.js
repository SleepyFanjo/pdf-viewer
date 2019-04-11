import React from 'react'
import { Document, Page } from 'react-pdf'
import classnames from 'classnames'

import WindowSize from './WindowSize'
import { usePdf } from 'js/hooks/usePdf'

const PdfViewer = ({fileRessource}) => {
  const {
    totalPages,
    currentPage,
    onDocumentLoadSuccess,
    loading,
    displayToolbar
  } = usePdf({})
  const controlsClasses = classnames("PDF__controls", displayToolbar ? null : "hidden")

  return (
    <WindowSize>
      {
        ({height}) => (
          <>
          <Document
            file={fileRessource}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={null}
            className="PDF__document"
          >
            <Page
              pageNumber={currentPage}
              loading={null}
              className="PDF__page"
              height={height - (displayToolbar ? 50 : 0)}
            />
          </Document>
          {
            loading
            ? <div className="PDF__loading" />
            : <div className={controlsClasses}>
              Page { currentPage } / { totalPages }
            </div>
          }
          </>
        )
      }
    </WindowSize>
  )
}

export default PdfViewer
