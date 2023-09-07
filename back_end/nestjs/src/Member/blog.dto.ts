export class BlogDTO {
  blogID: number;
  memberID: number;
  title: string;
  content: string;
  author: string;
  date: Date;
  likes: number;
  comments: number;
  blogPicture: string;
}

export class EditBlogDTO {
  blogID: number;
  comment: string;
}
