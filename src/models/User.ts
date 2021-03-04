import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
class User extends BaseEntity {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  constructor(name: string, email: string) {
    super();
    if (!this.id) {
      this.id = uuid();
    }
    this.name = name;
    this.email = email;
  }
}

export { User };
