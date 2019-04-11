import React, { Component } from 'react'
import PdfViewer from 'js/components/PdfViewer'

class App extends Component {
  render() {
    return (
      <PdfViewer fileRessource="/BlackHoles.pdf" />
    )
  }
}

export default App
