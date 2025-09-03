import { OAuthProvider } from "appwrite";
import { account, ID } from "./appwrite";

export const createAccount = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const user = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = await account.createEmailPasswordSession({ email, password });
    return user;
  } catch (error) {
    throw error;
  }
};

export const GoogleLogin = () => {
  account.createOAuth2Session({
    provider: OAuthProvider.Google,
    success: "http://localhost:3000/",
    failure: "http://localhost:3000/sign-in",
  });
};

export const GithubLogin = () => {
  account.createOAuth2Session({
    provider: OAuthProvider.Github,
    success: "http://localhost:3000/",
    failure: "http://localhost:3000/sign-in",
  });
};
