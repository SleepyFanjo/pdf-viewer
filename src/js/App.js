import React, { Component } from 'react'
import PdfViewer from 'js/components/PdfViewer'
import { DocumentContext, PDF_TYPE, IMAGE_TYPE } from 'js/data/document-context'
import { uploadFileToConverter } from 'js/data/file-uploader'

const isImage = type => type.split('/')[0] === 'image'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fileRessource: '/BlackHoles.pdf',
      fileType: PDF_TYPE,
      loading: false
    }
  }

  updateFile = file => {
    if (file.type === PDF_TYPE) {
      this.setState({
        fileRessource: file,
        fileType: file.type
      })
    } else if (isImage(file.type)) {
      const reader = new FileReader()
      this.setState({ loading: true })
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.setState({
          fileRessource: reader.result,
          fileType: IMAGE_TYPE,
          loading: false
        })
      }
    } else {
      uploadFileToConverter(file).then(file => {
        this.setState({
          fileRessource: file,
          fileType: PDF_TYPE,
          loading: false
        })
      })
    }
  }

  updateFileEvent = e => {
    const file = e.target.files && e.target.files[0]
    if (!file) {
      return
    }

    this.updateFile(file)
  }

  render() {
    return (
      <DocumentContext.Provider
        value={{
          ...this.state,
          updateFileEvent: this.updateFileEvent,
          updateFile: this.updateFile
        }}
      >
        <PdfViewer />
      </DocumentContext.Provider>
    )
  }
}

export default App
