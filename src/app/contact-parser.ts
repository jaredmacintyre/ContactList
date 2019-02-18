interface ContactParser {
    id: string;
    type: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    nickname?: string;
    company?: string;
  }