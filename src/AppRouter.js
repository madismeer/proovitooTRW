import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import ArticleView from './Components/ArticleView/ArticleView'
import TableView from './Components/TableView/TableView'


export default function AppRouter(props) {

  return (
    <Router>
      <Routes>

        <Route exact path="/tabel" element={<TableView />} />

        <Route exact path="/" element={<ArticleView />} />

        <Route path="/article/:id" element={<ArticleView />} />

      </Routes>
    </Router>
  )
}


