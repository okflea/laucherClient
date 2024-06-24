import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

const qc = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      {/* <main className=' bg-slate-50'> */}
      <App />
      {/* </main> */}
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>,
)
