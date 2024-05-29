export const logIn = async (email, password, isMerchant) => {
  
    const response = await fetch(`http://localhost:3000/api/user/login`,{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({email, password, isMerchant}),
    })
    .then(resp => resp.json())
    .catch(() => {
      return null
    })

    return response;
}

export const register = async (data) => {

  const response = await fetch("http://localhost:3000/api/user/register",{
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => { 
      return response.json()
  } )
  .catch(() => {
    return null;
  })

  return response;
}

export const subscribe = async (userID) => {

  const response = await fetch(
    `http://localhost:3000/api/user/subscribe`,
    {
      method:'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID
      })
    }
  )
  .catch(() => {
    return null;
  })

  const body = await response.json()

  return {
    success: response.ok,
    ...body
  };
}

export const clearCart = async (userID) => {
  await fetch(
    `http://localhost:3000/api/user/clearCart`, 
    {
      method:'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID
      })
    }
  )
}