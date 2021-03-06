import React, { useContext } from 'react'
import classnames from 'classnames'

import { DocumentContext } from 'js/data/document-context'
import Loader from './Loader'

const Controls = ({
  currentPage,
  totalPages,
  goFirstPage,
  goPreviousPage,
  goNextPage,
  goLastPage,
  toggleAutorotate,
  isAutorotate,
  autorotateDelay,
  increaseAutorotateDelay,
  decreaseAutorotateDelay,
  connectedToApi,
  uuid
}) => {
  const autorotateClasses = classnames(
    'material-icons icon-button autorotate',
    isAutorotate ? 'active' : 'inactive'
  )

  const { updateFileEvent, loading } = useContext(DocumentContext)

  return (
    <div className="Controls">
      <div className="Controls__pageSettings">
        <i className="material-icons icon-button" onClick={goFirstPage}>
          first_page
        </i>
        <i className="material-icons icon-button" onClick={goPreviousPage}>
          chevron_left
        </i>
        <span>
          {currentPage} / {totalPages}
        </span>
        <i className="material-icons icon-button" onClick={goNextPage}>
          chevron_right
        </i>
        <i className="material-icons icon-button" onClick={goLastPage}>
          last_page
        </i>
      </div>
      <div className="Controls__autorotate">
        <div className="label">{autorotateDelay / 1000 + 's'}</div>
        <i
          className="material-icons icon-button"
          onClick={decreaseAutorotateDelay}
        >
          remove
        </i>
        <i
          className={autorotateClasses}
          onClick={toggleAutorotate}
          style={{ animationDuration: autorotateDelay / 1000 + 's' }}
        >
          timelapse
        </i>
        <i
          className="material-icons icon-button"
          onClick={increaseAutorotateDelay}
        >
          add
        </i>
      </div>
      <div className="Controls__fileupload">
        {loading ? (
          <Loader />
        ) : (
          <>
            <input
              id="file"
              type="file"
              onChange={updateFileEvent}
              name="file"
              className="file_input"
            />
            <label htmlFor="file" className="file_label">
              <i className="material-icons">backup</i>
            </label>
          </>
        )}
      </div>
      {connectedToApi ? (
        <div className="Controls__uuid">
          <span className="icon-button">{uuid}</span>
        </div>
      ) : null}
    </div>
  )
}

export default Controls
