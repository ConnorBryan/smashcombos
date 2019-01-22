const axios = require("axios");

exports.handler = async (event, context, callback) => {
  try {
    const { body } = event;
    const {
      clientContext: {
        identity: { token, url },
        user: { sub: userId }
      }
    } = context;
    const userUrl = `${url}/admin/users/${userId}`;
    const { username } = JSON.parse(body);
    const { data } = await axios.put(
      userUrl,
      {
        user_metadata: {
          username
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      }
    );

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(data)
    });
  } catch (error) {
    return callback(error);
  }
};
