interface User {
    id: string;
    name: string;
    age: number;
    email: string;
    password: string;
}

//pick generic from the User Interface
type UpdateProps = Pick <User,'name'|'age'|'email'>

//this marks all of the keys as optional
type UpdatePropsOptional = Partial<UpdateProps>

function updateUser(updatedProps: UpdateProps){
    //hit the database to update the user
}

// const a = [1,2,3];
// a[0] = 2;
// the above is allowed in ts, even though it is defined as constant, use readonly

type User1 = {
    readonly name: string;
    readonly age: number;
}

const user1: User1 = {
    name: "prog",
    age: 22
}

// user1.age = 21
// the above will now give an error because we made is readonly
// useful for making apikey and endpoints readonly so devs cant change it by mistake


//objects in ts
type UsersAge = {
    [key: string]: number;
}

const users:UsersAge = {
    "1":22,
    "2":22,
}


//records and maps
//instead of objects, make use of records
type Users = Record<string,number>;

const users1:UsersAge = {
    "1":22,
    "2":22,
}

// now to use the above object, we can do users1["1"].age, but using maps is better
// basically to make key-value pairs
// this is a js concept
const users2 = new Map()
users2.set("safasfsafas",{name: "sfas",age: 20});
users2.set("sadfasf",{name: "asdfas",age:33});

// to get back the value from a map 
const user = users2.get("sadfasf");

// another example for map

type Grahak = {
    name: string;
    age: number;
    email: string;
}

const grahakLog = new Map<string,Grahak>()
grahakLog.set("qwerty",{name:"qqqq",age: 22,email:"wwww"});

// exclude

type EventType = 'click' | 'scroll' | 'mousemove';
type ExcludeEvent = Exclude<EventType,'scroll'>; // 'click' | 'mousemove'

const handleEvent = (event: ExcludeEvent) => {
    console.log(`Handling event: ${event}`);
}

handleEvent('click'); // OK