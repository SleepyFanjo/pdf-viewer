import React, { useContext } from 'react'
import { Document, Page } from 'react-pdf'
import classnames from 'classnames'

import WindowSize from './WindowSize'
import Controls from './Controls'
import { usePdf } from 'js/hooks/usePdf'
import { useWs } from 'js/hooks/useWs'
import { DocumentContext, IMAGE_TYPE } from 'js/data/document-context'

const PdfViewer = () => {
  const { fileRessource, fileType } = useContext(DocumentContext)
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
    goToPage,
    toggleAutorotate,
    autorotateDelay,
    increaseAutorotateDelay,
    decreaseAutorotateDelay
  } = usePdf({ fileRessource: fileRessource })

  const { uuid, connectedToApi } = useWs({
    goNextPage,
    goPreviousPage,
    goFirstPage,
    goLastPage,
    goToPage,
    toggleAutorotate,
    increaseAutorotateDelay,
    decreaseAutorotateDelay
  })

  const controlsClasses = classnames(
    'PDF__controls',
    displayToolbar ? null : 'hidden'
  )

  const pageClasses = classnames('PDF__page', displayToolbar ? 'smaller' : null)

  return (
    <WindowSize>
      {({ height }) => (
        <>
          {fileType === IMAGE_TYPE ? (
            <div
              className="PDF__image--wrapper"
              style={{ height: height - (displayToolbar ? 60 : 0) }}
            >
              <img alt="" src={fileRessource} className="PDF__image" />
            </div>
          ) : (
            <Document
              file={fileRessource}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={null}
              className="PDF__document"
            >
              <Page
                pageNumber={currentPage}
                loading={null}
                className={pageClasses}
              />
            </Document>
          )}
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
                uuid={uuid}
                connectedToApi={connectedToApi}
              />
            </div>
          )}
        </>
      )}
    </WindowSize>
  )
}

export default PdfViewer
