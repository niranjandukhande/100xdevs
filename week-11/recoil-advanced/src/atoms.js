import {atomFamily} from "recoil";
import {TODOS}from "./todos"

//using atom family
export const todoAtomFamily = atomFamily({
    key: "todoAtom",
    default: id => {
        let foundTodo = null;
        for(let i = 0;i<TODOS.length;i++){
            if(TODOS[i].id === id){
                foundTodo = TODOS[i]
            }
        }
        return foundTodo
    },
});

//atom family is used to create multiple atoms, so use selectorFamily

//using selector family (for fetching from backend)
// export const todosAtomFamil = atomFamily({
//     key: "todosAtomFamily",
//     default: selectorFamily({
//         key: "todoSelectorFamily",
//         get: (id) => async ({get}) => {
//             const res = await axios.get('https://sum-server.100xdevs.com/todo?id=${id}');
//             return res.data.todo;
//         },
//     })
// });