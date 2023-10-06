class Client {
  constructor({ auth }) {
    this.baseUrl = "https://api.notion.com/v1";
    this.headers = {
      Authorization: `Bearer ${auth}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    };

    this.pages = {
      retrieve: async ({ page_id }) => {
        return fetch(`${this.baseUrl}/pages/${page_id}`, {
          headers: this.headers,
        }).then((response) => response.json());
      },
    };
    this.blocks = {
      children: {
        list: async ({ block_id }) => {
          return fetch(`${this.baseUrl}/blocks/${block_id}/children`, {
            headers: this.headers,
          }).then((response) => response.json());
        },
      },
    };
    this.databases = {
      query: async ({ database_id, filter, sorts, start_cursor }) => {
        const postBody = {
          filter,
          sorts,
          start_cursor,
        };
        return fetch(`${this.baseUrl}/databases/${database_id}/query`, {
          headers: this.headers,
          method: "POST",
          body: JSON.stringify(postBody),
        }).then((response) => response.json());
      },
    };
    this.send = async ({ path, body, method }) => {
      const options = {
        headers: this.headers,
        method,
      };
      if (body) {
        options.body = body;
      }
      console.log(options);
      const url = `${this.baseUrl}${path}`;
      return fetch(url, options).then((response) => response.json());
    };
  }
}

// Initializing a client
export const notionClient = new Client({
  auth: NOTION_API_TOKEN,
});
