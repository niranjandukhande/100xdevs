import { todoAtomFamily } from "./atoms";
import {RecoilRoot,useRecoilValue} from "recoil";

function App() {

  return (
    <>
    <RecoilRoot>
      <Todo id={1}/>
      <Todo id={2}/>
    </RecoilRoot>
    </>
  )
}

function Todo({id}){
  const currentTodo = useRecoilValue(todoAtomFamily(id));
  return(
  <>
  {currentTodo.title}
  <br/>
  {currentTodo.description}
  <br/>
  </>
  )
}

export default App
