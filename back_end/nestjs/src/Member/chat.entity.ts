import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chat')
export class ChatEntity {
  @PrimaryGeneratedColumn({ name: 'chat_id' })
  chatID: number;
  @Column({ name: 'sender_name' })
  senderName: string;
  @Column({ name: 'message', type: 'varchar', length: 25500 })
  message: string;
}
