namespace MicroCMS {
  type Image = {
    height: number;
    url: string;
    width: number;
  };

  type Member = {
    birthday: Date;
    color: string;
    debut: Date;
    furigana: string;
    graduation?: Date;
    height: number;
    images: Image[];
    instagramId: string;
    name: string;
    path: string;
    profile: string;
    tiktokId: string;
    twitterId: string;
    youtubeId: string;
  };

  type News = {
    title: string;
  };

  type Endpoints = {
    list: {
      member: Member;
      news: News;
    };
    object: {};
  };
}
