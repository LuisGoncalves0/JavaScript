const letter = {
  get: async function getUsersAndPosts() {
    const [usersResponse, postsResponse] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users"),
      fetch("https://jsonplaceholder.typicode.com/posts"),
    ]);
    const users = await usersResponse.json();
    const posts = await postsResponse.json();
    return [users, posts];
  },
};

const list = (containerId) => {
  const containerUsers = document.getElementsByClassName(containerId)[0];

  if (!containerUsers) {
    return;
  }

  letter
    .get()
    .then(([usersData, postsData]) => {
      usersData; // fetched users
      postsData; // fetched posts

      if (postsData.length === 0 || usersData.length === 0) {
        throw Error("Something went wrong with your fetch!");
      }

      const data = usersData?.map((user) => {
        const newUser = {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          address: `${user.address.street}, ${user.address.suite} - ${user.address.zipcode} ${user.address.city}`,
          phone: user.phone,
          website: user.website,
          company: user.company.name,
        };

        const posts = postsData?.find((post) => post?.userId === user?.id);
        return { ...newUser, posts };
      });

      data.forEach((item) => {
        if (Object.keys(item).length === 0) {
          throw Error("Something went wrong with your Data!");
        }

        // Id
        let id = document.createElement("p");
        let idText = document.createTextNode(`ID: ${item.id}`);
        id.appendChild(idText);
        containerUsers.appendChild(id);
        // Id

        // Name
        let name = document.createElement("p");
        let nameText = document.createTextNode(`Name: ${item.name}`);
        name.appendChild(nameText);
        containerUsers.appendChild(name);
        // Name

        // Username
        let username = document.createElement("p");
        let usernameText = document.createTextNode(
          `Username: ${item.username}`
        );
        username.appendChild(usernameText);
        containerUsers.appendChild(username);
        // Username

        // Email
        let email = document.createElement("p");
        let emailText = document.createTextNode(`Email: ${item.email}`);
        email.appendChild(emailText);
        containerUsers.appendChild(email);
        // Email

        // Address
        let address = document.createElement("p");
        let addressText = document.createTextNode(`Address: ${item.address}`);
        address.appendChild(addressText);
        containerUsers.appendChild(address);
        // Address

        // Phone
        let phone = document.createElement("p");
        let phoneText = document.createTextNode(`Phone: ${item.phone}`);
        phone.appendChild(phoneText);
        containerUsers.appendChild(phone);
        // Phone

        // Website
        let website = document.createElement("p");
        let websiteText = document.createTextNode(`Website: ${item.website}`);
        website.appendChild(websiteText);
        containerUsers.appendChild(website);
        // Website

        // Company
        let company = document.createElement("p");
        let companyText = document.createTextNode(`Company: ${item.company}`);
        company.appendChild(companyText);
        containerUsers.appendChild(company);
        // Company

        // Post Title
        let title = document.createElement("p");
        let titleText = document.createTextNode(`Title: ${item.posts.title}`);
        title.appendChild(titleText);
        containerUsers.appendChild(title);
        // Post Title

        // Post body
        let body = document.createElement("p");
        let bodyText = document.createTextNode(`Body: ${item.posts.body}`);
        let hr = document.createElement("hr");
        body.appendChild(bodyText);
        containerUsers.appendChild(body);
        containerUsers.appendChild(hr);
        // Post body
      });
    })
    .catch((e) => {
      let error = document.createElement("p");
      let errorText = document.createTextNode(`Error: ${e.message}`);
      error.appendChild(errorText);
      containerUsers.appendChild(error);
    });
};
