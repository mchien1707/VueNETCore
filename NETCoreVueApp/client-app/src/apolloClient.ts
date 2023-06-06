import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import useOidc from "@/composables/useOIDC";

export default function createApolloClient(apiUrl: string) {
  const cache = new InMemoryCache();

  const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: apiUrl,
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = useOidc().user.value?.access_token;
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });
}
