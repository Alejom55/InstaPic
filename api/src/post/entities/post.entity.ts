import { User } from "src/auth/entities/user.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Column, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uri_resource: string;

    @Column()
    post_date: Date;

    @Column()
    title: string;

    @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Comment, comment => comment.post, { cascade: true })
    comments: Comment[];
}
