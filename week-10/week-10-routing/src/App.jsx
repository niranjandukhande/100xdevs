
import { BrowserRouter,Routes,Route,Link,useNavigate, Outlet } from "react-router-dom";


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/neet/online-coaching-class-11" element={<Class11Program />} />
            <Route path="/neet/online-coaching-class-12" element={<Class12Program />} />
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function Layout(){

  return <div style={{height : "100vh"}}>
      <Header/>
      <div style={{height : "90vh" }}>
        <Outlet/>
      </div>
      Footer
  </div>

}

function Header(){
  return <div>
    <Link to="/">Allen</Link>
      |
      <Link to="/neet/online-coaching-class-11">XI</Link>
      |
      <Link to="/neet/online-coaching-class-12">XII</Link>
  </div>
}

function ErrorPage(){
  return <div>
    Sorry, page not found.
  </div>
}

function Landing(){
  return <div>
    this is the Landing page
  </div>
}

function Class11Program(){
  return <div>
    Welcome to class 11
  </div>
}

function Class12Program(){
  const navigate = useNavigate();


  return <div>
    Welcome to class 12
  </div>
}

export default App
