import { makeVar, InMemoryCache } from '@apollo/client'

export const errorVar = makeVar("");
export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                error: {
                    read() {
                        return errorVar();
                    }
                }
            }
        }
    }
});