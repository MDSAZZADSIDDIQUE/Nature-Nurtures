import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MemberEntity } from './member.entity';

@Entity('blog')
export class BlogEntity {
  @PrimaryGeneratedColumn({ name: 'blog_id' })
  blogID: number;
  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;
  @Column({ name: 'author', type: 'varchar', length: 255 })
  author: string;
  @Column({ name: 'content', type: 'varchar', length: 25500 })
  content: string;
  @Column({ name: 'date', type: 'date' })
  date: Date;
  @Column({ name: 'likes', type: 'bigint' })
  likes: number;
  @Column({ name: 'comments', type: 'varchar', nullable: true })
  comments: string;
  @Column({ name: 'blog_picture', type: 'varchar', length: 255 })
  blogPicture: string;
  @ManyToOne(() => MemberEntity, (member) => member.blogs)
  member: MemberEntity;
}
