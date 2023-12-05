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

const signUpQuery = `mutation SignUp($password: String!, $email: String!, $username: String!, $lastname: String!, $firstname: String!) {
    signUp(password: $password, email: $email, username: $username, lastname: $lastname, firstname: $firstname) {
      firstname
      email
      lastname
      password
      username
    }
  }`;

const updateQuery = `
mutation UpdateUser($username: String, $email: String) {
    updateUser(username: $username, email: $email) {
      username
      email
    }
  }
`;

const updatePasswordQuery = `
mutation UpdatePassword($oldPassword: String!, $newPassword: String!, $confirmPassword: String!) {
updatePassword(oldPassword: $oldPassword, newPassword: $newPassword, confirmPassword: $confirmPassword) {
username
email
}
}`

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

const queryNotifications = `query UserNotifications {
  userNotifications {
    id
    status
    type
    sender {
      id
      firstname
    }
    isUnread
    send_date
  }
}`;

const mutationIsRead = `mutation UpdateNotificationStatus($updateNotificationStatusId: Int!, $isUnread: Boolean!, $status: Boolean) {
  updateNotificationStatus(id: $updateNotificationStatusId, isUnread: $isUnread, status: $status) {
    id
    isUnread
    status
  }
}`;

const updateChallengeInvitationNotification = `mutation UpdateChallengeInvitationStatus($updateChallengeInvitationStatusId: Int!, $isUnread: Boolean!, $status: Boolean) {
  updateChallengeInvitationStatus(id: $updateChallengeInvitationStatusId, isUnread: $isUnread, status: $status) {
    id
    isUnread
    status
  }
}`;

const sendNotifications = `mutation NewNotification($input: NotificationInput!) {
  newNotification(input: $input) {
    type
    receiver {
      id
    }
  }
}`;

const queryFriendList = `query UsersWithUnreadNotifications {
  usersWithUnreadNotifications {
    id
  }
}`;

const queryChallenges = `query GetAllChallenges {
  getAllChallenges {
    id
    creator {
      id
    }
    title
    description
    isPublic
    startAt
    endAt
    ecoActions {
      id
      label
      points
      need_proof
      difficulty
    }
    tags {
      id
      label
    }
    contenders {
      id
      username
    }
  }
}`;

const queryChallenge = `query GetChallengeById ($challengeId: Float!) { getChallengeById(challengeId: $challengeId) {id creator {id} title description isPublic startAt endAt ecoActions {id label points need_proof difficulty} tags {id label} contenders {id username picture}}}`;

const queryTasks = `query Query {
  getAllEcoActions {
    id
    label
    points
    need_proof
    difficulty
  }
}`;

const queryTags = `query Query {
  getAllTags {
    id
    label
  }
}`;

const queryEcoActionSelectionStatus = `query Query($challengeId: Float!) {
  getEcoActionSelectionStatus(challengeId: $challengeId) {
    ecoActionIsSelected
    ecoAction {
      id
      label
      difficulty
      points
    }
  }
}`;

const mutationCreateChallenge = `mutation Mutation($contenders: [Int!]!, $tags: [Int!]!, $ecoActions: [Int!]!, $isPublic: Boolean!, $endAt: String!, $startAt: String!, $description: String!, $title: String!) {
  createChallenge(contenders: $contenders, tags: $tags, ecoActions: $ecoActions, isPublic: $isPublic, endAt: $endAt, startAt: $startAt, description: $description, title: $title, progress:0) {
    title
    description
    isPublic
    endAt
    startAt
    ecoActions {
      id
    }
    contenders {
      id
    }
    tags {
      id
    }
  }
}`;

const mutationEcoActionSelectionStatus = `mutation Mutation($isSelected: Boolean!, $ecoActionId: Float!, $challengeId: Float!) {
  updateEcoActionStatus(isSelected: $isSelected, ecoActionId: $ecoActionId, challengeId: $challengeId)
}`;

const mutationMyChallengeProgress = `mutation Mutation($progress: Float!, $challengeId: Float!) {
  updateMyChallengeProgress(progress: $progress, challengeId: $challengeId)
}`;

const queryMyChallenges = `query Query {
  getMyChallenges {
    progress
    user {
      id
    }
    challenge {
      id
    }
  }
}`;

module.exports = {
  queryProfile,
  signUpQuery,
  querySignIn,
  updateQuery,
  updatePasswordQuery,
  deleteQuery,
  updatePictureQuery,
  queryFriends,
  deleteFriend,
  queryUsers,
  addfriendQuery,
  queryNotifications,
  mutationIsRead,
  sendNotifications,
  queryFriendList,
  queryChallenges,
  queryChallenge,
  queryTasks,
  queryTags,
  queryEcoActionSelectionStatus,
  mutationCreateChallenge,
  updateChallengeInvitationNotification,
  mutationEcoActionSelectionStatus,
  mutationMyChallengeProgress,
  queryMyChallenges,
};
