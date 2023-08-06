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
      creationDate
    }
  }`;

const querySignIn = `query ($password: String!, $email: String!) {
    signIn(password: $password, email: $email)
  }`;

const updateQuery = `
mutation UpdateUser($username: String, $email: String) {
    updateUser(username: $username, email: $email) {
      username
      email
    }
  }
`;

const updatePictureQuery = `mutation UpdatePicture($picture: String) {
  updatePicture(picture: $picture) {
    picture 
  }
}`;

const deleteQuery = `mutation Mutation {
  deleteUser
}`;

const queryFriends = `query{
  getFriends {
    id
    username
    firstname
    lastname
    email
    picture
    points
  }
}`;

const deleteFriend = `mutation Mutation($input: NewFriendInput!) {
  deleteFriend(input: $input) {
    id
  }
}`;

const queryUsers = `query GetUsers {
  getUsers {
    id
    username
    picture
    email
  }
}`;

const addfriendQuery = `mutation Mutation($input: NewFriendInput!) {
  newFriend(input: $input) {
    id
  }
}`;

module.exports = {
  queryProfile,
  querySignIn,
  updateQuery,
  deleteQuery,
  updatePictureQuery,
  queryFriends,
  deleteFriend,
  queryUsers,
  addfriendQuery,
};
