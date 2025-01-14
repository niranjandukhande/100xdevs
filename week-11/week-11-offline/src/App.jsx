import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil"
import { notifications, totolNotificationSelector } from "./store/atoms"

function App() {


  return (
    <>
      <RecoilRoot>
        <MainApp/>
      </RecoilRoot>
    </>

  )
}

function MainApp(){
  const [networkCount, setNetworkCount ] = useRecoilState(notifications)
  const totalNotificationCount = useRecoilValue(totolNotificationSelector)

  useEffect(()=>{
    
  },[])
  
  return (
  <>
  <button>Home</button>
  <button>My network ({networkCount.network})</button>
  <button>Jobs ({networkCount.jobs})</button>
  <button>Messaging ({networkCount.messaging})</button>
  <button>Notifications ({networkCount.notifications})</button>
  <button>Me ({totalNotificationCount})</button>
  </>
  )
}
export default App
