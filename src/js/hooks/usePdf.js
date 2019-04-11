import React, { useState, useEffect } from 'react'
import { useInterval } from './useInterval'

const KEY_C = 'KeyC'
const KEY_R = 'KeyR'
const RIGHT = 'ArrowRight'
const LEFT = 'ArrowLeft'
const DOWN = 'ArrowDown'
const UP = 'ArrowUp'

export const usePdf = ({
  totalPages: initialTotalPages,
  currentPage: initialCurrentPage,
  autorotate
}) => {
  // Loading pdf state
  const [loading, setLoading] = useState(true)

  // Display toolbar or not
  const [displayToolbar, setDisplayToolbar] = useState(true)

  // PDF Maximum pages
  const [totalPages, setTotalPages] = useState(initialTotalPages || null)

  // PDF Current page
  const [currentPage, setCurrentPage] = useState(initialCurrentPage || 1)

  // Does page switch automatically or not
  const [isAutorotate, setIsAutorotate] = useState(autorotate || false)

  // How long in ms does the page stays up before switching
  const [autorotateDelay, setAutorotateDelay] = useState(3000)

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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages)
    setCurrentPage(1)
    setLoading(false)
  }

  const goNextPage = () => {
    setCurrentPage(currentPage =>
      currentPage + 1 > totalPages ? 1 : currentPage + 1
    )
  }

  const goPreviousPage = () => {
    setCurrentPage(currentPage =>
      currentPage - 1 > 0 ? currentPage - 1 : totalPages
    )
  }

  const goFirstPage = () => {
    setCurrentPage(1)
  }

  const goLastPage = () => {
    setCurrentPage(totalPages || 1)
  }

  const toggleAutorotate = () => {
    setIsAutorotate(isAutorotate => !isAutorotate)
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
    isAutorotate,
    toggleAutorotate,
    displayToolbar,
    autorotateDelay,
    increaseAutorotateDelay,
    decreaseAutorotateDelay
  }
}
