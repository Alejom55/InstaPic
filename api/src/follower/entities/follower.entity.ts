import { User } from "src/auth/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Follower {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'enum', enum: ['Accepted', 'Rejected', 'Pending'] })
    state: 'Accepted' | 'Rejected' | 'Pending';
  
    @Column()
    request_date: Date;
  
    @Column()
    request_update_date: Date;
  
    @ManyToOne(() => User, user => user.followers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @ManyToOne(() => User, user => user.following, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_follower_id' })
    userFollower: User;
}
