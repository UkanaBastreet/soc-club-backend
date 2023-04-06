import { Injectable } from '@nestjs/common';

export interface fbt {
  id?: number;
  name: string;
  body: string;
  email?: string;
  title?: string;
  date?: Date;
}

@Injectable()
export class AppService {
  feedbacks: fbt[] = [];
  getHello(): string {
    return 'Hello World!';
  }
  feedbackTo(fb: fbt) {
    this.feedbacks.push({
      ...fb,
      id: this.feedbacks.length,
      date: new Date(),
      title: fb.title ? fb.title : '[ No title ]',
    });
    return this.feedbacks;
  }
  returnAllFeedback() {
    return this.feedbacks;
  }
  removeOne(id: number) {
    console.log('id: ', id);
    this.feedbacks = this.feedbacks.filter((fb) => fb.id !== id);
    return this.feedbacks;
  }
}
