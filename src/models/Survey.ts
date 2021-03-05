import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('surveys')
class Survey extends BaseEntity {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor(title: string, description: string) {
    super();
    if (!this.id) {
      this.id = uuid();
    }
    this.title = title;
    this.description = description;
  }
}

export { Survey };
