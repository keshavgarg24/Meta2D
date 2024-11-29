const axios = require("axios");

describe("Authentication", () => {
  test('User is able to sign up only once', async () => {
      const username = "keshav" + Math.random(); 
      const password = "12345678";
      const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
          username,
          password,
          type: "admin"
      })

      expect(response.status).toBe(200)
      const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
          username,
          password,
          type: "admin"
      })

      expect(updatedResponse.status).toBe(400);
  });
  test('Signup request fails if the username is empty', async () => {
    const username = `keshav-${Math.random()}` 
    const password = "12345678"

    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        password
    })

    expect(response.status).toBe(400)
})

test('Signin succeeds if the username and password are correct', async() => {
    const username = `keshav-${Math.random()}`
    const password = "12345678"

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
        type: "admin"
    });
    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password
  });

  expect(response.status).toBe(200)
  expect(response.data.token).toBeDefined()
  
})

test('Signin fails if the username and password are incorrect', async() => {
  const username = `keshav-${Math.random()}`
  const password = "12345678"

  await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      role: "admin"
  });

  const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: "WrongUsername",
      password
  })
  expect(response.status).toBe(403)
});

test('Signup fails if the passowrd is very short', async() =>{
  const username = `keshav-${Math.random()}`
  const password = "12345678"

  const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
    username,
    password,
    type : "admin"
  }).catch(err => err.response)

  expect(response.status).toBe(400)
  expect(response.data.message).toBe("Password should be atleast 8 characters long")
});

test('Signup fails if the password does not contain a special character', async() => {
  const username = `keshav-${Math.random()}`
  const password = "12345678"

  const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
    username,
    password,
    type: "admin"
  }).catch(err => err.response)

  expect(response.status).toBe(400)
  expect(response.data.message).toBe("Password should contain atleast one special character")
});
})

describe("User Metadata Endpoints", () => {
  beforeALL(async () => {
    // Signin/Signup before you can update the metadata
    const username = `keshav-${Math.random()}`
    const password = "12345678"

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
        type: "admin"
    }); 

    const response = axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password
    })

    token = response.data.token
  })
})

