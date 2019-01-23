export const getUsername = user => user.user_metadata.username || "";

export const getEmail = user => console.log(user.email) || user.email;
