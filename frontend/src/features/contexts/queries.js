const queryProfile = `query  {
    getProfile {
      email
      firstname
      lastname
      admin
      id
      username
      picture
      points
    }
  }`;
  

  const querySignIn =  `query ($password: String!, $email: String!) {
    signIn(password: $password, email: $email)
  }`

const updateQuery = `
mutation UpdateUser($username: String, $email: String) {
    updateUser(username: $username, email: $email) {
      username
      email
    }
  }
`

const updatePictureQuery = `mutation UpdatePicture($picture: String) {
  updatePicture(picture: $picture) {
    picture 
  }
}`

const deleteQuery = `mutation Mutation {
  deleteUser
}`



  module.exports = {
    queryProfile,
    querySignIn,
    updateQuery,
    deleteQuery,
    updatePictureQuery
  };