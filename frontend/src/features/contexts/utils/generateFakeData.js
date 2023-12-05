const { faker } = require("@faker-js/faker");
const axios = require("axios");

// Generate Fake Users
async function generateAndAddFakeUser() {
  const NUM_USERS = 20;
  const FIXED_PASSWORD = "FakeHuman76@";

  for (let i = 0; i < NUM_USERS; i++) {
    const user = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
      password: FIXED_PASSWORD,
      username: faker.internet.userName(),
    };

    try {
      const { firstname, lastname, email, password, username } = user;

      const response = await axios.post("http://localhost:5000", {
        query: `
        mutation SignUp($password: String!, $email: String!, $username: String!, $lastname: String!, $firstname: String!) {
          signUp(password: $password, email: $email, username: $username, lastname: $lastname, firstname: $firstname) {
            firstname
            email
            lastname
            password
            username
          }
        }
      `,
        variables: {
          firstname,
          lastname,
          password,
          email,
          username,
        },
      });
      console.log(`✅  🧑  ${firstname} added`);
    } catch (error) {
      console.error(`🚫 Error adding user`, error);
    }
  }
}

// Generate Creators Users
async function generateAndAddCreator() {
  const FIXED_PASSWORD = "Human76@";
  const creators = [
    {
      firstname: "Madeline",
      lastname: "Thomas",
      email: "madeline@test.com",
      password: FIXED_PASSWORD,
      username: "Madeline",
    },
    {
      firstname: "Morgan",
      lastname: "Mezaache",
      email: "morgan@test.com",
      password: FIXED_PASSWORD,
      username: "Morgan",
    },
    {
      firstname: "Jonathan",
      lastname: "Caillon",
      email: "jonathan@test.com",
      password: FIXED_PASSWORD,
      username: "Jonathan",
    },
    {
      firstname: "Carl",
      lastname: "Marion",
      email: "carlo@test.com",
      password: FIXED_PASSWORD,
      username: "Carl",
    },
    {
      firstname: "Marion",
      lastname: "Lalonde",
      email: "marion@test.com",
      password: FIXED_PASSWORD,
      username: "Marion",
    },
  ];

  try {
    await Promise.all(
      creators.map(async (creator) => {
        const { firstname, lastname, email, password, username } = creator;
        const response = await axios.post("http://localhost:5000", {
          query: `
          mutation SignUp($password: String!, $email: String!, $username: String!, $lastname: String!, $firstname: String!) {
            signUp(password: $password, email: $email, username: $username, lastname: $lastname, firstname: $firstname) {
              firstname
              email
              lastname
              password
              username
            }
          }
        `,
          variables: {
            firstname,
            lastname,
            password,
            email,
            username,
          },
        });
        console.log(`✅  🦹  ${firstname} added`);
      })
    );
  } catch (error) {
    console.error(`🚫 Error adding creator`);
  }
}

// Generate Tags
async function generateAndAddFakeTag() {
  const tags = [
    "consommation",
    "recyclage",
    "transport",
    "local",
    "alimentation",
    "énergie",
    "quotidien",
    "océans",
    "forêts",
    "agriculture",
    "mode de vie",
    "éducation",
  ];

  try {
    await Promise.all(
      tags.map(async (tag) => {
        const response = await axios.post("http://localhost:5000", {
          query: `
          mutation CreateTag($label: String!) {
            createTag(label: $label) {
              label
            }
          }
      `,
          variables: {
            label: tag,
          },
        });
        console.log(`✅  🏷️  ${tag} added`);
      })
    );
  } catch (error) {
    console.error(`🚫 Error adding tag`, error);
  }
}

