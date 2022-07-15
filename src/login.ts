const VERIFIED_KEYS = ["abcd", "efgh"];

export const verifyLogin = (loginKey: string | null) => {
  if (!loginKey) {
    return false;
  }
  return VERIFIED_KEYS.includes(loginKey);
};
