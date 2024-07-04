import React, { PureComponent, Suspense, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { Menu, Radio, Skeleton, onColorChange } from '@jd/jdesign-react'
import { themeManager } from '@drip/dw-ui'
import Home from './pages/home'
import components from './pages'
import ErrorFallback from './ErrorFallback'

import '@drip/drip-design/dist/drip-design.min.css'
import '@jd/jdesign-react/dist/jdr.min.css'
import './App.css'

function App() {
  const theme = localStorage.getItem('theme') ?? 'jdesign'
  const color = localStorage.getItem('color') ?? 'default'
  const [updateSeeds, setUpdateSeeds] = useState(0)
  themeManager.setTheme(theme)
  const location = useLocation()
  const items = [
    {
      key: '/',
      label: <Link to="/">Home</Link>
    }
  ]
  Array.prototype.push.apply(
    items,
    components.map((i) => {
      return {
        key: i.link,
        label: <Link to={i.link}>{i.name}</Link>
      }
    })
  )

  return (
    <div className="App">
      <nav className="left">
        <Menu selectedKeys={[location.pathname]} items={items} />
      </nav>
      <section className="main">
        <div className="header">
          {themeManager.getTheme() === 'jdesign' && (
            <Radio.Group
              options={[
                { label: 'light', value: 'default' },
                { label: 'dark', value: 'dark' },
                { label: 'jdm', value: 'jdm' },
                { label: 'red', value: 'red' }
              ]}
              onChange={(e) => {
                onColorChange(e.target.value)
                localStorage.setItem('color', e.target.value)
              }}
              defaultValue={color}
              optionType="button"
              buttonStyle="solid"
            />
          )}
          <Radio.Group
            options={[
              { label: 'J-DESIGN', value: 'jdesign' },
              { label: 'DRIP-DESIGN', value: 'default' }
            ]}
            onChange={(e) => {
              localStorage.setItem('theme', e.target.value)
              setUpdateSeeds(Math.random())
            }}
            defaultValue={themeManager.getTheme()}
            optionType="button"
            buttonStyle="solid"
          />
        </div>
        <div key={updateSeeds} className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            {components.map((i) => {
              const Comp = React.lazy(i.dynamicComp)
              return (
                <Route
                  key={i.k}
                  path={i.link}
                  element={
                    <Suspense fallback={<Skeleton active />}>
                      <ErrorBoundary
                        key={i.k}
                        FallbackComponent={ErrorFallback}>
                        <Comp key={updateSeeds} />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
              )
            })}
          </Routes>
        </div>
      </section>
    </div>
  )
}

class Main extends PureComponent {
  render() {
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Router>
          <App />
        </Router>
      </ErrorBoundary>
    )
  }
}

export default Main
