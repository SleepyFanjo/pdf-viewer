import React, { Component } from 'react'
import PdfViewer from 'js/components/PdfViewer'
import DocumentContext from 'js/data/document-context'
import { uploadFileToConverter } from 'js/data/file-uploader'

const PDF_TYPE = 'application/pdf'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fileRessource: '/BlackHoles.pdf',
      loading: false
    }
  }

  updateFile = e => {
    const file = e.target.files && e.target.files[0]
    if (!file) {
      return
    }

    if (file.type === PDF_TYPE) {
      this.setState({
        fileRessource: file
      })
    } else {
      this.setState({ loading: true })
      uploadFileToConverter(file).then(file => {
        this.setState({
          fileRessource: file,
          loading: false
        })
      })
    }
  }

  render() {
    return (
      <DocumentContext.Provider
        value={{
          ...this.state,
          updateFile: this.updateFile
        }}
      >
        <PdfViewer />
      </DocumentContext.Provider>
    )
  }
}

export default App
