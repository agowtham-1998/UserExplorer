import axios from "axios";

const BASE_URL = "https://dummyjson.com";

/**
 * Fetch a paginated list of users
 * @param {number} limit - Number of users to fetch
 * @param {number} skip - Number of users to skip (for pagination)
 * @returns {Promise<Object[]>} List of users
 */
export const fetchUsers = async (limit = 10, skip = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      params: { limit, skip },
    });
    return response.data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

/**
 * Fetch a paginated list of posts for a specific user
 * @param {number} userId - The ID of the user to fetch posts for
 * @param {number} limit - Number of posts to fetch
 * @param {number} skip - Number of posts to skip (for pagination)
 * @returns {Promise<Object[]>} List of posts
 */
export const fetchUserPosts = async (userId, limit = 10, skip = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}/posts`, {
      params: { limit, skip },
    });
    return response.data.posts;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    throw error;
  }
};
