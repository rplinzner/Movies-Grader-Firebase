export default (errCode: string, message: string) => {
  switch (errCode) {
    case 'auth/account-exists-with-different-credential':
      return 'Konto powiązane z takim samym adresem E-Mail już istnieje. Zaloguj się korzystając ze sposobu logowania powiązanego z tym adresem E-Mail.'

    default:
      return message;
  }
};
