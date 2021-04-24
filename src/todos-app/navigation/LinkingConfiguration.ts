import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      // Home: {
      //   screens: {
      //     Home: {
      //       screens: {
      //         Home: 'Home',
      //       },
      //     },
      //   },
      // },
      MobileApps: 'Mobile Apps',
      NotFound: '*',
    },
  },
};
