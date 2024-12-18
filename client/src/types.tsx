export interface UserLogged {
    _id: string;
    name: string;
    userNumber: number;
    readBooks: Array<{
      _id: string;
      title: string;
      author: {
        _id: string;
        name: string;
      };
      bookNumber: number;
    }>;
    favBook?: {
      _id: string;
      title: string;
      bookNumber: number;
      author: string;
      readers: string[];
    };
  }

  type FullUser = UserLogged;