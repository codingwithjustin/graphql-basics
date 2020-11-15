import { gql, IResolvers, makeExecutableSchema } from 'apollo-server'

const typeDefs = gql`
  type Coordinates {
    lon: Float
    lat: Float
  }

  type Weather {
    id: Int!
    main: String
    description: String
    icon: String
  }

  type WeatherTemp {
    temp: Float
    feelsLike: Float
  }

  type WeatherResponse {
    id: String!
    name: String
    base: String
    coord: Coordinates
    main: WeatherTemp
    weather: [Weather]!
  }

  type Query {
    weatherByCity(city: String!): WeatherResponse
    weatherByCoords(lat: Float!, lon: Float!): WeatherResponse
  }
`

const resolvers: IResolvers = {
  Query: {
    weatherByCity(_, { city }, { dataSources }) {
      return dataSources.weatherAPI.withCity(city)
    },
    weatherByCoords(_, { lat, lon }, { dataSources }) {
      return dataSources.weatherAPI.withCoords(lat, lon)
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
