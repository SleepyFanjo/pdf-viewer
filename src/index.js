import React from 'react'
import ReactDOM from 'react-dom'
import 'sass/index.scss'
import App from 'js/App'
import * as serviceWorker from './serviceWorker'
import { pdfjs } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`


ReactDOM.render(<App />, document.getElementById('react-app'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
