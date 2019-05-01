import React, { useState, useEffect } from 'react'
import { useInterval } from './useInterval'

const KEY_C = 'KeyC'
const KEY_R = 'KeyR'
const RIGHT = 'ArrowRight'
const LEFT = 'ArrowLeft'
const DOWN = 'ArrowDown'
const UP = 'ArrowUp'

export const usePdf = ({ fileRessource }) => {
  /*
   * States
   */

  // Loading pdf state
  const [loading, setLoading] = useState(true)

  // Display toolbar or not
  const [displayToolbar, setDisplayToolbar] = useState(false)

  // PDF Maximum pages
  const [totalPages, setTotalPages] = useState(null)

  // PDF Current page
  const [currentPage, setCurrentPage] = useState(1)

  // Does page switch automatically or not
  const [isAutorotate, setIsAutorotate] = useState(true)

  // How long in ms does the page stays up before switching
  const [autorotateDelay, setAutorotateDelay] = useState(3000)
  /*
   * Effects
   */

  useEffect(() => {
    setCurrentPage(1)
    setTotalPages(null)
  }, [fileRessource])

  useEffect(() => {
    // handleKeyboard event for PDF
    const handleKeyboard = e => {
      switch (e.code) {
        case KEY_C:
          setDisplayToolbar(!displayToolbar)
          break
        case KEY_R:
          toggleAutorotate()
          break
        case RIGHT:
          goNextPage()
          break
        case LEFT:
          goPreviousPage()
          break
        case DOWN:
          goLastPage()
          break
        case UP:
          goFirstPage()
          break
        default:
          return
      }
    }

    window.addEventListener('keydown', handleKeyboard)

    return () => {
      window.removeEventListener('keydown', handleKeyboard)
    }
  }, [displayToolbar, totalPages])

  useInterval(
    () => {
      goNextPage()
    },
    isAutorotate ? autorotateDelay : null
  )

  // Functions to control the state

  const onDocumentLoadSuccess = all => {
    setTotalPages(all.numPages)
    setCurrentPage(1)
    setLoading(false)
  }

  const goNextPage = () => {
    setCurrentPage(curr => (curr + 1 > totalPages ? 1 : curr + 1))
  }

  const goPreviousPage = () => {
    setCurrentPage(currentPage =>
      currentPage - 1 > 0 ? currentPage - 1 : totalPages
    )
  }

  const goFirstPage = () => {
    setCurrentPage(1)
  }

  const goToPage = page => {
    if (page > 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const goLastPage = () => {
    setCurrentPage(totalPages || 1)
  }

  const toggleAutorotate = autorotate => {
    setIsAutorotate(isAutorotate =>
      autorotate !== undefined ? autorotate : !isAutorotate
    )
  }

  const increaseAutorotateDelay = () => {
    setAutorotateDelay(delay => delay + 1000)
  }

  const decreaseAutorotateDelay = () => {
    setAutorotateDelay(delay => Math.max(1000, delay - 1000))
  }

  return {
    totalPages,
    currentPage,
    loading,
    onDocumentLoadSuccess,
    goNextPage,
    goPreviousPage,
    goFirstPage,
    goLastPage,
    goToPage,
    isAutorotate,
    toggleAutorotate,
    displayToolbar,
    autorotateDelay,
    increaseAutorotateDelay,
    decreaseAutorotateDelay
  }
}
