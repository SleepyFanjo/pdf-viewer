import React from 'react'
import classnames from 'classnames'

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
  decreaseAutorotateDelay
}) => {
  const autorotateClasses = classnames(
    'material-icons icon-button autorotate',
    isAutorotate ? 'active' : 'inactive'
  )

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
          class={autorotateClasses}
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
    </div>
  )
}

export default Controls
