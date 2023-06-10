export type Artist = {
    id: string;
    name: string;
    images: Array<{ url: string }>,
    genres: string[];
};

export type Album = {
    id: string;
    name: string;
    images: Array<{ url: string }>,
    release_date: string;
    genres: string[];
    album_type: string;
};