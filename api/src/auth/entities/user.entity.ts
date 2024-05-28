import { Follower } from "src/follower/entities/follower.entity";
import { Post } from "src/post/entities/post.entity";
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index({ unique: true })
    email: string;

    @Column({ type: 'text', nullable: true, })
    name: string;

    @Column('text')
    @Index({ unique: true })
    nickname: string;

    @Column({ type: 'text', nullable: false, })
    picture: string;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    birthdate: Date;

    @CreateDateColumn({
        type: 'timestamp',
    })
    created_at: Date;

    @Column({ default: true })
    isActivated: boolean;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];
  
    @OneToMany(() => Follower, follower => follower.user)
    followers: Follower[];
  
    @OneToMany(() => Follower, follower => follower.userFollower)
    following: Follower[];



}
