import { useState, useEffect } from 'react'
import './App.css'

interface Data {
  message: string;
  timestamp: string;
  authToken?: string;
  metaToken?: string;
}

function App() {
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [metaToken, setMetaToken] = useState<string | null>(null)
  const [data, setData] = useState<Data | null>(null)
  const [requests, setRequests] = useState<Array<string>>([])
  const [url, setUrl] = useState<string>('http://localhost:3000/api/data');



  useEffect(() => {

    function handleData(responseData: Data) {
      if (responseData && responseData.authToken) {
        setAuthToken(responseData.authToken)
        setUrl('http://localhost:3000/api/data')
      } else if (responseData && responseData.metaToken) {
        setMetaToken(responseData.metaToken)
      } else {
        setData(responseData)
      }
    }

    function handleResponse(response: Response) {
      if (response.ok) {
        setUrl(response.url)
        response.json().then(handleData).catch(err => console.error('Error parsing response:', err))
      }
    }

    setRequests(prev => [...prev, url]);

    let headers: Record<string, string> = {}

    if (authToken) {
      headers["Authorization"] = authToken
    }

    if (metaToken) {
      headers["Meta-Token"] = metaToken
    }

    fetch(url, {
      method: 'GET',
      headers: headers
    })
      .then(res => handleResponse(res))
      .catch(err => console.error('Error fetching data:', err))
  }, [url, authToken, metaToken])

  return (
    <>
      <h1>Frontend + Backend Demo</h1>
      <div className="card">
        {data ? (
          <div>
            <p><strong>Message:</strong> {data.message}</p>
            <p><strong>Timestamp:</strong> {data.timestamp}</p>
            <p><strong>Auth Token:</strong> {authToken}</p>
            <p><strong>Meta Token:</strong> {metaToken}</p>
            <p><strong>Requests:</strong> {requests.length}</p>
          </div>
        ) : (
          <p>Loading data from backend...</p>
        )}
      </div>
    </>
  )
}

export default App