//Generate Eco Actions
async function generateAndAddFakeEcoAction() {
  const tasks = [
    {
      id: 1,
      label: "Ramasser déchets locaux",
      difficulty: 2,
      points: 10,
      need_proof: false,
    },
    {
      id: 2,
      label: "Planter arbres urbains",
      difficulty: 4,
      points: 80,
      need_proof: false,
    },
    {
      id: 3,
      label: "Composter déchets",
      difficulty: 2,
      points: 40,
      need_proof: false,
    },
    {
      id: 4,
      label: "Éteindre lumières",
      difficulty: 1,
      points: 20,
      need_proof: false,
    },
    {
      id: 5,
      label: "Acheter vrac et local",
      difficulty: 3,
      points: 60,
      need_proof: false,
    },
    {
      id: 6,
      label: "Utiliser transport partagé",
      difficulty: 3,
      points: 60,
      need_proof: false,
    },
    {
      id: 7,
      label: "Réduire plastique",
      difficulty: 2,
      points: 40,
      need_proof: false,
    },
    {
      id: 8,
      label: "Soutenir fermes bio",
      difficulty: 4,
      points: 80,
      need_proof: false,
    },
    {
      id: 9,
      label: "Économiser l'eau",
      difficulty: 3,
      points: 60,
      need_proof: false,
    },
    {
      id: 10,
      label: "Recycler électronique",
      difficulty: 5,
      points: 100,
      need_proof: false,
    },
  ];

  try {
    await Promise.all(
      tasks.map(async (task) => {
        const { need_proof, points, label, difficulty } = task;
        const response = await axios.post("http://localhost:5000", {
          query: `
          mutation CreateEcoAction($needProof: Boolean!, $difficulty: Float!, $points: Float!, $label: String!) {
            createEcoAction(need_proof: $needProof, difficulty: $difficulty, points: $points, label: $label) {
              label
              difficulty
              points
            }
          }
      `,
          variables: {
            needProof: need_proof,
            points,
            label,
            difficulty,
          },
        });
        console.log(`✅  ⛳️ ${label} added`);
      })
    );
  } catch (error) {
    console.error(`🚫 Error adding eco action`, error);
  }
}

// Generate Challenge
async function generateAndAddFakeChallenge() {
  const CHALL_NUMBERS = 10;

  function generateChallenge() {
    const title = faker.lorem.sentence(5);
    const description = faker.lorem.paragraph(2);
    const isPublic = faker.datatype.boolean({ probability: 0.5 });
    const startAt = faker.date.past();
    const endAt = faker.date.future();

    const contenders = Array.from(
      { length: faker.number.float({ min: 0, max: 10, precision: 1 }) },
      () => faker.number.float({ min: 1, max: 25, precision: 1 })
    );

    const tags = Array.from(
      { length: faker.number.float({ min: 0, max: 3, precision: 1 }) },
      () => faker.number.float({ min: 1, max: 12, precision: 1 })
    );

    const ecoActions = Array.from(
      { length: faker.number.float({ min: 0, max: 3, precision: 1 }) },
      () => faker.number.float({ min: 1, max: 10, precision: 1 })
    );

    return {
      title,
      description,
      isPublic,
      startAt,
      endAt,
      contenders,
      tags,
      ecoActions,
    };
  }

  for (let i = 0; i < CHALL_NUMBERS; i++) {
    const challenge = generateChallenge();

    try {
      const response = await axios.post("http://localhost:5000", {
        query: `
        mutation Mutation($contenders: [Int!]!, $tags: [Int!]!, $ecoActions: [Int!]!, $isPublic: Boolean!, $endAt: String!, $startAt: String!, $description: String!, $title: String!) {
          createChallenge(contenders: $contenders, tags: $tags, ecoActions: $ecoActions, isPublic: $isPublic, endAt: $endAt, startAt: $startAt, description: $description, title: $title) {
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
        }
      `,
        variables: challenge,
      });
      console.log(`✅  🎯 ${challenge.title} added`);
    } catch (error) {
      console.error(`🚫 Error adding challenge`, error);
    }
  }
}

// Generation ordered
async function generation() {
  await generateAndAddCreator();
  await generateAndAddFakeUser();
  await generateAndAddFakeTag();
  await generateAndAddFakeEcoAction();
  // await generateAndAddFakeChallenge(); todo fix sender user
  await console.log(
    `\n\nGeneration is done ! \n\n you can check it here : http://localhost:5000 😊\n\n`
  );
}

generation();
