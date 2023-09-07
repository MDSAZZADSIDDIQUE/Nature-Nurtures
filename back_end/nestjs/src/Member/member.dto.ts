export class MemberDTO {
  firstName: string;
  lastName: string;
  username: string;
  dateOfBirth: Date;
  address: string;
  telephoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture: string;
}

export class UserDTO {
  email: string;
  password: string;
}

export class EditMemberDTO {
  property: string;
  value: string;
}
