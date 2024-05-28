import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        type: 'text',
        unique: true,
    })
    email: string;
    @Column({ type: 'text', nullable: true, })
    name: string;
    @Column({ type: 'text', nullable: true, })
    last_name: string;
    @Column('text')
    nickname: string;
    @Column('text')
    password: string;
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

    @Column({ type: 'text', nullable: true, })
    picture: string;
}
