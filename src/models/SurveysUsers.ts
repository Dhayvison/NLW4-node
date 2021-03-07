import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('surveys_users')
class SurveysUsers extends BaseEntity {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @Column()
  survey_id: string;

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
