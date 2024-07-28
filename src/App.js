import React, { Component } from 'react'
import { Routes, Route, HashRouter } from "react-router-dom";

import NxtWatchContext from './contexts/NxtWatchContext'

import Login from './Pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './Pages/Home'
import Trending from './Pages/Trending'
import Gaming from './Pages/Gaming'
// import SavedVideos from './Pages/SavedVideos'
import NxtVideoDetial from './Pages/NxtVideoDetial'
import NotFound from './Pages/NotFound'
import Inprogress from './components/Inprogress';

class App extends Component {
  state = {dark: false, saveList: []}

  setDark = () => {
    this.setState(pre => ({dark: !pre.dark}))
  }

  setSaveList = video => {
    const {saveList} = this.state
    const isPresent = saveList.some(each => each.id === video.id)
    if (isPresent) {
      console.log('exist on save list')
      this.setState(pre => ({
        saveList: pre.saveList.filter(each => each.id !== video.id),
      }))
    } else {
      this.setState(pre => ({saveList: [...pre.saveList, video]}))
    }
  }



  render() {
    const {dark, saveList} = this.props
    return (
      <NxtWatchContext.Provider
        value={{
          dark,
          saveList,
          setDark: this.setDark,
          setSaveList: this.setSaveList,
        }}
      >
        <HashRouter>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route exact path='/' element={<Home />} />
              <Route exact path="/trending" element={<Trending />} />
              <Route exact path="/gaming" element={<Gaming />} />
              <Route exact path="/saved-videos" element={<Inprogress  />} />
              <Route exact path="/videos/:id" element={<NxtVideoDetial />} />
            </Route>
            <Route element={<NotFound />} />
          </Routes>
        </HashRouter>
      </NxtWatchContext.Provider>
    )
  }
}

export default App