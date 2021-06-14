import ReactDOM from 'react-dom'
import { ConfigProvider } from 'r3f-config'

import App from './components/App'
import './styles.css'

ReactDOM.render(
  <ConfigProvider open>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
)
