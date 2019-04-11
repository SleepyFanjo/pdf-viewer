import React from 'react'
import { Document, Page } from 'react-pdf'
import classnames from 'classnames'

import WindowSize from './WindowSize'
import Controls from './Controls'
import { usePdf } from 'js/hooks/usePdf'

const PdfViewer = ({ fileRessource }) => {
  const {
    totalPages,
    currentPage,
    isAutorotate,
    loading,
    displayToolbar,
    onDocumentLoadSuccess,
    goNextPage,
    goPreviousPage,
    goFirstPage,
    goLastPage,
    toggleAutorotate,
    autorotateDelay,
    increaseAutorotateDelay,
    decreaseAutorotateDelay
  } = usePdf({})
  const controlsClasses = classnames(
    'PDF__controls',
    displayToolbar ? null : 'hidden'
  )

  return (
    <WindowSize>
      {({ height }) => (
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
          {loading ? (
            <div className="PDF__loading" />
          ) : (
            <div className={controlsClasses}>
              <Controls
                goNextPage={goNextPage}
                goPreviousPage={goPreviousPage}
                goFirstPage={goFirstPage}
                goLastPage={goLastPage}
                totalPages={totalPages}
                currentPage={currentPage}
                toggleAutorotate={toggleAutorotate}
                isAutorotate={isAutorotate}
                autorotateDelay={autorotateDelay}
                increaseAutorotateDelay={increaseAutorotateDelay}
                decreaseAutorotateDelay={decreaseAutorotateDelay}
              />
            </div>
          )}
        </>
      )}
    </WindowSize>
  )
}

export default PdfViewer
