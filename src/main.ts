import './ui/styles.css'
import { initApp } from './app'

// Request persistent storage on first launch
if (navigator.storage?.persist) {
  navigator.storage.persist().catch(() => { /* non-critical */ })
}

initApp()
