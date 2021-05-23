# gatsby-source-hicetnunc

This plugin turns your _created_ and _collected_ [hic et nunc](https://hicetnunc.xyz) OBJKTs into Gatsby nodes.

All data is provided by [hicdex](https://hicdex.com), _a blockchain indexer and GraphQL API for hic et nunc_.

## Install

Run the following at your project's root folder to install the plugin.

```bash
npm install gatsby-source-hicetnunc
```

## Configure

Once installed, add the plugin to your `gatsby-config.js` plugins section, specifying your wallet address.

```js
// gatsby-config.js
module.exports = {
  plugins: [
    // ...
    {
      resolve: "gatsby-source-hicetnunc",
      options: {
        address: "YOUR_WALLET_ADDRESS",
      },
    },
  ],
},
```

That's it. ✨
