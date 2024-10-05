namespace MicroCMS {
  type Image = {
    height: number;
    url: string;
    width: number;
  };

  type Document = {
    about: string;
    faq: string;
    guidelines: string;
    movie: string;
    privacypolicy: string;
  };

  type Member = {
    birthday: Date;
    color: string;
    debut: Date;
    fanboxId?: string;
    furigana: string;
    graduation?: Date;
    height: number;
    images: Image[];
    name: string;
    profile: string;
    twitterId: string;
    youtubeId: string;
  };

  type News = {
    content: string;
    pastPublishedAt?: Date;
    title: string;
  };

  type Endpoints = {
    list: {
      member: Member;
      news: News;
    };
    object: {
      document: Document;
    };
  };
}
