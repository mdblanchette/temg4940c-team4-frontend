module.exports = {
  async redirects() {
    return [
      {
        source: "/src/pages",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};
