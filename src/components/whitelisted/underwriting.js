// underwriting.js

const rawAddresses = [
  "0x880C6F99dD72eE03355b1e80d213426B0D553544",
  "0x72BeC383Bd3F3aA10891f2d6177EEB2B9De189A1",
  "0x828c08f55cba3D6245D8C050D2875b9f136CB93f",
  "0xD14EfCC50664e974708e4092288dAd4a69386fF1",
];

// Convert all addresses to lowercase
const whitelistedAddresses = rawAddresses.map((addr) => addr.toLowerCase());

export default whitelistedAddresses;
