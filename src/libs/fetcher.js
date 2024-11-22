const api = import.meta.env.VITE_API;

export async function postUser(data) {
  const res = await fetch(`${api}/users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error("Error: Check Network Log");
}

export async function postLogin(username, password) {
  const res = await fetch(`${api}/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error("Incorrect username or password");
}

export async function fetchUser(id){
  const token = getToken();
  const res = await fetch(`${api}/users/${id}`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  return res.json();
}

const getToken=()=>{
  return localStorage.getItem("token");
}
