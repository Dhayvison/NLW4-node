import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Survey } from './Survey';
import { User } from './User';

@Entity('surveys_users')
class SurveysUsers extends BaseEntity {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  survey_id: string;

  @ManyToOne(() => Survey)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  constructor(userId: string, surveyId: string) {
    super();
    if (!this.id) {
      this.id = uuid();
    }
    this.user_id = userId;
    this.survey_id = surveyId;
  }
}

export { SurveysUsers };
