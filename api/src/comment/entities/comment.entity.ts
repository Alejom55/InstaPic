import { User } from "src/auth/entities/user.entity";
import { Post } from "src/post/entities/post.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    comment: string;
  
    @Column()
    comment_date: Date;
    

  
    @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: Post;
}
