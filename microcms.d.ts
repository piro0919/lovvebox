namespace MicroCMS {
  type Image = {
    height: number;
    url: string;
    width: number;
  };

  type Member = {
    color: string;
    furigana: string;
    images: Image[];
    name: string;
    path: string;
    profile: string;
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
